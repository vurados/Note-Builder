import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'


export function LayoutModal(){


    const initialValues = {
        title:"",
        width:0
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(3).max(20).required(),
        width: Yup.number().required()
    })

    const onSubmit = async (data:any) => {
        console.log(data[0]);
        
        // await axios.post('http://localhost:3001/layouts/createLayout', data).then(  (res) => {
        //     console.log(res.data);
        // })
    }

    return(
        <div className="fixed w-full h-full bg-black/60 backdrop-blur-sm z-10">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className="absolute container flex flex-col gap-3 w-1/4 left-[40%] top-1/3 p-6 rounded-lg border-2 border-blue-400 bg-white">
                        <label>Title</label>
                        <ErrorMessage name='title' component='span' className='text-xs text-red-700' />
                        <Field name='title' type='text' placeholder='Titile' />

                        <label>Width</label>
                        <ErrorMessage name='width' component='span' className='text-xs text-red-700' />
                        <Field name='width' type='number' placeholder='{1-10}'/>
                        <div className="invisible h-10"></div>
                        <div className=""><button type='submit' className="mx-10 w-2/4 p-2 bg-blue-500 rounded-full hover:text-white hover:bg-blue-700">Submit</button><button className="font-bold hover:text-blue-700">close</button></div>
                    </Form>
                </Formik>
        </div>
    )
}