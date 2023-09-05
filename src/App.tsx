import React from 'react';
import { Note } from './components/Note';
import { notes } from './Data/notes';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { AddNoteTile } from './components/addNote';


function App() {
  
  return (
    <>
    <div className='flex flex-col gap-10 min-h-70'>
      <TopBar />
      <div id="main" className='container grid grid-cols-4 gap-x-3 gap-y-3 mx-auto text-center min-h-screen pb-96'>
          <Note note={notes[0]}/>
          <Note note={notes[1]}/>
          <Note note={notes[2]}/>
          <Note note={notes[3]}/>
          <Note note={notes[4]}/>
          <AddNoteTile />
      </div>
      <Footer />
    </div>
    
    </>
  );
}

export default App;


