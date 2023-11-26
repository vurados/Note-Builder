import { createContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

import { NoteTile } from "../components/NoteTile"
import { TopBar } from "../components/TopBar"
import { AddTile } from "../components/addTile"
import { INotes } from "../models"



export default function Notes(){
    const {lid} = useParams()
    
    const navigate = useNavigate()
    // const modalSwitch = createContext(false)
    const [listOfNotes, setListOfNotes] = useState<INotes[]>([])
    // const [modal, setModal] = useState<boolean>(false)


    useEffect(() => {
        const JwtExist =  Cookies.get('jwtExist')
        if (JwtExist){
            fetchNotes()
        }else{
            navigate("/login")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(listOfNotes)])

    const fetchNotes = async () => {
        // console.log(getJwtID())
        await axios.post(`http://localhost:3000/api/users/layouts/notes/getNotesByLayoutId/${lid}`).then((res) =>{
            setListOfNotes(res.data)
            console.log('set list of notes', listOfNotes);
        })
    }

    

    return(<>
            <TopBar />
            <div className="min-h-screen">
                <div id='main' className='items-stretch grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-auto text-center mb-96 w-[98vw] min-[1500px]:w-[80vw]'>
                    {listOfNotes.map((note: INotes) => <NoteTile note={note} lid={lid} key={note.id} />)}
                    {/* модалка нужна но токо для настройки внешнего вида и может быть тайтла */}
                    {/* <div onClick={() => setModal(true)}>Options</div> */}
                    <div onClick={() => navigate(`/editNote/${lid}/0`)}><AddTile /></div>
                </div>
            </div>
    </>)
}