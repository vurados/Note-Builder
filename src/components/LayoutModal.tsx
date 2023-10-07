import {useCallback} from 'react'
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'

import { AuthData } from "../auth/AuthWrapper"

interface ILayoutModal{
        id?: number
        width: number
        layout:{
            title: string
        }
    }

interface LayoutModalProps{
    onClose: () => void
    onCreate: (layout:ILayoutModal) => void
}

export function LayoutModal({onClose, onCreate}: LayoutModalProps){
    const{user} = AuthData()

    

    const initialValues = {
        width:0,
        layout:{
            title:""
        }
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(3).max(20).required(),
        width: Yup.number().required()
    })

    const onSubmit = async (data:ILayoutModal) => {
        data['id'] = user.id
        console.log('on submit data:',data);
        
        await axios.post('http://localhost:3001/layouts/createLayout', data).then(  (res) => {
            console.log('response data:',res.data);
            onCreate(res.data)
        })

    }

    // const addLayout()

    // const closeModal = useCallback(() => setModal(false), [onModalChange])

    return(
        <div className="fixed w-full h-full bg-black/60 backdrop-blur-sm z-10">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className="absolute container flex flex-col gap-3 w-1/4 left-1/2 -translate-x-1/2 top-1/3 p-6 rounded-lg border-2 border-blue-400 bg-white">
                        <label>Title</label>
                        <ErrorMessage name='title' component='span' className='text-xs text-red-700' />
                        <Field name='title' type='text' placeholder='Titile' />

                        <label>Width</label>
                        <ErrorMessage name='width' component='span' className='text-xs text-red-700' />
                        <Field name='width' type='number' placeholder='{1-10}'/>
                        <div className="invisible h-10"></div>
                        <div className=""><button type='submit' className="mx-10 w-2/4 p-2 bg-blue-500 rounded-full hover:text-white hover:bg-blue-700">Submit</button><button type='button' onClick={onClose} className="font-bold hover:text-blue-700">close</button></div>
                    </Form>
                </Formik>
        </div>
    )
}