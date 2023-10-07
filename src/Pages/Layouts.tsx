import { useEffect, useState } from "react"
import axios from "axios"

import { AuthData } from "../auth/AuthWrapper"

import { LayoutTile } from "../components/LayoutTile"
import { TopBar } from "../components/TopBar"
import { AddNoteTile } from "../components/addNote"
import { Footer } from "../components/Footer"
import { LayoutModal } from "../components/LayoutModal"

import { ILayouts } from "src/models"

export function Layouts(){
    const {user} = AuthData()
    
    const [modal, setModal] = useState(false)
    const [listOfLayouts, setListOfLayouts] = useState<any[]>([])
    // const [loading, setloading] = useState(false)
    
    // const {} = LayoutModal()

    useEffect(() => {
      fetchLayouts()


        // if(user.isAuthentificated){
        //   axios.post("http://localhost:3001/layouts/getLayouts", user).then((res) =>{
        //     // console.log(res.data);
        //     setListOfLayouts(res.data)
        //     console.log('set list of layouts', listOfLayouts);
        //     // const lastElement = listOfLayouts.slice(-1)
        //     // console.log('last element', lastElement);
            
        //     // const iddd = lastElement[0]['id']
        //     // console.log('id', iddd);
        //     // listOfLayouts.slice(-1)[0]['id']
        //   })
        // }
    }, [])

    const fetchLayouts = async () => {
      if(user.isAuthentificated){
          await axios.post("http://localhost:3001/layouts/getLayouts", user).then((res) =>{
            setListOfLayouts(res.data)
            console.log('set list of layouts', listOfLayouts);
          })
        }
    }
    // TODO:
    // i need function {onDeleteHandler} that will not request server data through fetchLayouts and just delete the entry using setListLayouts

    const createHandler = (layout:any) => {
      setListOfLayouts(prev=> {
        return [...prev, layout]
      })
    }

    // add onSubmit function in layoutmodal component as onClose that will call function in here that will setListOflayouts
    return(<>
    {modal && <LayoutModal onCreate={createHandler} onClose={() => setModal(false)}/>}
      <div className='flex flex-col gap-10 min-h-70'>
        <TopBar />
        <div id="main" className='container grid grid-cols-4 gap-x-3 gap-y-3 mx-auto text-center min-h-screen pb-96'>
          {listOfLayouts.map((layout: ILayouts) => <LayoutTile onDelete={fetchLayouts} layout={layout} key={layout.id} />)}
          <div onClick={() => setModal(true)}><AddNoteTile /></div>
        </div>
        <Footer />
      </div>
    </>)
}