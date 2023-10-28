import React from "react";
import { Field, Form, Formik } from "formik";
import { Footer } from "../components/Footer";
import { TopBar } from "../components/TopBar";
import axios from "axios";


interface FormValues {
    text: string
}


export function EditNote(){

    const onSubmit = async (data: FormValues) => {
        await axios.post('api/users/layouts/createLayout', data).then(  (res) => {
            console.log('response data:',res.data);
        })
    }

    const textAreaField = () => {
        return(<>
            <textarea placeholder="write here...." defaultValue={'trun trun'} className="p-3 m-1 w-full h-[90%] resize-none border-2 border-gray-300 outline-blue-400 rounded-lg" />
        </>)
    }

    return(<>
        <div className='flex flex-col gap-10 min-h-70'>
        <TopBar />
        <Formik initialValues={{text:''}} onSubmit={onSubmit}>
        <Form id="text-editing-area" onSubmit={() => console.log('submitted')} className='relative mx-auto min-h-[40vw] h-[90vh] min-w-[370px] w-[60vw] rounded-lg'>
          <Field name='text' value={'rtum trum'} component={textAreaField} />
          <button type='submit' className="absolute px-3 py-1 right-0 border border-gray-500 rounded-lg">submit</button>
        </Form>
        </Formik>
        <Footer />
      </div>
    </>)
}