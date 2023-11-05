import { useNavigate } from "react-router-dom"
import { INotes } from "../models"

interface NoteProps{
    note: INotes
    lid: string | undefined
}

export function NoteTile({note, lid}: NoteProps){
    const noteClassName=[`relative flex flex-col justify-between justify-center  border p-2 rounded col-span-${note.width} row-span-${note.height} hover:cursor-pointer`]
    const navigate = useNavigate()
    
    
    return(
        <div className={noteClassName.join('')} onClick={() => navigate(`/editNote/${lid}/${note.id}`)}>
            <button className="absolute border bg-red-300 rounded-full right-0 top-0 m-1 p-1">Del</button>
            <h2 className="font-bold">{note.title}</h2>
            <div className="grow"><p>{note.content}</p></div>
            <button className="border-2 border-blue-200 mx-auto rounded-full p-2 font-bold text-blue-100 bg-blue-500">Edit</button>
        </div>
    )
}

