import { ILayouts } from "../models"

interface LayoutProps{
    layout: ILayouts
}

export function LayoutTile({layout}: LayoutProps){
    const layoutClassName=['relative flex flex-col justify-between justify-center border p-2 rounded']

    
    return(
        <div className={layoutClassName.join('')}>
            <button className="absolute border bg-red-300 rounded-full right-0 top-0 m-1 p-1">Del</button>
            <h2 className="font-bold">{layout.title}</h2>
            <button className="border-2 border-blue-200 mx-auto rounded-full p-2 font-bold text-blue-100 bg-blue-500">Edit</button>
        </div>
    )
}