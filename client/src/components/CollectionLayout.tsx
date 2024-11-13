import { useNavigate } from "react-router-dom"
import { ICollection } from "../models"
import axios from "axios"
import { useState } from "react"
import collection from "../icon-svg-components/collection"
import DeleteIcon from "../icon-svg-components/delete"
import DownloadIcon from "../icon-svg-components/download"
import EditIcon from "../icon-svg-components/edit"
import { MenuIcon } from "../icon-svg-components/menu"



interface CollectionLayoutProps {
    collectionList: ICollection[]
    onDelete: () => void
    onChange: (collection:ICollection) => void
}

export const CollectionLayout = ({collectionList, onDelete, onChange}: CollectionLayoutProps) => {
    const navigate = useNavigate()

    const [collectionPopUp, setCollectionPopUp] = useState<boolean>(false)
    const noteTitles = collection.Note
   
    const deleteCollection = async (event: React.MouseEvent) => {
        event.stopPropagation()
        const CID = collection.id
        if(CID !== undefined){
            console.log('delete button pressed', CID);
            await axios.delete(`api/collections/deleteCollection/${CID}`).catch((err) => {console.log(err);})
            onDelete()
        }
    }

    const useCollectionPopUp = (event: React.MouseEvent) => {
        event.stopPropagation()
        setCollectionPopUp((prev) => {return !prev})
    }

    const changeCollection = (event: React.MouseEvent) => {
        event.stopPropagation()
        if(collectionPopUp){setCollectionPopUp(false)}
        onChange(collection)
    }

    const CollectionPopUp = () => {
        return(
            <div className="max-[770px]:hidden z-10 text-black absolute p-3 top-0 right-10 flex flex-col gap-1 rounded-lg border-[1px] bg-gray-200">
                <button onClick={changeCollection} className="flex items-center hover:bg-slate-300 p-3 rounded-sm "><EditIcon className="w-4 h-4 mx-2"/>Edit</ button>
                <button onClick={deleteCollection} className="flex items-center hover:bg-slate-300 p-3 rounded-sm"><DeleteIcon className="w-4 h-4 mx-2"/>Delete</button>
                <button className="flex items-center hover:bg-slate-300 p-3 rounded-sm"><DownloadIcon className="w-4 h-4 mx-2"/>Export Layout</button>
            </div>
        )
    }

    window.addEventListener('click', (event) => {
        event.stopPropagation()
        if(collectionPopUp){
            setCollectionPopUp(false)
        }
    })

    collectionList.map((collection) => {
        return(
            <>
            <div draggable={true} className="realtive min-h-[230px] h-[17vw] flex flex-col gap-3 justify-evenly p-2 rounded backdrop-blur-sm bg-white/40 hover:cursor-pointer hover:border-sky-600 hover:shadow-lg hover:bg-white" onClick={() => navigate(`/notes/${collection.id}`)}>
                {collectionPopUp && <CollectionPopUp />}
                <button aria-label="menu" onClick={useCollectionPopUp} className="max-[770px]:hidden absolute bg-sky-500 rounded-full right-0 -top-0 m-1 p-1 text-black font-bold hover:text-sky-200"><MenuIcon/></button>
                <button aria-label="delete" onClick={deleteCollection} className="min-[770px]:hidden absolute border bg-red-300 rounded-full right-0 top-0 m-1 p-1 text-black font-bold hover:text-blue-500"><DeleteIcon /></button>
                <h2 className="font-bold text-xl">{collection.title}</h2>
                <div className="mx-7 px-10 py-1 min-h-[120px] h-[13vw] overflow-hidden text-left border-2 rounded-lg truncate text-black">
                    <ul className="list-disc">
                        {noteTitles && noteTitles.map((note:{title: string}, index:number) => {return <li key={index}>{note.title}</li>})}
                    </ul>
                </div>
                <button onClick={changeCollection} className="min-[770px]:hidden border-2 border-blue-200 mx-auto rounded-full p-2 font-bold text-blue-100 bg-blue-500 hover:bg-blue-700">Edit</button>
            </div>
            </>
        )
    })
}