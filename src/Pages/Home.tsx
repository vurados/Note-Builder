import { Link } from "react-router-dom"
import { Footer } from "../components/Footer"
import { TopBar } from "../components/TopBar"
import { AddNoteTile } from "../components/addNote"

export const Home = () => {



    return(<> 
      <div className="grid grid-cols-2 grid-rows-2 gap-3 mx-auto items-center w-1/2 h-1/2">
        <div className="col-span-full border-1 rounded-lg">
            <Link to="/Layouts" >Enter as guest</Link>
        </div>   
        <div className="border-1 rounded-lg">
          <Link to="/login">Login</Link>
        </div>
        <div className="border-1 rounded-lg">
            <Link to="/signin">Signin</Link>
        </div>
      </div>
    </>)
}