import axios from "axios";

export async function getUser(){
    const res = await axios.get('api/users/getUserFomJwt')
    if(res.data.success){
        localStorage.setItem('user', JSON.stringify(res.data.user))
        return res.data.user
    }
}