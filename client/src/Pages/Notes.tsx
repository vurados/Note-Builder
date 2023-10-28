import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

import { Footer } from "../components/Footer"
import { NoteTile } from "../components/NoteTile"
import { TopBar } from "../components/TopBar"
import { AddTile } from "../components/addTile"
import { INotes } from "../models"






export function Notes(){
    const {lid} = useParams()
    
    const navigate = useNavigate()

    const [listOfNotes, setListOfNotes] = useState([])
    // const [modal, setModal] = useState<boolean>(false)


    useEffect(() => {
      fetchNotes()
    }, [])

    const fetchNotes = async () => {
        // console.log(getJwtID())
        const rawuser =  localStorage.getItem('user')
        if (rawuser){
            const user = JSON.parse(rawuser)
            const isAuthed = user.isAuthentificated
            console.log("🚀 ~ file: Layouts.tsx:37 ~ fetchLayouts ~ isAuthed:", isAuthed)
            await axios.post('http://localhost:3000/api/users/layouts/notes/getNotesByLayoutId/'+lid).then((res) =>{
                setListOfNotes(res.data)
                console.log('set list of notes', listOfNotes);
            })
        }else{
            navigate("/login")
        }
    }

    

    return(<>
        <div className='flex flex-col gap-10 min-h-70'>
            <TopBar />
            <div id="main" className='items-stretch grid grid-cols-4 gap-3 mx-auto text-center min-h-screen mb-96 w-[80vw]'>
                {listOfNotes.map((note: INotes) => <NoteTile note={note} key={note.id} />)}
                {/* модалка нужна но токо для настройки внешнего вида и может быть тайтла */}
                <div onClick={() => setModal(true)}>Options</div>
                <div onClick={() => navigate('/editNote')}><AddTile /></div>
            </div>
            <Footer />
        </div>
    </>)
}