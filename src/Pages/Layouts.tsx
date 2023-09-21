import { useEffect, useState } from "react"
import axios from "axios"

import { LayoutTile } from "../components/LayoutTile"


export function Layouts(){
    const [listOfLayouts, setlistOfLayouts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/layouts").then((response) =>{
      setlistOfLayouts(response.data)
        })
    }, [])

    return(<></>)
}