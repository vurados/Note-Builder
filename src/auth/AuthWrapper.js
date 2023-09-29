import { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { Layouts } from '../Pages/Layouts'
import { Notes } from '../Pages/Notes'
import { EditNote } from '../Pages/EditNote'
import { Login } from '../Pages/Login'

const AuthContext = createContext()
export const AuthData = () => useContext(AuthContext)

export const AuthWrapper = () => {

    const [user, setUser] = useState({username:'', email:'', isAuthentificated:false})
    
    // data => {username, password}
    const login = (data) => {
        axios.post('http://localhost:3001/users/checkUser', data).then((res) => {
            return new Promise((resolve, reject) => {
                if (res.data.success){
                    setUser({name: res.data.user.username, email: res.data.user.email, isAuthentificated: true})
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
            <>
                <Login />
                <Layouts />
                <Notes />
                <EditNote />
            </>
        </AuthContext.Provider>
    )


}