import { useState } from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import data from './data.json'
import Temp from './Temp';
import GalleryDataContext from './Contexts/GalaryDataContext';

export default function(){

    const [selectedArr, setSelectedArr] = useState([]);
    const [gridItems,setGridItems] = useState([...data]);

    function handleDelete(){

        const updatedArray = gridItems.filter(item=>!selectedArr.includes(item.id));
        
        setGridItems([...updatedArray]);
        setSelectedArr([]);
    }

    return(
        <GalleryDataContext.Provider value={{selectedArr,setSelectedArr,gridItems,setGridItems}}>
            <div className='w-full h-fit flex justify-center pb-10'>

                <div className='w-11/12 md:w-8/12 border border-black mt-5 rounded-xl'>
                    <div className='w-full px-5 py-5 flex justify-between items-center text-xl font-semibold'>
                        <div className={`${!selectedArr.length ? 'flex' : 'hidden'}`}>Gallery</div>
                        <div className={` gap-3 items-center ${selectedArr.length ? 'flex' : 'hidden'}`}>
                            <input type="checkbox" className='h-4 w-4' checked/>
                            <div>3 File{`${selectedArr.length > 1 ? 's': ''}`} Selected</div>
                        </div>
                        <div onClick={handleDelete} className={`text-red-600 hover:scale-105 hover:cursor-pointer  ${selectedArr.length ? 'flex' : 'hidden'}`}>Delete File{`${selectedArr.length > 1 ? 's': ''}`}</div>
                    </div>


                    <hr className='border border-gray-300'></hr>


                    <Temp/>
                </div>
            </div>
        </GalleryDataContext.Provider>
    )
  }


