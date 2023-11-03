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




function App() {

  

  const router = createBrowserRouter(
    createRoutesFromElements(<>
        <Route index path="/" element={<Home />}/>
        <Route element={<AuthWrapper/>}>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/layouts" element={<Layouts />}/>
          <Route path="/notes/:lid" element={<Notes />}/>
          <Route path="/editNote/:nid" element={<EditNote />}/>
          <Route path="/profile" element={<Profile />}/>
        </Route>
      </>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}



export default App;


