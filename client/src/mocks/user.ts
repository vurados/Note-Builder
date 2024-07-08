import { http, HttpResponse } from 'msw'
import { IUser } from '../models'



export const userHandlers = [
    http.post('http://localhost:3000/NoteBuilder/api/users/login', async ({request}) => {

        const user = (await request.json()) as IUser
        console.log('user from mock server', user)

        if((user.username === localStorage.getItem('DBusername')) && (user.password === localStorage.getItem('DBpassword'))){
            return HttpResponse.json({
                username: localStorage.getItem('DBusername'),
                email: localStorage.getItem('DBemail')
                },
            {
                headers: new Headers([
                    ['Set-Cookie', 'jwtExist=true'],
                    ['Set-Cookie', 'jwt=test']
                ])}
        )}
    }),

    http.post('http://localhost:3000/NoteBuilder/api/users/createUser', async ({request}) => {
       
        const user = (await request.json()) as IUser
        console.log('user from mock server', user)
        
        if (user.username && user.email && user.password ){
            localStorage.setItem('DBusername', user.username)
            localStorage.setItem('DBemail', user.email)
            localStorage.setItem('DBpassword', user.password)
            return HttpResponse.json(
                {message: 'user was created'},
                {status: 200}
            )
        }
    }),

    http.get('http://localhost:3000/NoteBuilder/api/users/getUserFromJwt', async ({cookies}) => {

        if(cookies.jwt === 'test'){
            return HttpResponse.json({user:{
                username: localStorage.getItem('DBusername'),
                email: localStorage.getItem('DBemail')
            }},
            {status: 200}
        )}
    }),

    http.get('http://localhost:3000/NoteBuilder/api/users/logout', () => {

        return HttpResponse.json(null,
        {status: 200,
            headers: new Headers([
                ['Set-Cookie', 'jwtExist=false; Max-Age=0'],
                ['Set-Cookie', 'jwt=false; Max-Age=0']
            ])}
    )})
]
