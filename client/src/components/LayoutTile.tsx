import axios from "axios"
import { ILayouts } from "../models"
import { useNavigate } from "react-router-dom"

import DeleteIcon from "../icon-svg-components/delete"
import { MenuIcon } from "../icon-svg-components/menu"
import { useState } from "react"
import EditIcon from "../icon-svg-components/edit"
import DownloadIcon from "../icon-svg-components/download"


interface LayoutProps{
    layout: ILayouts
    onDelete: () => void
    onChange: (layout:ILayouts) => void
}

export function LayoutTile({layout, onDelete, onChange}: LayoutProps){
    const navigate = useNavigate()

    const [layoutPopUp, setLayoutPopUp] = useState<boolean>(false)
    const noteTitles = layout.Note
   
    const deleteLayout = async (event: React.MouseEvent) => {
        event.stopPropagation()
        const LID = layout.id
        if(LID !== undefined){
            console.log('delete button pressed', LID);
            await axios.delete('api/users/layouts/deleteLayout/'+LID).catch((err) => {console.log(err);})
            onDelete()
        }
    }

    const useLayoutPopUp = (event: React.MouseEvent) => {
        event.stopPropagation()
        setLayoutPopUp((prev) => {return !prev})
    }

    const changeLayout = (event: React.MouseEvent) => {
        event.stopPropagation()
        if(layoutPopUp){setLayoutPopUp(false)}
        onChange(layout)
    }

    const LayoutPopUp = () => {
        return(
            <div className="max-[770px]:hidden z-10 text-black absolute p-3 top-0 right-10 flex flex-col gap-1 rounded-lg border-[1px] bg-gray-200">
                <button onClick={changeLayout} className="flex items-center hover:bg-slate-300 p-3 rounded-sm "><EditIcon className="w-4 h-4 mx-2"/>Edit</ button>
                <button onClick={deleteLayout} className="flex items-center hover:bg-slate-300 p-3 rounded-sm"><DeleteIcon className="w-4 h-4 mx-2"/>Delete</button>
                <button className="flex items-center hover:bg-slate-300 p-3 rounded-sm"><DownloadIcon className="w-4 h-4 mx-2"/>Export Layout</button>
            </div>
        )
    }

    window.addEventListener('click', (event) => {
        event.stopPropagation()
        if(layoutPopUp){
            setLayoutPopUp(false)
        }
    })
    
    return(<>
        <div draggable={true} className="realtive min-h-[230px] h-[17vw] flex flex-col gap-3 justify-evenly p-2 rounded backdrop-blur-sm bg-white/40 hover:cursor-pointer hover:border-sky-600 hover:shadow-lg hover:bg-white" onClick={() => navigate(`/notes/${layout.id}`)}>
            {layoutPopUp && <LayoutPopUp />}
            <button aria-label="menu" onClick={useLayoutPopUp} className="max-[770px]:hidden absolute bg-sky-500 rounded-full right-0 -top-0 m-1 p-1 text-black font-bold hover:text-sky-200"><MenuIcon/></button>
            <button aria-label="delete" onClick={deleteLayout} className="min-[770px]:hidden absolute border bg-red-300 rounded-full right-0 top-0 m-1 p-1 text-black font-bold hover:text-blue-500"><DeleteIcon /></button>
            <h2 className="font-bold text-xl">{layout.title}</h2>
            <div className="mx-7 px-10 py-1 min-h-[120px] h-[13vw] overflow-hidden text-left border-2 rounded-lg truncate text-black">
                <ul className="list-disc">
                    {noteTitles && noteTitles.map((note:{title: string}, index:number) => {return <li key={index}>{note.title}</li>})}
                </ul>
            </div>
            <button onClick={changeLayout} className="min-[770px]:hidden border-2 border-blue-200 mx-auto rounded-full p-2 font-bold text-blue-100 bg-blue-500 hover:bg-blue-700">Edit</button>
        </div></>
    )
}