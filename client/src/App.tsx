import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'


// import { Root } from './Pages/Root';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';
import { Layouts } from './Pages/Layouts';
import { Notes } from './Pages/Notes';
import { EditNote } from './Pages/EditNote';
import { Profile } from './Pages/Profile';

import { AuthWrapper } from './auth/AuthWrapper';
import { Footer } from './components/Footer';
import bgWaveSvg from './assets/graphic/bgWave.svg'



function App() {

  
  const router = createBrowserRouter(
    createRoutesFromElements(<>
        <Route index path="/" element={<Home />}/>
        <Route element={<AuthWrapper/>}>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/layouts" element={<Layouts />}/>
          <Route path="/notes/:lid" element={<Notes />}/>
          <Route path="/editNote/:lid/:nid" element={<EditNote />}/>
          <Route path="/profile" element={<Profile />}/>
        </Route>
      </>
    )
  )


  return (
    <div className='flex flex-col gap-10 bg-sky-400/30' style={{backgroundImage: `url(${bgWaveSvg}`, backgroundSize: "cover"}}>
      <RouterProvider router={router} />
      <Footer />
    </div>    
  );
}



export default App;


