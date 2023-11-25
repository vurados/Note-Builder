// import { useContext } from "react"
// import { TopBarContext } from "../contexts/contexts"

import { Link } from "react-router-dom"
import LogoIcon from "../icon-svg-components/logo"
import ProfileIcon from "../icon-svg-components/profile"
import { SearchIcon } from "../icon-svg-components/search"

export function TopBar(){
    // const topBarSearchRequest = useContext(TopBarContext)
    
    const TopBarElement = (props:any) => <div className='basis-1/10 px-4 py-2 rounded-lg hover:bg-gray-500 hover:text-white'><a href={props.href}>{props.children}</a></div>
    const SearchInput = () => {
        return(
            <div className='flex gap-1 px-2 my-2 rounded-full border-2 bg-white'>
                <SearchIcon />
                <input className="border-x-1 outline-none" placeholder="search..."/>
            </div>
        )
    }


    return(
        <div className='relative flex py-1 min-h-fit w-full gap-x-10 bg-sky-300  '>
            <div className="flex flex-grow flex-wrap mx-auto max-w-[1500px]">
                <Link to="/layouts" className="realtive left-3 mr-auto gap-5 flex items-center">
                    <LogoIcon className=" w-10 h-10 "/>
                    <span className="font-bold text-4xl align-bottom">NoteBuilder</span>
                </Link>
                <div className="relative flex flex-wrap">
                    <SearchInput/>
                    <nav className=" flex flex-row flex-nowrap gap-5 text-lgs font-bald">
                        <TopBarElement >menu</TopBarElement>
                        <div className='basis-[6%] font-bold hover:text-blue-900 px-4 py-2'>
                            <Link  to='/login'><ProfileIcon /></Link>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}