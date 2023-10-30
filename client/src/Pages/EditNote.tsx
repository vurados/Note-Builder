import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Footer } from "../components/Footer";
import { TopBar } from "../components/TopBar";
import axios from "axios";
import { useParams } from "react-router-dom";


interface FormValues {
    text: string
}


export function EditNote(){
    const {nid} = useParams()
    const [note, setNote] = useState({id: 0, title: '', content: ''})
    
    
    
    useEffect(() => {
        console.log("🚀 ~ file: EditNote.tsx:17 ~ EditNote ~ NID:", nid)
        console.log('note.title ===>',note.title);
        
        // console.log(axios.defaults.baseURL);
        // axios.defaults.baseURL = 'http://localhost:3000'
        // console.log(axios.defaults.baseURL);
        // const NID = checkNID()
        if (nid !== '0' || nid !== undefined){
            fetchNote(nid)
        }
    }, [])

    // const checkNID = () => {
    //     // eslint-disable-next-line react-hooks/rules-of-hooks
        
    //     return NID
    // }

    const fetchNote = async (NID:string | undefined) => {
        await axios.post('/api/users/layouts/notes/getNote/'+NID).then((res) => {
            setNote(res.data)
            console.log('TTTHEEE NOTE', note);
        })
    }

    const onSubmit = async (data: FormValues) => {
        await axios.post('api/users/layouts/createNote', data).then(  (res) => {
            console.log('response data:',res.data);
        })
    }

    const textAreaField = () => {
        return(<>
            <textarea placeholder="write here...." defaultValue={note.content} className="p-3 m-1 w-full h-[90%] resize-none border-2 border-gray-300 outline-blue-400 rounded-lg" />
        </>)
    }

    const ModalInput = () => {
        return(<>
            <input className="px-4 py-1 mb-2 w-full rounded-full border-2 border-gray-300 outline-blue-400 bg-white" defaultValue={note.title} type='text' placeholder="Title" />
        </>)
    }

    const initialValues = {
        title: '' , 
        text: note.content
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