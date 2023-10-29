import { createContext, useEffect, useState } from "react"
import axios from "axios"
import * as Yup from 'yup'

import { LayoutTile } from "../components/LayoutTile"
import { TopBar } from "../components/TopBar"
import { AddTile } from "../components/addTile"
import { Footer } from "../components/Footer"
// import { LayoutModal } from "../components/LayoutModal"

import { ILayouts } from "../models"
// import Cookies from "js-cookie"
import { Link, redirect } from "react-router-dom"
import { Formik, Form, ErrorMessage, Field } from "formik"


export function Layouts(){
    // const {user} = AuthData()
    // const user = useContext(AuthContext)

    // const layoutModalContext = createContext<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)
    const [listOfLayouts, setListOfLayouts] = useState<ILayouts[]>([])
    // const [loading, setloading] = useState(false)

    useEffect(() => {
      const rawuser =  localStorage.getItem('user')
      if (rawuser){
        fetchLayouts()
      }else{
        redirect("/login")
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(listOfLayouts)])

    const fetchLayouts = async () => {
      // console.log(getJwtID())
      await axios.get("api/users/layouts/getLayouts").then((res) =>{
        setListOfLayouts(res.data)
        console.log('set list of layouts', listOfLayouts);
      })
    }
    
    const createHandler = (layout:ILayouts) => {
      setListOfLayouts(prev=> {
        return [...prev, layout]
      })
    }

    // TODO:i need function {onDeleteHandler} that will not request server data through fetchLayouts and just delete the entry using setListLayouts
    const deleteHandler = () => {
      fetchLayouts()
    }

   
    const LModal = () => {

        const initialValues:ILayouts = {
            width: undefined,
            color: "#FFFFFF",
            title:""
        }

        const validationSchema = Yup.object().shape({
            title: Yup.string().min(3).max(20).required("Title required"),
            color: Yup.string().required("Color required"),
            width: Yup.number().integer().nullable().min(1).max(10).required("Width required")
        })

        const onSubmit = async (data:ILayouts, ) => {
            console.log('on submit data:',data);
            
            await axios.post('api/users/layouts/createLayout', data).then(  (res) => {
                console.log('response data:',res.data);
                createHandler(res.data)
            })
        }

        return(<>
            <div className="fixed w-full h-full bg-black/60 backdrop-blur-sm z-10">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className="absolute container flex flex-col gap-3 w-1/4 left-1/2 -translate-x-1/2 top-1/3 p-6 rounded-lg border-2 border-blue-400 bg-white">
                        <button className="absolute py-0 px-2 m-0 -right-8 -top-3 border-[2px] rounded-full font-bold hover:text-red-700" type="button" onClick={() => setModal(false)}>x</button>

                        <label>Title</label>
                        <ErrorMessage name='title' component='span' className='text-xs text-red-700' />
                        <Field name='title' type='text' placeholder='Title' />

                        <label>Color</label>
                        <ErrorMessage name='color' component='span' className='text-xs text-red-700' />
                        <Field name='color' type='color' />

                        <label>Width</label>
                        <ErrorMessage name='width' component='span' className='text-xs text-red-700' />
                        <Field name='width' type='number' placeholder='{1-10}'/>
                        
                        <div className="invisible h-10"></div>
                        
                        <div className="flex flex-auto flex-wrap">
                          <button 
                            type='submit' 
                            className="mx-auto w-2/4 min-w-fit p-2 bg-blue-500 rounded-full hover:text-white hover:bg-blue-700"
                          >
                            Submit
                          </button>
                          <button 
                            type='button' 
                            onClick={() => setModal(false)} 
                            className="mx-auto font-bold hover:text-blue-700"
                          >
                            close
                          </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>)
    }


    // add onSubmit function in layoutmodal component as onClose that will call function in here that will setListOflayouts
    return(<>
    {modal && <LModal />}
      <div className='flex flex-col gap-10 min-h-70'>
        <TopBar />
        <div id="main" className='items-stretch lg:grid grid-cols-4 gap-3 mx-auto text-center mb-96 w-[80vw]'>
                                                         {/*   TODO: react router Link state gl future me */}
          {listOfLayouts.map((layout: ILayouts) => <Link to={"/notes/"+layout.id}  state={layout.width} ><LayoutTile onDelete={deleteHandler} layout={layout} key={layout.id} /></Link>)}
          <div onClick={() => setModal(true)}><AddTile /></div>
        </div>
        <Footer />
      </div>
    </>)
}