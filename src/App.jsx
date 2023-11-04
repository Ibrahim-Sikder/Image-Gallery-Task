import { useEffect, useState } from 'react';
import data from './data.json';
import GalleryDataContext from './Contexts/GalaryDataContext';
import Header from './Components/Header';
import MainGalleryLayout from './Components/MainGalleryLayout';

export default function(){

    const [gridItems,setGridItems] = useState([]); //main state of array of of object with image details
    const [selectedArr, setSelectedArr] = useState([]); //selected images array

    //load the stored data to the main img array
    useEffect(()=>{
        setGridItems([...data])
    },[])

    function handleDelete(){
        //gridItem array is being filtered after dropping the selected image
        const updatedArray = gridItems.filter(item=>!selectedArr.includes(item.id));
        
        setGridItems([...updatedArray]);
        setSelectedArr([]);
    }

    return(
        <GalleryDataContext.Provider value={{selectedArr,setSelectedArr,gridItems,setGridItems,handleDelete}}> {/* context providing */}
            <div className='w-full h-fit flex justify-center pb-10 '>

                <div className='w-11/12 md:w-8/12 border h-fit border-black mt-5 rounded-xl shadow-md shadow-gray-500 bg-gray-100'>
            
                    <Header/> {/* header component which holds the selected count and delete btn */}

                    <hr className='border border-gray-300'></hr> {/* a divider line */}

                    <MainGalleryLayout/> {/* main image grid component with swapable features */}

                </div>
            </div>
        </GalleryDataContext.Provider>
    )
  }


