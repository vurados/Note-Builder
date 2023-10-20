import axios from "axios"
import { ILayouts } from "../models"
import { useNavigate } from "react-router-dom"

interface LayoutProps{
    layout: ILayouts
    onDelete: () => void
}

export function LayoutTile({onDelete, layout}: LayoutProps){
    const navigate = useNavigate()
    
    const layoutTileClassName = 'relative flex flex-col justify-between justify-center border p-2 rounded hover:cursor-pointer hover:border-blue-400 hover:shadow-lg hover:text-blue-500 '

    const deleteLayout = async (LID:number|undefined) => {
        console.log('delete button pressed', LID);
        await axios.delete('api/users/layouts/deleteLayout/'+LID).catch((err) => {console.log(err);})
        onDelete()
    }
    
    return(
        <div className={layoutTileClassName} onClick={() => navigate(`/notes/${layout.id}`)}>
            <button onClick={() => deleteLayout(layout.id)} className="absolute border bg-red-300 rounded-full right-0 top-0 m-1 p-1 text-black font-bold">Del</button>
            <h2 className="font-bold">{layout.title}</h2>
            <button className="border-2 border-blue-200 mx-auto rounded-full p-2 font-bold text-blue-100 bg-blue-500">Edit</button>
        </div>
    )
}