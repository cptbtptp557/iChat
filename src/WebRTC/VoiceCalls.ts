export const VoiceCalls = async () => {

    const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    return {
        localStream,
    }
}