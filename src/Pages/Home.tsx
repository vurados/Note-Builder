import { Footer } from "../components/Footer"
import { TopBar } from "../components/TopBar"
import { AddNoteTile } from "../components/addNote"

export const Home = () => {
    return(<> 
    <div className='flex flex-col gap-10 min-h-70'>
      <TopBar />
      <div id="main" className='container grid grid-cols-4 gap-x-3 gap-y-3 mx-auto text-center min-h-screen pb-96'>
          <AddNoteTile />
      </div>
      <Footer />
    </div>
    </>)
}