import axios from 'axios';
import { useEffect, useState } from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider} from 'react-router-dom'


import { Root } from './Pages/Root';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';
import { Layouts } from './Pages/Layouts';
import { Notes } from './Pages/Notes';
import { EditNote } from './Pages/EditNote';



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(<>
        <Route path='/' element={<Root />} />
        <Route index path="/home" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/layouts" element={<Layouts />}/>
        <Route path="/notes" element={<Notes />}/>
        <Route path="/note_edit" element={<EditNote />}/>
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


