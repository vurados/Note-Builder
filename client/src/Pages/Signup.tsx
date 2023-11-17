import axios from 'axios'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { IUser } from '../models'
import * as Yup from 'yup'

export function Signup(){
    const navigate = useNavigate()
    const [UniqueUsernameError, setUniqueUsernameError] = useState(false)

    const fieldClassName = 'p-2 border-[1px] border-gray-400 rounded-lg outline-blue-200 shadow-lg w-full'

    const initialValues = {
        username: '', 
        email: '',
        hashedPassword: ''

    }

    const validationSchema = Yup.object().shape({
            username: Yup.string().min(3).max(20).required(),
            email: Yup.string().email().required(),
            hashedPassword: Yup.string().required()
        })

    const onSubmit = async (data : IUser) => {
        console.log(data)

        axios.post('api/users/createUser', data).then((res) => {
            console.log(res);
            console.log(res.data.user.id);
            
            if (res.data.success){
                console.log( res.data.msg)
                setUniqueUsernameError(false)
                navigate("/login")
            }else {
                console.log( res.data.msg)
                setUniqueUsernameError(true)
            }
        })
    }
            

    return(<>
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <Form className='container flex flex-col gap-3 w-3/12 mx-auto mt-10 p-6 rounded-lg border-2 border-blue-400 drop-shadow-sm'>
                    <p className='font-bold text-2xl'>Login</p>
                    <hr />
                    <label className='text-left'>Username</label>
                    {UniqueUsernameError && <div className='text-xs text-red-700'>Username already exist</div>}
                    <ErrorMessage name='username' component='span' className='text-xs text-red-700'/>
                    <Field testId='username' type='text' placeholder='Username' className={fieldClassName}/>
                   

                    <label>Email</label>
                    <ErrorMessage name='email' component='span' className='text-xs text-red-700'/>
                    <Field name='email' type='email' placeholder='Email' className={fieldClassName}/>

                    <label>Password</label>
                    <ErrorMessage name='password' component='span' className='text-xs text-red-700'/>
                    <Field name='hashedPassword' type='password' placeholder='Password' className={fieldClassName}/>
                    
                    <div className='block h-4 invisible'></div>
                    <div>
                    <button name='signup' type='submit' className="w-2/4 p-2 mx-12 bg-blue-500 rounded-full hover:bg-blue-700 hover:text-white">Signup</button>
                    <Link id='toLogin' to={'/login'} ><span className='font-bold text-blue-700'>login</span></Link>
                    </div>
                </Form>
            </Formik>
        </div>
    </>)
}