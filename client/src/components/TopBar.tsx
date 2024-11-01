// import { useContext } from "react"
// import { TopBarContext } from "../contexts/contexts"

import { Link, useNavigate } from "react-router-dom"
import LogoIcon from "../icon-svg-components/logo"
import ProfileIcon from "../icon-svg-components/profile"
import { SearchIcon } from "../icon-svg-components/search"
import { ChangeEvent, useState } from "react"
import { AuthData } from "../auth/AuthWrapper"
import { LogoutIcon } from "../icon-svg-components/logout"

interface TopBarProps {
    onInputChange: (inputValue: string) => void
    // searchTerm: string
    resetSearch: () => void
}

export function TopBar({ onInputChange, resetSearch }: TopBarProps) {
    // const topBarSearchRequest = useContext(TopBarContext)
    const navigate = useNavigate()
    const [dropDown, setDropDown] = useState(false)
    const [query, setQuery] = useState("")

    const { logout } = AuthData()

    const TopBarElement = (props: any ) => <div className='basis-1/10 px-4 py-2 rounded-lg hover:bg-gray-500 hover:text-white'><a href={props.href}>{props.children}</a></div>

    
    let searchInputTimer: NodeJS.Timeout | null = null
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setQuery(newValue)
        
        if (searchInputTimer!== null) {
            clearTimeout(searchInputTimer)
        }

        searchInputTimer = setTimeout(() =>  {
            onInputChange(newValue)
        }, 1000)
    }


    const onLogout = async () => {
        await logout()
        navigate('/login')
    }

    const TopBarDropDown = () => {

        return (
            <div className="z-20 text-black absolute px-10 py-3 top-[110%] w-[15vw] min-w-[300px] right-0 flex flex-col gap-1 border-[1px] rounded-lg shadow-lg bg-white">
                <Link to='/profile' className="flex items-center hover:bg-slate-300 p-3 rounded-sm "><ProfileIcon />Profile</ Link>
                <button onClick={() => console.log('settings')} className="flex items-center hover:bg-slate-300 p-3 rounded-sm">Settings</button>
                <button onClick={onLogout} className="flex items-center hover:bg-slate-300 p-3 rounded-sm"><LogoutIcon />Logout</button>
            </div>
        )
    }

    return (
        <div className='relative flex py-1 min-h-fit w-full gap-x-10 bg-sky-300  '>
            <div className="relative flex flex-grow flex-wrap mx-auto max-w-[1500px]">
                <Link to="/layouts" className="realtive left-3 mr-auto gap-5 flex items-center">
                    <LogoIcon className=" w-10 h-10" />
                    <span className="font-bold text-4xl align-bottom">NoteBuilder</span>
                </Link>
                <div className="relative flex flex-wrap">
                    <div id="searchInput" className='flex gap-1 px-2 my-2 rounded-full border-2 bg-white'>
                        <SearchIcon />
                        <input id="searchInput" className="border-x-1 outline-none" placeholder="search..." onChange={(e) => onChangeHandler(e)} value={query} type="search" />
                        <button id="reset" className="hover:bg-slate-300 rounded-full w-6 h-6 " onClick={resetSearch}>x</button>
                    </div>
                    <nav className=" flex flex-row flex-nowrap gap-5 text-lgs font-bald">
                        <TopBarElement >+</TopBarElement>
                        <div className='relative basis-[6%] font-bold hover:text-blue-900 px-4 py-2'>
                            <button onClick={() => setDropDown((prev) => !prev)}><ProfileIcon /></button>

                        </div>
                    </nav>
                </div>
                {dropDown && <TopBarDropDown />}
            </div>
        </div>
    )
}
