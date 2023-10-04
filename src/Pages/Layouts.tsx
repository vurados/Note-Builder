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
    
    const [modal, setmodal] = useState(false)
    const [listOfLayouts, setListOfLayouts] = useState([])
    // const [loading, setloading] = useState(false)



    useEffect(() => {
        if(user.isAuthentificated){
          axios.post("http://localhost:3001/layouts/getLayouts", user).then((res) =>{
            // console.log(res.data);
            setListOfLayouts(res.data)
            console.log('seted list of layouts', listOfLayouts);
          })
        }
    }, [])

    return(<>
    {modal && <LayoutModal />}
      <div className='flex flex-col gap-10 min-h-70'>
        <TopBar />
        <div id="main" className='container grid grid-cols-4 gap-x-3 gap-y-3 mx-auto text-center min-h-screen pb-96'>
          {listOfLayouts.map((layout: ILayouts) => <LayoutTile layout={layout} key={layout.id} />)}
          <div onClick={() => setmodal(true)}><AddNoteTile /></div>
        </div>
        <Footer />
      </div>
    </>)
}