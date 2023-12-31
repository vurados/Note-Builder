export function TopBar(){
    

    const topBarElementClassName = 'basis-1/10 px-4 py-2 rounded-lg hover:bg-gray-500 hover:text-white'
    const TopBarElement = (props:any) => <li className={topBarElementClassName}>{props.children}</li>
    const SearchBar = () => <div className='px-2 my-2 rounded-full border-2 bg-white'>
                                <input className="border-x-1 outline-none" placeholder="search..."/>
                            </div>


    return(
        <div className='flex flex-row justify-end flex-wrap gap-10 bg-gray-300 mx-auto h-12 py-1 w-full'>
            <SearchBar/>
            <nav className="font-bald">
                <ul className='flex flex-row flex-nowrap gap-5 text-lgs'>
                    <TopBarElement>menu</TopBarElement>
                    <li className='basis-[6%] font-bold hover:text-blue-900 px-4 py-2'>
                        <a  href='/login'>
                            login
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}