import axios from 'axios';
import { useEffect, useState } from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, Link, Outlet} from 'react-router-dom'

import { LayoutTile } from './components/LayoutTile';
import { NoteTile } from './components/NoteTile';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { AddNoteTile } from './components/addNote';

import { Root } from './Pages/Root';
import { Login } from './Pages/Login';
import { Signin } from './Pages/Signin';
import { Layouts } from './Pages/Layouts';
import { Notes } from './Pages/Notes';
import { EditNote } from './Pages/EditNote';

import { layouts } from './Data/layouts';
import { notes } from './Data/notes';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
            <Route path="/login" element={<Login />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/layouts" element={<Layouts />}/>
            <Route path="/notes" element={<Notes />}/>
            <Route path="/note_edit" element={<EditNote />}/>
      </Route>
    )
  )

  return (
    <>
    <div className='flex flex-col gap-10 min-h-70'>
      <TopBar />
      <div id="main" className='container grid grid-cols-4 gap-x-3 gap-y-3 mx-auto text-center min-h-screen pb-96'>
          {/* {listOfLayouts.map((value, key) => {
            return 
          })} */}
          <LayoutTile layout={layouts[0]}/>
          <NoteTile note={notes[0]}/>
          <NoteTile note={notes[1]}/>
          <NoteTile note={notes[2]}/>
          <NoteTile note={notes[3]}/>
          <NoteTile note={notes[4]}/>
          <AddNoteTile />
      </div>
      <Footer />
    </div>
    
    </>
  );
}



export default App;


