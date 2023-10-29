import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Footer } from "../components/Footer";
import { TopBar } from "../components/TopBar";
import axios from "axios";
import { ModalInput } from "../components/ModalInput";


interface FormValues {
    text: string
}


export function EditNote(){
    
    useEffect(() => {
        const NID = window.location.href.split('/').slice(-1)[0]
        console.log("🚀 ~ file: EditNote.tsx:16 ~ useEffect ~ NID:", NID)
        if (NID !== '0'){
            fetchNote(NID)
        }
    }, [])

    const fetchNote = async (NID:string) => {
        await axios.get("api/users/layouts/notes/getNote/"+NID).then()
    }

    const onSubmit = async (data: FormValues) => {
        await axios.post('api/users/layouts/createNote', data).then(  (res) => {
            console.log('response data:',res.data);
        })
    }

    const textAreaField = () => {
        return(<>
            <textarea placeholder="write here...." defaultValue={'trun trun'} className="p-3 m-1 w-full h-[90%] resize-none border-2 border-gray-300 outline-blue-400 rounded-lg" />
        </>)
    }

    const initialValues = {
        title:'', 
        text:''
    }

    return(<>
        <div className='flex flex-col gap-10 min-h-70'>
        <TopBar />
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form id="text-editing-area" onSubmit={() => console.log('submitted')} className='relative mx-auto min-h-[40vw] h-[90vh] min-w-[370px] w-[60vw] rounded-lg'>

            <ErrorMessage name='title' component='span' className='text-xs text-red-700'/>
            <Field name='title'  type='text' component={ModalInput} />

            <ErrorMessage name='text' component='span' className='text-xs text-red-700'/>
            <Field name='text' value={'rtum trum'} component={textAreaField} />
         
            <button type='submit' className="absolute px-3 py-1 right-0 border border-gray-500 rounded-lg">submit</button>
        </Form>
        </Formik>
        <Footer />
      </div>
    </>)
}