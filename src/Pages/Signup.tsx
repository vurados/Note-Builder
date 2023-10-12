import axios from 'axios'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from 'src/helper_methods/api_request'
import { IUser } from 'src/models'
import * as Yup from 'yup'

export function Signup(){
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

    // TODO: change data type to IUser(add interface in models)
    const onSubmit = async (data :any) => {
        console.log(data)
        // console.log(JSON.stringify(data));
        
        // setUniqueUsernameError(false)
        
        // let req = new Request('http://localhost:3001/api/users/createUser', {
        //     mode: 'cors', //just a safe-guard indicating our intentions of what to allow
        //     credentials: 'include',//when will the cookies and authorization header be sent
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        // });
        // await fetch(req).then((res) => {
        //     console.log(res.json());
        // })
        // -----------------------------------------------------------------------
        // const res = await apiRequest('/users/createUser', data, 'POST')
        // console.log(res)
        // ------------------------------------------------------------------------
        axios.defaults.withCredentials = true
        axios.post('http://localhost:3001/api/users/createUser', data).then((res) => {
            // this is for debugging
                // console.log(res.data)
            console.log(res);
            console.log(res.data.user.id);
            
            if (res.data.error){
                console.log( res.data.msg)
                setUniqueUsernameError(true)
            }else {
                console.log( res.data.msg)
                console.log('token =====>','jwt=', res.data.token);
                document.cookie = 'jwt=' + res.data.token
                console.log('document cookie ==============>',document.cookie);
                
                setUniqueUsernameError(false)
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
                    <Field name='hashedPassword' type='password' placeholder='Password' className={fieldClassName}/>
                    
                    <div className='block h-4 invisible '></div>
                    <div>
                    <button type='submit' className="w-2/4 p-2 mx-12 bg-blue-500 rounded-full">Signup</button>
                    <Link to={'/login'} ><span className='font-bold text-blue-700'>login</span></Link>
                    </div>
                </Form>
            </Formik>
        </div>

        {/* <div className="container flex flex-col items-center gap-6 w-3/12 mx-auto mt-10 p-6 rounded-lg border-2 border-blue-400 drop-shadow-sm">
            <span className="">Signin</span>
            <input type="email" name="" id="" placeholder="Username" className=""/>
            <input type="password" name="" id="" placeholder="Password" className=""/>
            <button className="p-2 bg-blue-500 rounded-full">Signin</button>
        </div> */}
    </>)
}