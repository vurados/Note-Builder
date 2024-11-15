import axios from 'axios'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { Footer } from '../components/Footer'
// import { IUser } from 'src/models'
import * as Yup from 'yup'

export default function Signup(){
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

    // TODO: change data type to IUser(add interface in models)
    const onSubmit = async (data :any) => {
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
                    <label className='text-left'>Username:</label>
                    {UniqueUsernameError && <div className='text-xs text-red-700'>Username already exist</div>}
                    <ErrorMessage name='username' component='span' className='text-xs text-red-700'/>
                    <Field name='username' type='text' placeholder='Vlados' className={fieldClassName}/>
                   

                    <label>Email:</label>
                    <ErrorMessage name='email' component='span' className='text-xs text-red-700'/>
                    <Field name='email' type='email' placeholder='tigidik@examle.com' className={fieldClassName}/>

                    <label>Password:</label>
                    <ErrorMessage name='password' component='span' className='text-xs text-red-700'/>
                    <Field name='password' type='password' placeholder='Password' className={fieldClassName}/>
                    
                    <div className='block h-4 invisible '></div>
                    <div>
                    <button type='submit' className="w-2/4 p-2 mx-12 bg-blue-500 rounded-full hover:bg-blue-700 hover:text-white">Signup</button>
                    <Link to={'/login'} ><span className='font-bold text-blue-700'>login</span></Link>
                    </div>
                </Form>
            </Formik>
        </div>
        <Footer />
        {/* <div className="container flex flex-col items-center gap-6 w-3/12 mx-auto mt-10 p-6 rounded-lg border-2 border-blue-400 drop-shadow-sm">
            <span className="">Signin</span>
            <input type="email" name="" id="" placeholder="Username" className=""/>
            <input type="password" name="" id="" placeholder="Password" className=""/>
            <button className="p-2 bg-blue-500 rounded-full">Signin</button>
        </div> */}
    </>)
}