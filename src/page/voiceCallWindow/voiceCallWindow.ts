import {onMounted, ref} from "vue";
import socket from "../../socket";

export const voiceCallWindow = () => {
    const microphone_state = ref(true);
    const horn_state = ref(true);
    const top_state = ref("拨通中");
    const voice_room = ref();
    const audio_src = ref();
    const fromUserId = ref();

    // 关闭窗口
    const closeVoice = () => {
        window.electronAPI.closeWindow("audio_window");
    }

    // 最小化窗口
    const miniVoice = () => {
        window.electronAPI.miniWindow("audio_window");
    }

    // 麦克风按钮
    const microphoneButton = () => {
        microphone_state.value = !microphone_state.value;
    }

    // 扬声器按钮
    const hornButton = () => {
        horn_state.value = !horn_state.value;

        audioElement.muted = !horn_state.value;
    }

    let top_state_timer: any;
    let top_state_boolean: boolean = true;
    const voiceLoading = () => {
        top_state_timer = setTimeout(() => {
            top_state.value = "拨通中.";

            setTimeout(() => {
                top_state.value = "拨通中..";
                setTimeout(() => {
                    top_state.value = "拨通中...";

                    if (!top_state_boolean) {
                        top_state.value = "对方已挂断";
                        return;
                    }
                    voiceLoading();
                }, 700)
            }, 700)
        }, 700)
    }

    const time = ref('00:00');
    let intervalName: any;
    const voiceHangUp = () => {
        console.log()
        socket.emit("delete_voice_room", [voice_room.value, fromUserId.value]);
        peerConnections.forEach((peerConnection, roomName) => {
            peerConnection.close();
            peerConnections.delete(roomName);
        })
        window.electronAPI.closeWindow("audio_window");

        clearInterval(intervalName);
    }

    socket.on("changFromUserWindowState", (data: any) => {
        if (!Boolean(data[0])) {
            top_state_boolean = Boolean(data[0]);
            clearTimeout(top_state_timer);
            fromUserId.value = data[1];
        }
    })

    // 使用 Map 存储 RTCPeerConnection 实例
    const peerConnections = new Map();

    // 处理 ICE 候选者
    const handleIceCandidate = (candidate: any, roomName: string, socket: any) => {
        if (candidate) socket.emit("iceCandidate", [candidate, roomName]);
    };

    let audioElement: HTMLMediaElement;
    // 处理远程流
    const handleRemoteStream = (event: any) => {
        if (audioElement) {
            audioElement.srcObject = event.streams[0];
            audioElement.play().catch(console.error);
        }
    };

    // 创建 RTCPeerConnection
    const createPeerConnection = (roomName: string, socket: any, isOffer: boolean) => {
        const peerConnection = new RTCPeerConnection({
            iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
        });

        peerConnection.onicecandidate = (event) => {
            handleIceCandidate(event.candidate, roomName, socket);
        };

        if (isOffer) {
            navigator.mediaDevices.getUserMedia({audio: true})
                .then((stream) => {
                    stream.getTracks().forEach((track) => {
                        track.enabled = microphone_state.value;

                        peerConnection.addTrack(track, stream);
                    });

                    const audioElement = document.getElementById("receiverAudioStream") as HTMLMediaElement;
                    if (audioElement) {
                        audioElement.srcObject = stream;
                        audioElement.play().catch(console.error);
                    }

                    return peerConnection.createOffer();
                })
                .then((offer) => {
                    peerConnection.setLocalDescription(offer);
                    socket.emit("offer", [offer, roomName]);
                })
                .catch(console.error);
        } else {
            peerConnection.ontrack = (event) => {
                handleRemoteStream(event);
            };
        }

        return peerConnection;
    };

    // 开始计时
    const startTimer = () => {
        let sec: number = 0;
        let min: number = 0;

        top_state.value = "00:00";
        top_state_boolean = false;

        intervalName = setInterval(() => {
            sec++;

            if (sec === 60) {
                min++;
                sec = 0;
                time.value = min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0");
            } else {
                time.value = min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0");
            }

            top_state.value = time.value;
        }, 1000);
    }

    // 处理用户加入房间
    socket.on("toUserJoinOver", (roomName) => {
        const peerConnection = createPeerConnection(roomName, socket, true);
        peerConnections.set(roomName, peerConnection);

        startTimer()
    });

    // 处理收到的 Offer
    socket.on("offer", (offer) => {
        startTimer()

        const [offerDescription, roomName] = offer;
        const peerConnection = createPeerConnection(roomName, socket, false);

        peerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription))
            .then(() => peerConnection.createAnswer())
            .then((answer) => {
                peerConnection.setLocalDescription(answer);
                socket.emit("answer", [answer, roomName]);
            }).catch(console.error);

        peerConnections.set(roomName, peerConnection);
    });

    // 处理收到的 Answer
    socket.on("answer", async (answer) => {
        const [answerDescription, roomName] = answer;
        const peerConnection = peerConnections.get(roomName);

        if (peerConnection) {
            try {
                if (peerConnection.signalingState === "have-local-offer" || peerConnection.signalingState === "have-remote-offer") {
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(answerDescription));
                } else {
                    console.error("Invalid signaling state:", peerConnection.signalingState);
                }
            } catch (error) {
                console.error("Error handling answer:", error);
            }
        }
    });

    // 处理收到的 ICE 候选者
    socket.on("iceCandidate", async (candidateData) => {
        const [candidate, roomName] = candidateData;
        const peerConnection = peerConnections.get(roomName);

        if (peerConnection && peerConnection.remoteDescription) {
            try {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (error) {
                console.error("Error adding ICE candidate:", error);
            }
        } else {
            console.error("Remote description not set yet, cannot add ICE candidate.");
        }
    });

    socket.on("deleteRoom", () => {
        clearInterval(intervalName);
        top_state_boolean = false;
        top_state.value = "对方已挂断";
    })


    try {
        window.electronAPI.receptionVoiceRoomName((_event: object, voiceRoomName: any) => {
            socket.emit("fromUserJoinRoom", voiceRoomName);
            voice_room.value = voiceRoomName;
        })
    } catch (e) {
        socket.emit("fromUserJoinRoom", "0a1b35768075a49cbe252d8a086f30d235debd2a7c4934f2063a977f91da4570");
        voice_room.value = "0a1b35768075a49cbe252d8a086f30d235debd2a7c4934f2063a977f91da4570";
    }

    onMounted(() => {
        audioElement = document.getElementById("receiverAudioStream") as HTMLMediaElement;

        voiceLoading();
    })

    return {
        closeVoice,
        miniVoice,
        top_state,
        microphone_state,
        microphoneButton,
        horn_state,
        hornButton,
        voiceHangUp,
        audio_src,
    }
}