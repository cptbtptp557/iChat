import socket from "../socket";

export const VoiceCalls = async () => {

    const audio_stream_parameters = {
        audio: true,
    }

    let voice_peerConnection = new RTCPeerConnection();

    const getScreenLists = (roomName: string) => {
        voice_peerConnection.onicecandidate = (event) => {
            if (event.candidate) socket.emit("iceCandidate", [event.candidate, roomName]);
        };

        navigator.mediaDevices.getUserMedia(audio_stream_parameters)
            .then((screenStream) => {
                console.log(screenStream);

                screenStream.getTracks().forEach((track) => {
                    voice_peerConnection.addTrack(track, screenStream);
                })

                return voice_peerConnection.createOffer();
            })
            .then((offer) => {
                socket.emit("offer", [offer, roomName]);
                voice_peerConnection.setLocalDescription(offer).catch(console.error);
            }).catch(console.error);
    }

    return {
        getScreenLists,
    }
}