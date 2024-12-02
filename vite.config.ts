import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: '0.0.0.0',
        port: 5173,
        // open: true, // 自动打开浏览器
    }
})

// module.exports = {
//     pluginOptions: {
//         electronBuilder: {
//             preload: "electron/preload.js"
//         }
//     }
// };



