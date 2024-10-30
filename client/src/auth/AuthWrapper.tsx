import { createContext, useContext, useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { IUser } from '../models'
import Cookies from 'js-cookie'


const AuthContext = createContext<any | null>(null)
export const AuthData = () => useContext(AuthContext)

export const AuthWrapper = () => {
    
    const jwt = Cookies.get('jwt')
    const navigation = useNavigate()

    useEffect(() => {
        const JwtExist =  Cookies.get('jwtExist')
        if (!JwtExist){
          navigation("/login")
        }
    }, [jwt, navigation])
    

    const login = async (data: IUser) => {
        await axios.post('api/users/login', data).then((res) => {
            return new Promise((resolve, reject) => {
                console.log('one more from login()',res.data, res.data.user.id);
                
                if (res.data.success){
                    // console.log('id:', res.data.user.id, 'username:',  res.data.user.username, 'email:', res.data.user.email);
                    // document.cookie = 'jwt=' + res.data.token
                    const newUser = { id: res.data.user.id, username: res.data.user.username, email: res.data.user.email}
                    localStorage.setItem('user', JSON.stringify(newUser))
                    resolve('success')
                }else{
                    reject('Username or password is not correct')
            }})
        }).catch((err) => {console.warn(err)})
    }

    const logout = async() => {
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        await axios.get('api/users/logout').catch((err) => console.warn(err))
    }

    return(
        <AuthContext.Provider value={{login, logout}}>
            <Outlet />
        </AuthContext.Provider>
    )
}