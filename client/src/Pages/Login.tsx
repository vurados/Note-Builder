import React from 'react'
// import axios from 'axios'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import * as Yup from 'yup'

import { AuthData } from '../auth/AuthWrapper'
import { IUser } from '../models'
import { Footer } from '../components/Footer'



export function Login(){

    const [NotExistError, setNotExistError] = useState<boolean>(false)
    
    const navigate = useNavigate()
    const {login} = AuthData()

    const fieldClassName = 'p-2 border-[1px] border-gray-400 rounded-lg outline-blue-200 shadow-lg w-full valid:border-blue-900 invalid:border-red-400'

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
            
            await login(data)
            console.log('user loged in successfully');
            console.log('user data gotten from login', localStorage.getItem('user'))
            navigate("/layouts")
        }catch (error){
            console.log('error', error)
            setNotExistError(true)
        }
    }

    // just debug function(to remove) with button
    // const checkCookie = async () => {
    //     const res = await axios.get('api/users/getUserFromJwt')
    //     console.log(res.data.user);
    //     console.log(localStorage.getItem('user'));
    // }

    return(<>
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <Form className='container flex flex-col gap-3 w-3/12 mx-auto mt-10 p-6 rounded-lg border-2 border-blue-400 drop-shadow-sm'>
                    {NotExistError && <div className='text-xs text-red-700'>User not exist</div> }
                    <label className='text-left'>Username:</label>
                    <ErrorMessage name='username' component='span' className='text-xs text-red-700'/>
                    <Field name='username' type='text' placeholder='Vlados' className={fieldClassName}/>

                    <label>Password:</label>
                    <ErrorMessage name='password' component='span' className='text-xs text-red-700'/>
                    <Field name='password' type='password' placeholder='Password' className={fieldClassName}/>
                    
                    <div className='h-4 invisible '></div>
                    <div>
                    <button type='submit' className="w-2/4 p-2 mx-12 bg-blue-500 rounded-full hover:bg-blue-700 hover:text-white">Login</button>
                    <Link to={'/signup'} ><span className='font-bold text-blue-700'>signup</span></Link>
                    </div>
                </Form>
            </Formik>
        </div>
        <Footer />
        {/* button for debug (delete on prod) */}
        {/* <div>
            <button onClick={checkCookie} className='border-2 px-3 py-2 hover:border-blue-400'>CHECK COOOOOOKIE</button>
            <p>cookie:{document.cookie||"None"}</p>
        </div> */}
        
        {/* <div className="container flex flex-col items-center gap-6 w-3/12 mx-auto mt-10 p-6 rounded-lg border-2 border-blue-400 drop-shadow-sm">
            <span>Login</span>
            <input type="email" name="" id="" placeholder="Username" className=""/>
            <input type="password" name="" id="" placeholder="Password" className=""/>
            <button className="p-2 bg-blue-500 rounded-full">Login</button>
        </div> */}
    
    </>)
}