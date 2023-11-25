import { useEffect, useLayoutEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import * as Yup from 'yup'

import { LayoutTile } from "../components/LayoutTile"
import { TopBar } from "../components/TopBar"
import { AddTile } from "../components/addTile"
// import { LayoutModal } from "../components/LayoutModal"
import { ILayouts } from "../models"
import { useNavigate } from "react-router-dom"
import { Formik, Form, ErrorMessage, Field } from "formik"
import { Spinner } from "../components/spinner"

import '../App.css'

export default function Layouts(){
    // let {lid} = AuthData()
    // let {lid} = useContext(AuthContext)
    const navigation = useNavigate()

    // const layoutModalContext = createContext<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)
    const [onChangeLayout, setOnChangeLayout] = useState<ILayouts>()
    const [listOfLayouts, setListOfLayouts] = useState<ILayouts[]>([])
    const [loading, setLoading] = useState(false)
    const [newFlag, setNewFlag] = useState(true)

    // On start set flags and onChangeLAyout state 
    // so modal do not fire after reloading page
    useLayoutEffect(() => {
      setOnChangeLayout(undefined)
      setNewFlag(true)
    }, [])

    // On loading we are checking if there is a jwt token exist
    // If there is token - fetch
    // If not - redirect to login page
    useEffect(() => {
      const JwtExist =  Cookies.get('jwtExist')
      if (JwtExist){
        fetchLayouts()
      }else{  
        navigation("/login")
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(listOfLayouts)])

    const fetchLayouts = async () => {
      // console.log(getJwtID())
      setLoading(true)
      await axios.get("api/users/layouts/getLayouts").then((res) =>{
        setListOfLayouts(res.data)
        setLoading(false)
        console.log('set list of layouts', listOfLayouts);
      })
    }
    
    const createHandler = (layout:ILayouts) => {
      setListOfLayouts(prev=> {
        return [...prev, layout]
      })
    }

    // TODO:need function {onDeleteHandler} that will not request server data through fetchLayouts and just delete the entry using setListLayouts
    const deleteHandler = () => {
      fetchLayouts()
    }

    // after clicking "edit" on LAyout tile we change newFlag to false and set onChangeLayout to layout we clicking on
    const changeHandler = async (layout:ILayouts) => {
      setNewFlag(false)
      setOnChangeLayout(layout)
    }

    // when we setting onChangeLayout use effect fires and opens modal
    // we need useEffect to wait for onChangeLAyout to set and put Layout information in modal for edit
    useEffect(() => {
      if (onChangeLayout){
        console.log('useeffect onchange hadndler', onChangeLayout);
        setModal(true)
      }
    }, [onChangeLayout])

    const exportJson = async () => {
      const data = await axios.get('api/users/layouts/exportAll').then((res) => {return res.data}).catch((err) => {console.error(err)})
      const strData = JSON.stringify(data)
      const file = new Blob([strData], {type: 'text/plain'})
      const element = document.createElement("a");
      element.href = URL.createObjectURL(file);
      element.download = "Layouts-" + Date.now() + ".txt";
      // simulate link click
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
    

    const LModal = () => {

          const initialValues:ILayouts = {
              title: onChangeLayout?.title || '',
              color: "#000000",
              width: onChangeLayout?.width || undefined
          }
      

        const validationSchema = Yup.object().shape({
            title: Yup.string().min(3).max(20).required("Title required"),
            color: Yup.string().required("Color required"),
            width: Yup.number().integer().nullable().min(1).max(10).required("Width required")
        })

        // In on submit function we checking flag newFlag and depend on it sending post or put request
        const onSubmit = async (data:ILayouts) => {
            console.log('on submit data:',data);
            if(newFlag){
              await axios.post('api/users/layouts/createLayout', data).then(  (res) => {
                  console.log('response data:',res.data)
                  createHandler(res.data)
              })
            }else{
              console.log('changing Layout');
              
              await axios.put(`api/users/layouts/changeLayout/${onChangeLayout?.id}`, data).then(  (res) => {
                  console.log('response data:',res.data)
                  setNewFlag(false)
                  // TODO: change fetch to something else
                  fetchLayouts()
              })
              setModal(false)
            }
        }

        return(<>
            <div id="backdrop" className="z-10 fixed w-full h-full bg-black/60 backdrop-blur-sm">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className="absolute container min-w-fit flex flex-col gap-3 w-1/4 left-1/2 -translate-x-1/2 top-1/3 p-6 rounded-lg border-2 border-blue-400 bg-white">
                        <button className="absolute py-0 px-2 m-0 -right-8 -top-3 border-[2px] rounded-full font-bold hover:text-red-700" type="button" onClick={() => setModal(false)}>x</button>

                        <label className="font-bold">Title</label>
                        <ErrorMessage name='title' component='span' className='text-xs text-red-700' />
                        <Field name='title' type='text' defaultValue={onChangeLayout?.title} placeholder='Title' />

                        <label className="font-bold">Color</label>
                        <ErrorMessage name='color' component='span' className='text-xs text-red-700' />
                        <Field name='color' type='color' />

                        <label className="font-bold">Width</label>
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


    return(<>
      {modal && <LModal />}
      {/* <div className='flex flex-col min-h-[100vh] bg-gradient-to-r from-sky-200 to-indigo-500'> */}
        <TopBar />
        {loading && <div className="flex mx-auto"><Spinner className='mx-2' width='20'/><p className="w-fit text-blue-400">Syncing existing layouts</p></div>}
        <div id="main-wrapper" className="min-h-screen">
          <button id="export-all-as-json-btn" onClick={exportJson} className="absolute min-[1500px]:block hidden right-3 py-2 px-4 w-fit bg-sky-400 rounded-lg hover:text-white hover:bg-sky-500 hover:shadow-md">Export as Json</button>
          <div id="main" className='items-stretch grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-auto text-center mb-96 w-[98vw] min-[1500px]:w-[80vw]'>
            {listOfLayouts.map((layout: ILayouts) => <LayoutTile onChange={(layout) => changeHandler(layout)} onDelete={deleteHandler} layout={layout} key={layout.id} />)}
            <div onClick={() => setModal(true)}><AddTile /></div>
          </div>
        </div>
    </>)
}