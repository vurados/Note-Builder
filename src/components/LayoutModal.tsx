import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'


export function LayoutModal(){


    const initialValues = {
        title:"",
        width:0
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(3).max(20).required(),
        width: Yup.string().required()
    })

    const onSubmit = () => {
        
    }

    return(
        <div className="w-screen h-screen bg-black/30">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                        <label>Title</label>
                        <ErrorMessage name='title' component='span' className='text-xs text-red-700' />
                        <Field name='title' type='text' placeholder='Titile' />

                        <label>Width</label>
                        <ErrorMessage name='width' component='span' className='text-xs text-red-700' />
                        <Field name='width' type='number' placeholder='{1-10}'/>
                        
                        <div><button type='submit' className="w-2/4 p-2 mx-12 bg-blue-500 rounded-full">Submit</button></div>
                    </Form>
                </Formik>
        </div>
    )
}