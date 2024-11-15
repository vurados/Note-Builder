import { Route, Routes} from 'react-router-dom'
import { lazy, Suspense } from 'react';

// import  Home  from './Pages/Home';
// import  Login  from './Pages/Login';
// import  Signup  from './Pages/Signup';
// import  Layouts  from './Pages/Layouts';
// import  Notes  from './Pages/Notes';
// import  EditNote  from './Pages/EditNote';
// import  Profile  from './Pages/Profile';

import { AuthWrapper } from './auth/AuthWrapper';
import { Footer } from './components/Footer';
import bgTriImg from './assets/graphic/blueTriBg.webp'
import { Spinner } from './components/spinner';


const Signup = lazy(() => import('./Pages/Signup'))
const Login = lazy(() => import('./Pages/Login'))
const Home = lazy(() => import('./Pages/Home'))
const Profile = lazy(() => import('./Pages/Profile'))
const Layouts = lazy(() => import('./Pages/Layouts'))
const Notes = lazy(() => import('./Pages/Notes'))
const EditNote = lazy(() => import('./Pages/EditNote'))


function App() {

  

  return(
    <div id="App" className='flex flex-col gap-10 bg-sky-100' style={{backgroundImage: `url(${bgTriImg}`, backgroundSize: "cover", backgroundRepeat: "repeat"}}>
      <Suspense fallback={<div className='h-screen w-screen'><Spinner width='50'/>Loading...</div>}>
        <Routes>
          <Route index path="/" element={<Home />}/>
            <Route path="/signup" element={<Signup />}/>
          <Route element={<AuthWrapper/>}>
            <Route path="/login" element={<Login />}/>
            <Route path="/layouts" element={<Layouts />}/>
            <Route path="/notes/:lid" element={<Notes />}/>
            <Route path="/editNote/:lid/:nid" element={<EditNote />}/>
            <Route path="/profile" element={<Profile />}/>
          </Route>
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}



export default App;


