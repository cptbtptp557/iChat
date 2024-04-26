import {ref} from "vue";

export const login = () => {
    const getButtons = (e: any) => e.preventDefault()

    const changeForm = () => {
        const switchCtn = document.querySelector("#switch-cnt");
        const switchC1 = document.querySelector("#switch-c1");
        const switchC2 = document.querySelector("#switch-c2");
        const switchCircle = ref(document.querySelectorAll(".switch__circle"));
        const aContainer = document.querySelector("#a-container");
        const bContainer = document.querySelector("#b-container");

        switchCtn?.classList.add("is-gx");
        setTimeout(function () {
            switchCtn?.classList.remove("is-gx");
        }, 1500);

        switchCtn?.classList.toggle("is-txr");
        switchCircle.value[0].classList.toggle("is-txr");
        switchCircle.value[1].classList.toggle("is-txr");

        switchC1?.classList.toggle("is-hidden");
        switchC2?.classList.toggle("is-hidden");
        aContainer?.classList.toggle("is-txl");
        bContainer?.classList.toggle("is-txl");
        bContainer?.classList.toggle("is-z200");
    }

    const mainF = () => {
        let allButtons = document.querySelectorAll(".submit");
        let switchBtn = document.querySelectorAll(".switch-btn");
        let i;

        for (i = 0; i < allButtons.length; i++) allButtons[i].addEventListener("click", getButtons);
        for (i = 0; i < switchBtn.length; i++) switchBtn[i].addEventListener("click", changeForm);
    }

    window.addEventListener("load", mainF);

    return {}
}