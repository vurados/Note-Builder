import { useEffect, useState } from "react"
import axios from "axios"

// import { AuthData } from "../auth/AuthWrapper"

import { LayoutTile } from "../components/LayoutTile"
import { TopBar } from "../components/TopBar"
import { AddNoteTile } from "../components/addNote"
import { Footer } from "../components/Footer"
import { LayoutModal } from "../components/LayoutModal"

import { ILayouts } from "src/models"
import Cookies from "js-cookie"
import { redirect } from "react-router-dom"

export function Layouts(){
    // const {user} = AuthData()
    
    const [modal, setModal] = useState<boolean>(false)
    // TODO: add type of ILAYOUT
    const [listOfLayouts, setListOfLayouts] = useState<any[]>([])
    // const [loading, setloading] = useState(false)

    useEffect(() => {
      fetchLayouts()
    }, [])

    

    const fetchLayouts = async () => {
      // console.log(getJwtID())
      const rawuser =  localStorage.getItem('user')
      if (rawuser){
        const user = JSON.parse(rawuser)
        const isAuthed = user.isAuthentificated
        console.log("🚀 ~ file: Layouts.tsx:37 ~ fetchLayouts ~ isAuthed:", isAuthed)
        
        if(isAuthed){
            await axios.get("api/users/layouts/getLayouts").then((res) =>{
              setListOfLayouts(res.data)
              console.log('set list of layouts', listOfLayouts);
            })
        }
      }else{
        redirect("/login")
      }
    }
    
    const createHandler = (layout:any) => {
      setListOfLayouts(prev=> {
        return [...prev, layout]
      })
    }

    // TODO:i need function {onDeleteHandler} that will not request server data through fetchLayouts and just delete the entry using setListLayouts
    const deleteHandler = () => {
      fetchLayouts()
    }

    // add onSubmit function in layoutmodal component as onClose that will call function in here that will setListOflayouts
    return(<>
    {modal && <LayoutModal onCreate={createHandler} onClose={() => setModal(false)}><button className="absolute container p-0 m-0 border-[2px] rounded-full" type="button" onClick={() => setModal(false)}>x</button></LayoutModal>}
      <div className='flex flex-col gap-10 min-h-70'>
        <TopBar />
        <div id="main" className='items-stretch grid grid-cols-4 gap-3 mx-auto text-center min-h-screen mb-96 w-[80vw]'>
          {listOfLayouts.map((layout: ILayouts) => <LayoutTile onDelete={deleteHandler} layout={layout} key={layout.id} />)}
          <div onClick={() => setModal(true)}><AddNoteTile /></div>
        </div>
        <Footer />
      </div>
    </>)
}