import axios from 'axios'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

export function Signin(){

    const initialValues = {
        username: '', 
        email: '',
        password: ''

    }

    const validationSchema = Yup.object().shape({
            username: Yup.string().min(3).max(20).required(),
            email: Yup.string().required(),
            password: Yup.string().required()
        })

    // TODO: change data type to IUser(add interface in models)
    const onSubmit = (data:any) => {
        console.log(data)
        axios.post('http://localhost:3001/users', data).then((res) => {
            console.log('User signed in')
        })
    }

    return(<>
        <div className='container'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <Form className='container flex flex-col gap-3 w-3/12 mx-auto mt-10 p-6 rounded-lg border-2 border-blue-400 drop-shadow-sm'>
                    <label className='text-left'>Username:</label>
                    <ErrorMessage name='username' component='span' className=' text-red-700'/>
                    <Field name='username' type='text' placeholder='Vlados' className='p-1'/>

                    <label>Email:</label>
                    <ErrorMessage name='email' component='span' className=' text-red-700'/>
                    <Field name='email' type='email' placeholder='tigidik@examle.com' className='p-1'/>

                    <label>Password:</label>
                    <ErrorMessage name='password' component='span' className=' text-red-700'/>
                    <Field name='password' type='password' placeholder='Password' className='p-1'/>
                    
                    <div className=' invisible'>gap</div>
                    <button type='submit' className="p-2 bg-blue-500 rounded-full">Signin</button>
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