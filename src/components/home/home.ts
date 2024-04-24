export const home = () => {
    const click = () => {
        console.log(window.electronAPI)
        window.electronAPI.setTitle("我被点击了!!!");
    }
    return {
        click,
    }
}