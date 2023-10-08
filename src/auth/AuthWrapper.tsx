import { createContext, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
// import { Layouts } from '../Pages/Layouts'
// import { Notes } from '../Pages/Notes'
// import { EditNote } from '../Pages/EditNote'
// import { Login } from '../Pages/Login'
// import { Home } from '../Pages/Home'
// import { Signup } from '../Pages/Signup'
import { IUser } from '../models'


const AuthContext = createContext<any | null>(null)
export const AuthData = () => useContext(AuthContext)

export const AuthWrapper = () => {

    const [user, setUser] = useState({id: 0, username:'', email:'', isAuthentificated:false})
    
    // data => {username, password}
    const login = async (data: IUser) => {
        await axios.post('http://localhost:3001/api/users/checkUser', data).then((res) => {
            return new Promise((resolve, reject) => {
                if (res.data.success){
                    // console.log('id:', res.data.user.id, 'username:',  res.data.user.username, 'email:', res.data.user.email);
                    
                    setUser({id: res.data.user.id, username: res.data.user.username, email: res.data.user.email, isAuthentificated: true})
                    // setUser({id: 69, username: 'jopa', email: 'jopemail', isAuthentificated: true})
                    // console.log('user in the login function', user, 'response from api', res.data.user)
                    resolve('success')
                }else{
                    reject('Username or password is not correct')
            }})
        })
    }

    const logout = () => {
        setUser({...user, isAuthentificated:false})
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            <Outlet />
        </AuthContext.Provider>
    )
}