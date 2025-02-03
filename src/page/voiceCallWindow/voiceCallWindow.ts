import {onMounted, ref} from "vue";
import socket from "../../socket";

export const voiceCallWindow = () => {
    const microphone_state = ref(true);
    const horn_state = ref(true);
    const top_state = ref("拨通中");
    const voice_room = ref();
    const audio_src = ref();

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

    let fromUserId: number;
    const voiceHangUp = () => {
        socket.emit("delete_voice_room", [voice_room.value, fromUserId]);
        peerConnections.forEach((peerConnection, roomName) => {
            peerConnection.close();
            peerConnections.delete(roomName);
        })
        window.electronAPI.closeWindow("audio_window");
    }

    socket.on("changFromUserWindowState", (data: any) => {
        if (!Boolean(data[0])) {
            top_state_boolean = Boolean(data[0]);
            clearTimeout(top_state_timer);
            fromUserId = data[1];
        }
    })

    // 使用 Map 存储 RTCPeerConnection 实例
    const peerConnections = new Map();

    // 处理 ICE 候选者
    const handleIceCandidate = (candidate: any, roomName: string, socket: any) => {
        console.log(typeof socket);
        if (candidate) socket.emit("iceCandidate", [candidate, roomName]);
    };

    // 处理远程流
    const handleRemoteStream = (event: any, audioElementId: string) => {
        const audioElement: HTMLElement | null = document.getElementById(audioElementId);
        if (audioElement) {
            audioElement.srcObject = event.streams[0];
            audioElement.play().catch(console.error);
        }
    };

    // 创建 RTCPeerConnection
    const createPeerConnection = (roomName: string, socket: any, isOffer: any) => {
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
                        peerConnection.addTrack(track, stream);
                    });

                    return peerConnection.createOffer();
                })
                .then((offer) => {
                    peerConnection.setLocalDescription(offer);
                    socket.emit("offer", [offer, roomName]);
                })
                .catch(console.error);
        } else {
            peerConnection.ontrack = (event) => {
                handleRemoteStream(event, "receiverAudioStream");
            };
        }

        return peerConnection;
    };

    // 处理用户加入房间
    socket.on("voiceToUserJoinOver", (roomName) => {
        const peerConnection = createPeerConnection(roomName, socket, true);
        peerConnections.set(roomName, peerConnection);
    });

    // 处理收到的 Offer
    socket.on("offer", (offer) => {
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
    socket.on("answer", (answer) => {
        const [answerDescription, roomName] = answer;
        const peerConnection = peerConnections.get(roomName);

        if (peerConnection) peerConnection.setRemoteDescription(new RTCSessionDescription(answerDescription)).catch(console.error);

    });

    // 处理收到的 ICE 候选者
    socket.on("iceCandidate", (candidateData) => {
        const [candidate, roomName] = candidateData;
        const peerConnection = peerConnections.get(roomName);

        if (peerConnection) peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch(console.error);
    });


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