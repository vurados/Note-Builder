import { Link, Outlet } from "react-router-dom"
import { Footer } from "../components/Footer"
import { TopBar } from "../components/TopBar"
import { AddNoteTile } from "../components/addNote"

export const Root = () => {
    return(<> 
        <div>
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signin">Signin</Link>
        </div>
        <div>
            <Outlet />
        </div>
    </>)
}