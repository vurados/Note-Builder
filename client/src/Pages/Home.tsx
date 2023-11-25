import { Link } from "react-router-dom"

export default function Home() {



  return(<> 
    <div className="static h-screen w-screen">
      <div className="absolute z-10 grid grid-cols-1 gap-3 left-1/4 top-1/4 w-1/2 h-1/2 sm:grid-cols-2">
        <div className="min-w-fit mx-auto col-span-full border-2 rounded-lg w-1/2 h-full hover:border-blue-400 hover:bg-gray-100 hover:text-blue-600 hover:shadow-lg">
          <Link to="/layouts">
            <div className="flex flex-col justify-center h-full">
              <p className="mx-auto text-3xl">Enter as guest</p>
            </div>
          </Link>
        </div>  
        <div className="min-w-fit w-3/4 h-full border-2 rounded-lg sm:place-self-end hover:border-blue-400 hover:bg-gray-100 hover:text-blue-600 hover:shadow-lg">
          <Link to="/login">
            <div className="flex flex-col justify-center h-full">
              <p className="mx-auto text-3xl">Login</p>
            </div>
          </Link>
        </div>
        <div className="min-w-fit w-3/4 h-full border-2 rounded-lg sm:place-self-start hover:border-blue-400 hover:bg-gray-100 hover:text-blue-600 hover:shadow-lg">
          <Link to="/signup">
            <div className="flex flex-col justify-center h-full">
              <p className="mx-auto text-3xl">Signup</p>
            </div>
          </Link>
        </div>  
      </div>
    </div>
  </>)
}