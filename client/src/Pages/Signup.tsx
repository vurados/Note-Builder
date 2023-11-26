import axios from 'axios'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { IUser } from '../models'
import * as Yup from 'yup'

function Signup () {
    const navigate = useNavigate()
    const [UniqueUsernameError, setUniqueUsernameError] = useState(false)

    const fieldClassName = 'p-2 border-[1px] border-gray-400 rounded-lg outline-blue-200 shadow-lg w-full'

    const initialValues = {
        username: '', 
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(20).required(),
        email: Yup.string().email().required(),
        password: Yup.string().required()
    })

    const onSubmit = async (data : IUser) => {
        axios.post('api/users/createUser', data)
            .then(() => {
                setUniqueUsernameError(false)
                navigate("/login")})
            .catch((err) => {
                console.warn(err.response.data.msg);
                setUniqueUsernameError(true)
            })
    }


    return(<>
        <div className='relative min-h-[100vh] top-[30vh]'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <Form className='container flex flex-col gap-3 w-3/12 min-w-fit mx-auto p-6 rounded-lg bg-white backdrop-blur-sm drop-shadow-sm'>
                    <p className='font-bold text-2xl'>SignUp</p>
                    <hr className='w-1/4 h-[2px] bg-gray-400 border-0 rounded'/>
                    <label id='username-label' className='text-left'>Username</label>
                    {UniqueUsernameError && <div className='text-xs text-red-700'>Username already exist</div>}
                    <ErrorMessage name='username' component='span' className='text-xs text-red-700'/>
                    <Field aria-labelledby='username-label' name='username' type='text' placeholder='Username' className={fieldClassName}/>


                    <label id='email-label'>Email</label>
                    <ErrorMessage name='email' component='span' className='text-xs text-red-700'/>
                    <Field aria-labelledby='email-label' name='email' type='email' placeholder='Email' className={fieldClassName}/>

                    <label id='password-label'>Password</label>
                    <ErrorMessage name='password' component='span' className='text-xs text-red-700'/>
                    <Field aria-labelledby='password-label' name='password' type='password' placeholder='Password' className={fieldClassName}/>
                    
                    <div className='block h-4 invisible'></div>
                    <div>
                    <button role='signup-button' type='submit' className="w-2/4 p-2 mx-12 bg-blue-500 rounded-full hover:bg-blue-700 hover:text-white">Signup</button>
                    <span onClick={() => navigate("/login")} className='font-bold text-blue-700 cursor-pointer'>login</span>
                    </div>
                </Form>
            </Formik>
        </div>
    </>)
}

export default Signup