import {defineStore} from "pinia";
import axios from "axios";


export const api = defineStore('api', () => {
    const login = async (username: number, password: number | string) => {
        return await axios.get('http://127.0.0.1:3000/login', {
            params: {
                'username': username,
                'password': password,
            }
        })
    }

    return {
        login,
    }
})