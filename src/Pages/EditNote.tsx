import { Footer } from "../components/Footer";
import { LayoutTile } from "../components/LayoutTile";
import { TopBar } from "../components/TopBar";
import { AddNoteTile } from "../components/addTile";
import { ILayouts } from "../models";

export function EditNote(){

    return(<>
        <div className='flex flex-col gap-10 min-h-70'>
        <TopBar />
        <div id="main" className='mx-auto min-h-[40vw] w-[60vw] border-2 rounded-lg'>
          
          
        </div>
        <Footer />
      </div>
    </>)
}