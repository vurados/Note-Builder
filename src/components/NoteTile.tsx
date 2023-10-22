import { INotes } from "../models"

interface NoteProps{
    note: INotes
}

export function NoteTile({note}: NoteProps){
    const noteClassName=['relative flex flex-col justify-between justify-center border p-2 rounded col-span-', note.width, ' row-span-', note.height]

    
    return(
        <div className={noteClassName.join('')} ref={'/editNote/'+note.id}>
            <button className="absolute border bg-red-300 rounded-full right-0 top-0 m-1 p-1">Del</button>
            <h2 className="font-bold">{note.title}</h2>
            <div className="grow"><p>{note.content}</p></div>
            <button className="border-2 border-blue-200 mx-auto rounded-full p-2 font-bold text-blue-100 bg-blue-500">Edit</button>
        </div>
    )
}

