import { useState } from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import data from './data.json'
import Temp from './Temp';
import GalleryDataContext from './Contexts/GalaryDataContext';
import Header from './Components/Header';
import MainGalleryLayout from './Components/MainGalleryLayout';

export default function(){

    const [selectedArr, setSelectedArr] = useState([]);
    const [gridItems,setGridItems] = useState([...data]);

    function handleDelete(){

        const updatedArray = gridItems.filter(item=>!selectedArr.includes(item.id));
        
        setGridItems([...updatedArray]);
        setSelectedArr([]);
    }

    return(
        <GalleryDataContext.Provider value={{selectedArr,setSelectedArr,gridItems,setGridItems,handleDelete}}>
            <div className='w-full h-fit flex justify-center pb-10 bg-blue-100'>

                <div className='w-11/12 md:w-8/12 border border-black mt-5 rounded-xl shadow-md shadow-gray-500 bg-white'>

                    <Header/>

                        <hr className='border border-gray-300'></hr>

                    <MainGalleryLayout/>

                </div>
            </div>
        </GalleryDataContext.Provider>
    )
  }


