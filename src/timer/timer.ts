// import {ref} from "vue";
//
// export const timer = () => {
//     const time = ref('00:00');
//     let intervalName: any;
//
//     // 开始计时
//     const startTimer = () => {
//         let sec: number = 0;
//         let min: number = 0;
//
//         intervalName = setInterval(() => {
//             sec++;
//
//             if (sec === 60) {
//                 min++;
//                 sec = 0;
//                 time.value = min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0");
//             } else {
//                 time.value = min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0");
//             }
//
//             console.log(time.value)
//         }, 1000);
//     }
//
//     const stopTimer = () => {
//         clearInterval(intervalName);
//     }
//
//     return {
//         startTimer,
//         stopTimer,
//     }
// }