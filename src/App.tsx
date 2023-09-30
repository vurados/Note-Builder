// import axios from 'axios';
// import { useEffect, useState } from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider} from 'react-router-dom'


// import { Root } from './Pages/Root';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';
import { Layouts } from './Pages/Layouts';
import { Notes } from './Pages/Notes';
import { EditNote } from './Pages/EditNote';

import { AuthWrapper } from './auth/AuthWrapper';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(<>
        <Route index path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route element={<AuthWrapper/>}>
          <Route path="/login" element={<Login />}/>
          <Route path="/layouts" element={<Layouts />}/>
          <Route path="/notes" element={<Notes />}/>
          <Route path="/note_edit" element={<EditNote />}/>
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


