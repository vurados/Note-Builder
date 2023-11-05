import React from 'react';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
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
import { LayoutContext } from './contexts/contexts';




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
    <>
      <RouterProvider router={router} />
      <Footer />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='fixed -bottom-[10px] w-full'>
        <path className='fill-blue-800 opacity-40'  d="M0,32L24,42.7C48,53,96,75,144,90.7C192,107,240,117,288,112C336,107,384,85,432,74.7C480,64,528,64,576,90.7C624,117,672,171,720,165.3C768,160,816,96,864,101.3C912,107,960,181,1008,208C1056,235,1104,213,1152,176C1200,139,1248,85,1296,58.7C1344,32,1392,32,1416,32L1440,32L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path>
      </svg>
    </>
  );
}



export default App;


