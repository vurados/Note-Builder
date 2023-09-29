import axios from 'axios'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useState } from 'react'
import { Link, redirect } from 'react-router-dom'
import * as Yup from 'yup'

import { AuthData } from '../auth/AuthWrapper'

export function Login(){
    const [NotExistError, setNotExistError] = useState(false)

    const {login} = AuthData()

    const fieldClassName = 'p-2 border-[1px] border-gray-400 rounded-lg outline-blue-200 shadow-lg w-full'

    const initialValues = {
        username: '', 
        password: ''

    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(20).required(),
        password: Yup.string().required()
    })

    // TODO: change data type to IUser(add interface in models)
    // const onSubmit = (data:any) => {
    //     // console.log(data)
    //     axios.post('http://localhost:3001/users/checkUser', data).then((res) => {
    //         if (res.data.success){
    //             console.log( res.data)
    //             setNotExistError(false)
    //         }else{
    //             setNotExistError(true)
    //         }
    //     })
    // }

    // ---------------------------------------------------------------
    // TODO: need to change to this variant of onSubmit
    // TODO: change data type to IUser(add interface in models)
    // ---------------------------------------------------------------
    const onSubmit = async (data:any) => {
        try{
            await login(data)
            redirect('/Layouts')
            // code to do baasicly what happens when user auth on acc
        }catch (error){
            setNotExistError(true)
        }
    }

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
                    
                    <div className='block h-4 invisible '></div>
                    <div>
                    <button type='submit' className="w-2/4 p-2 mx-12 bg-blue-500 rounded-full">Login</button>
                    <Link to={'/signin'} ><span className='font-bold text-blue-700'>signup</span></Link>
                    </div>
                </Form>
            </Formik>
        </div>

        {/* <div className="container flex flex-col items-center gap-6 w-3/12 mx-auto mt-10 p-6 rounded-lg border-2 border-blue-400 drop-shadow-sm">
            <span>Login</span>
            <input type="email" name="" id="" placeholder="Username" className=""/>
            <input type="password" name="" id="" placeholder="Password" className=""/>
            <button className="p-2 bg-blue-500 rounded-full">Login</button>
        </div> */}
    
    </>)
}