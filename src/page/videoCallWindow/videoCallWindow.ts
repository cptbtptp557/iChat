import {onMounted, ref} from "vue";
import socket from "../../socket";
import {usersLists} from "../../pinia/usersLists.ts";

export const videoCallWindow = () => {
    const audio_show = ref(true);
    const camera_show = ref(true);
    const top_state = ref("拨通中");
    const video_room = ref();
    const fromUserId = ref();

    const closeVoice = () => {
        window.electronAPI.closeWindow("video_window");
    }

    // 最小化窗口
    const miniVoice = () => {
        window.electronAPI.miniWindow("video_window");
    }

    const changeMicrophone = () => {
        audio_show.value = !audio_show.value
    }

    const changeCamera = () => {
        camera_show.value = !camera_show.value
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

    const hangUp = () => {
        socket.emit("delete_voice_room", [video_room.value, usersLists().thisUserAccount.value]);
        window.electronAPI.closeWindow("video_window");

        clearInterval(intervalName);
    }

    // 使用 Map 存储 RTCPeerConnection 实例
    const peerConnections = new Map();

    // 处理 ICE 候选者
    const handleIceCandidate = (candidate: any, roomName: string, socket: any) => {
        if (candidate) socket.emit("iceCandidate", [candidate, roomName]);
    };

    let videoElement: HTMLMediaElement;
    // 处理远程流
    const handleRemoteStream = (event: any) => {
        if (videoElement) {
            videoElement.srcObject = event.streams[0];
            // videoElement.play().catch(console.error);
        }
    };

    const createPeerConnection = (roomName: string, socket: any) => {
        const peerConnection = new RTCPeerConnection({
            iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
        });

        peerConnection.onicecandidate = (event) => {
            handleIceCandidate(event.candidate, roomName, socket);
        };

        navigator.mediaDevices.getUserMedia({audio: true, video: true})
            .then((stream) => {
                stream.getTracks().forEach((track) => {
                    track.enabled = true;

                    peerConnection.addTrack(track, stream);
                });

                const fromVideoElement = document.getElementById("from_video") as HTMLMediaElement;
                videoElement = document.getElementById("to_video") as HTMLMediaElement;
                if (fromVideoElement) {
                    fromVideoElement.srcObject = stream;
                    fromVideoElement.play().catch(console.error);
                    videoElement.srcObject = stream;
                }

                return peerConnection.createOffer();
            })
            .then((offer) => {
                peerConnection.setLocalDescription(offer);
                socket.emit("offer", [offer, roomName]);
            })
            .catch(console.error);

        peerConnection.ontrack = (event) => {
            handleRemoteStream(event);
        };

        return peerConnection;
    };

    // 处理用户加入房间
    socket.on("toUserJoinOver", (roomName) => {
        const peerConnection = createPeerConnection(roomName, socket);
        peerConnections.set(roomName, peerConnection);

        startTimer()
    });

    // 处理收到的 Offer
    socket.on("offer", (offer) => {
        startTimer();

        const [offerDescription, roomName] = offer;
        const peerConnection = createPeerConnection(roomName, socket);

        peerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription))
            .then(() => peerConnection.createAnswer())
            .then((answer) => {
                peerConnection.setLocalDescription(answer);
                socket.emit("answer", [answer, roomName]);
            }).catch(console.error);

        peerConnections.set(roomName, peerConnection);

        // navigator.mediaDevices.getUserMedia({audio: true, video: true})
        //     .then((stream) => {
        //         const fromVideoElement = document.getElementById("from_video") as HTMLMediaElement;
        //         videoElement = document.getElementById("to_video") as HTMLMediaElement;
        //         if (fromVideoElement) {
        //             fromVideoElement.srcObject = stream;
        //             fromVideoElement.play().catch(console.error);
        //             videoElement.srcObject = stream;
        //             videoElement.play().catch(console.error);
        //         }
        //     })
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

    socket.on("changFromUserWindowState", (data: any) => {
        if (!Boolean(data[0])) {
            top_state_boolean = Boolean(data[0]);
            clearTimeout(top_state_timer);
            fromUserId.value = data[1];
        }
    })

    try {
        window.electronAPI.receptionVideoRoomName((_event: object, videoRoomName: any) => {
            socket.emit("fromUserJoinRoom", videoRoomName);
            video_room.value = videoRoomName;
        })
    } catch (e) {
        socket.emit("fromUserJoinRoom", "0a1b35768075a49cbe252d8a086f30d235debd2a7c4934f2063a977f91da4570");
        video_room.value = "0a1b35768075a49cbe252d8a086f30d235debd2a7c4934f2063a977f91da4570";
    }

    onMounted(() => {
        videoElement = document.getElementById("to_video") as HTMLMediaElement;
        voiceLoading();
    })
    return {
        audio_show,
        camera_show,
        closeVoice,
        miniVoice,
        changeMicrophone,
        changeCamera,
        top_state,
        hangUp,
    }
}