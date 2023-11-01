import React, { useEffect } from 'react'
// import axios from 'axios'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import * as Yup from 'yup'

import { AuthData } from '../auth/AuthWrapper'
import { IUser } from '../models'
import { Footer } from '../components/Footer'
import { Spinner } from '../components/spinner'
import axios from 'axios'




export function Login(){

    const [NotExistError, setNotExistError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>()
    
    const navigate = useNavigate()
    const {login} = AuthData()

    const fieldClassName = 'p-2 border-[1px] border-gray-400 rounded-lg outline-blue-200 shadow-lg w-full valid:border-blue-900 invalid:border-red-400'

    useEffect(() => {
        axios.get('/api/users/getUserFromJwt').then((res) => {
            setUser(res.data.user)
        })
    }, [])
    

    const initialValues: IUser = {
        username: '', 
        password: ''
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(20).required(),
        password: Yup.string().required()
    })


    const onSubmit = async(data: IUser) => {
        try{
            // console.log('on submit 1')
            // redirect('/layouts')
            console.log();
            setLoading(true)
            await login(data)
            console.log('user loged in successfully');
            console.log('user data gotten from login', localStorage.getItem('user'))
            setLoading(false)
            navigate("/layouts")
        }catch (error){
            console.log('error', error)
            setLoading(false)
            setNotExistError(true)
        }
    }

    const LoginForm = () => {
        return(
           <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <Form className='container flex flex-col gap-3 w-3/12 mx-auto mt-10 p-6 rounded-lg border-2 border-blue-400 drop-shadow-sm'>
                    <p className='font-bold text-2xl'>Login</p>
                    <hr />
                    {NotExistError && <div className='text-xs text-red-700'>User not exist</div> }
                    <label className='text-left'>Username:</label>
                    <ErrorMessage name='username' component='span' className='text-xs text-red-700'/>
                    <Field name='username' type='text' placeholder='Vlados' className={fieldClassName}/>

                    <label>Password:</label>
                    <ErrorMessage name='password' component='span' className='text-xs text-red-700'/>
                    <Field name='password' type='password' placeholder='Password' className={fieldClassName}/>
                    
                    <div className='h-4 invisible '></div>
                    <div>
                    <button type='submit' className="w-2/4 p-2 mx-12 bg-blue-500 rounded-full hover:bg-blue-700 hover:text-white">{loading ? <Spinner width='20' color='white'/> : 'Login'}</button>
                    <Link to={'/signup'} ><span className='font-bold text-blue-700'>signup</span></Link>
                    </div>
                </Form>
            </Formik>
        </div> 
        )
    }

    const LoginPrompt = () => {
        return(
            <div  className='flex flex-col gap-3 w-3/12 mx-auto mt-10 p-6 rounded-lg border-2 border-blue-400 drop-shadow-sm'>
                <p className='font-bold text-2xl'>Log in</p>
                <hr />
                <div onClick={() => navigate("/layouts")} className='p-3 border-2 border-blue-300 rounded hover:bg-slate-200 hover:cursor-pointer'>
                    <p className='font-bold text-xl'>{user?.username}</p>
                    <p className='text-xs text-blue-400'>{user?.email}</p>
                </div>
                <button onClick={() => setUser(undefined)} className='ml-auto w-fit text-xs hover:cursor-pointer hover:text-blue-400'>Choose another account</button>
            </div>
        )
    }

    return(<>
        <div>
            {user ? <LoginPrompt /> : <LoginForm />}
        </div>
        <Footer />
    </>)
}