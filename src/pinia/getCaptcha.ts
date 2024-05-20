import axios from "axios";
import {ref} from "vue";

export const getCaptcha = () => {
    const captcha = ref([]);

    const uploadEmail = async (to_email: string) => {
        return await axios.post('http://localhost:3000/captcha', '', {
            params: {
                'to_email': to_email,
            }
        })
    }

    return {
        captcha,
        uploadEmail,
    }
}