import React, { useEffect, useState } from "react";
import Markdown from 'react-markdown'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TopBar } from "../components/TopBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as Yup from 'yup'


interface FormValues {
    title: string
    text: string
}


export function EditNote(){
    const {lid, nid } = useParams()
    const [note, setNote] = useState({id: 0, title: '', content: ''})
    const [edit, setEdit] = useState(true)
    
    
    
    useEffect(() => {
        console.log("🚀 ~ file: EditNote.tsx:17 ~ EditNote ~ NID:", nid)
        console.log('note.title ===>',note.title);
        // console.log('nid !== 0', nid, nid !== '0' , nid !== undefined);
        
        if (nid !== '0'){
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

    

    const RedactNote = () => {
        const onSubmit = async (data: FormValues) => {
            console.log("🚀 ~ file: EditNote.tsx:44 ~ onSubmit ~ data:", data)
            // setNote({title:data.title, content:data.text})
            
            if (note.id === 0){
                await axios.post(`/api/users/layouts/notes/createNote/${lid}`, data).then(  (res) => {
                    setNote(res.data)
                    console.log('response data:',res.data);
                })
            }else{
                await axios.put(`/api/users/layouts/notes/changeNote/${lid}`, data).then(  (res) => {
                    setNote(res.data)
                    console.log('response data:',res.data);
                })
            }
        }

        const textAreaField = () => {
            return(<>
                <textarea placeholder="write here...." defaultValue={note.content} className="p-3 m-1 w-full h-[90%] resize-none border-2 border-gray-300 outline-blue-400 bg-white/80 rounded-lg" />
            </>)
        }

        const ModalInput = () => {
            return(<>
                <input className="px-4 py-1 mb-2 w-full rounded-full border-2 border-gray-300 outline-blue-400 bg-white/80" defaultValue={note.title} type='text' placeholder="Title" />
            </>)
        }

        const initialValues = {
            title: note.title, 
            text: note.content
            // title: '', 
            // text: ''
        }

        const validationSchema = Yup.object().shape({
            title: Yup.string().min(1).max(50lazy).required("Title required"),
            text: Yup.string().min(1).required("Text area couldn't be empty")
        })

        return(
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form id="text-editing-area" className='relative z-10 mx-auto min-h-[100vh] h-[90vh] min-w-[370px] w-[60vw] rounded-lg'>

                <ErrorMessage name='title' component='span' className='text-xs text-red-700'/>
                <Field name='title'  type='text' component={ModalInput} />

                <ErrorMessage name='text' component='span' className='text-xs text-red-700'/>
                <Field name='text' component={textAreaField} />
                
                <div>
                    <button type='button' onClick={() => setEdit(false)} className="relative mx-2 px-3 py-1 right-0 border border-gray-500 rounded-lg hover:cursor-pointer">render</button>
                    <button type='submit' className="relative mx-2 px-3 py-1 right-0 border border-gray-500 rounded-lg hover:cursor-pointer">submit</button>
                </div>
            </Form>
            </Formik>
        )
    }

    const RenderedMarkdown = () => {
        return(
        <div className="relative z-10 mx-auto min-h-[100vh] h-[90vh] min-w-[370px] w-[60vw] rounded-lg">
            <Markdown>{note.content}</Markdown>
            <button type='button' onClick={() => setEdit(true)} className="relative mx-2 px-3 py-1 right-0 border border-gray-500 rounded-lg hover:cursor-pointer">edit</button>
        </div>
        )
    }

    return(<>
        <div className='flex flex-col gap-10 min-h-[100vh]'>
            <TopBar />
            {edit ? <RedactNote /> : <RenderedMarkdown />}
        </div>
    </>)
}