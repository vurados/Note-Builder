import { createContext, useContext} from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { IUser } from '../models'


const AuthContext = createContext<any | null>(null)
export const AuthData = () => useContext(AuthContext)

export const AuthWrapper = () => {
    const login = async (data: IUser) => {
        await axios.post('api/users/checkUser', data).then((res) => {
            return new Promise((resolve, reject) => {
                console.log('one more from login()',res.data, res.data.user.id);
                
                if (res.data.success){
                    // console.log('id:', res.data.user.id, 'username:',  res.data.user.username, 'email:', res.data.user.email);
                    // document.cookie = 'jwt=' + res.data.token
                    console.log('response data from login()', res.data);
                    const newUser = { id: res.data.user.id, username: res.data.user.username, email: res.data.user.email, isAuthentificated: true}
                    console.log('newUser in login function', newUser);
                    localStorage.setItem('user', JSON.stringify(newUser))
                    resolve('success')
                }else{
                    reject('Username or password is not correct')
            }})
        })
    }

    const logout = () => {
        localStorage.clear()
    }

    return(
        <AuthContext.Provider value={{login, logout}}>
            <Outlet />
        </AuthContext.Provider>
    )
}