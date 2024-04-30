import {onMounted} from "vue";

export const voiceCallWindow = () => {


    onMounted(() => {
        const draggableArea = document.getElementById("a");

        draggableArea?.addEventListener('mousedown', (e) => {
            console.log(e)
            // 获取鼠标相对于屏幕的坐标
            const {screenX, screenY} = e;

            window.electronAPI.mouseCoordinates(screenX, screenY);
        });
    })

    return {}
}