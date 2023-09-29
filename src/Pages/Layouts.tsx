import { useEffect, useState } from "react"
import axios from "axios"

import { LayoutTile } from "../components/LayoutTile"

import { AuthData } from "../auth/AuthWrapper"
import { TopBar } from "../components/TopBar"
import { AddNoteTile } from "../components/addNote"
import { Footer } from "../components/Footer"

export function Layouts(){
    const [listOfLayouts, setlistOfLayouts] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:3001/layouts").then((response) =>{
          setlistOfLayouts(response.data)
        })
    }, [])

    return(<>
      <div className='flex flex-col gap-10 min-h-70'>
        <TopBar />
        <div id="main" className='container grid grid-cols-4 gap-x-3 gap-y-3 mx-auto text-center min-h-screen pb-96'>
          <AddNoteTile />
        </div>
        <Footer />
      </div>
    </>)
}