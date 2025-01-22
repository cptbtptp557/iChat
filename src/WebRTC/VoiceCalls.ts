import socket from "../socket";

export const VoiceCalls = async () => {

    const audio_stream_parameters = {
        audio: true,
    }

    let voice_peerConnection = new RTCPeerConnection();

    const getScreenLists = async (roomName: any, correspondentPerson: string) => {
        voice_peerConnection.onicecandidate = (event) => {
            if (event.candidate) socket.emit("iceCandidate", [event.candidate, roomName]);
        };

        await navigator.mediaDevices.getUserMedia(audio_stream_parameters)
            .then((screenStream) => {
                console.log(screenStream);

                screenStream.getTracks().forEach((track) => {
                    voice_peerConnection.addTrack(track, screenStream);
                })

                if (correspondentPerson === "offer") return voice_peerConnection.createOffer();
                if (correspondentPerson === "answer") {
                    voice_peerConnection.setRemoteDescription(new RTCSessionDescription(roomName[0])).catch(console.error);
                    voice_peerConnection.ontrack = (RTCTrackEvent) => {
                        console.log(RTCTrackEvent);
                        //  把RTCTrackEvent.streams[0]传去播放界面
                    };

                    return voice_peerConnection.createAnswer();
                }
            })
            .then((stream) => {
                console.log(stream)

                socket.emit(`${correspondentPerson}`, [stream, roomName]);
                voice_peerConnection.setLocalDescription(stream).catch(console.error);
            }).catch(console.error);

    }

    return {
        getScreenLists,
    }
}