import { useContext, useState} from 'react';
import {AnimatePresence} from 'framer-motion';

//importing the dnd kit's essentials
import {  DndContext,
    PointerSensor,
    useSensor,
    useSensors, } from '@dnd-kit/core';


//image icon from react icon
import { FaRegImage } from 'react-icons/fa';
import GalleryDataContext from '../Contexts/GalaryDataContext';
import GridItem from './GridItem';


let current = -1;

export default function(){
    const {gridItems,setGridItems} = useContext(GalleryDataContext);//destracting the main state of img array and updater

    //with this useSensors hook the items are allowd to onclick listener.
    //in default the onclick listener are being disabled. this sensors work with the distance of mouse click and move.
    const sensors = useSensors(
        useSensor(PointerSensor, {
          activationConstraint: {
            distance: 5,
          },
        })
      );

    //image swap method with sortable technique
    //this algorighm helps the AnimatePresence to animate the element for visually sorting
    function swap(start,destination){
        
        //if the start is less than destination this element-shifting algorithm will work in decending order
        if(start>destination){
            for(let i=start;i>destination;i--){
                let temp = gridItems[i];
                gridItems[i] = gridItems[i-1];
                gridItems[i-1] = temp;
            }
        }
        //if the start is greater than destination this element-shifting algorithm will work in ascending order
        else{
            for(let i=start;i<destination;i++){
                let temp = gridItems[i];
                gridItems[i] = gridItems[i+1];
                gridItems[i+1] = temp;
            }
        }

        //updating the array
        setGridItems([...gridItems]);
    }
    
    //this method helps to find which element was dragged and which is the destination
    //initially the global variable current is dragged element.
    //after every swap, the current is being updated
    function dragHandler(e){

        const { active, over } = e; //active is the dragged element and over is the destination

        //checking if the active and over are valid source
        if (active && over && current !== over.id-1 ) {
          // Swap items
          swap(current, over.id-1);
          current=over.id-1; //current is updated
        }
    }


    //file adding method
    const handleFileChange = (e) => {
        const files = e.target.files; //getting the selected files
      
        if (files.length > 0) {
          const newGridItems = [];
      
          //traversing the whole files
          for (const file of files) {
            const reader = new FileReader();
            const randomNum = Math.floor(Math.random() * 9999901) + 100; //generating a random id for the image
      
            //generating the bolb url for saving the data in objec
            reader.onload = () => {
              const blob = new Blob([reader.result], { type: file.type });
              const blobURL = URL.createObjectURL(blob);
              
              //makin
              const temp = {
                id: randomNum.toString(),
                img: blobURL
              };
      
              newGridItems.push(temp);
      
              if (newGridItems.length === files.length) {
                // All files have been processed, update the state with newGridItems
                setGridItems((prevGridItems) => [...prevGridItems, ...newGridItems]);
              }
            };
      
            reader.readAsArrayBuffer(file);
          }
        }
      };

    return (
      <div className="w-full">

        <div className="p-5">
            {/* a responsive grid is created. */}
            <div  className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-flow-row gap-4">
                {/* dnd context is provided. while draging a current variable is setted,sensors are passed */}
                <DndContext onDragStart={(e)=>{current=e.active.id-1}}  onDragOver={dragHandler} sensors={sensors}>
                    {/* AnimatePresence is the key animating component which gives a visually sorting animation */}
                    <AnimatePresence>

                        {gridItems.map((item,index)=>
                            <GridItem item={item} key={item.id} index={index}/>
                        )}
                
                    </AnimatePresence>
                </DndContext>

                {/* for file input div */}
                <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                    <div className='text-black bg-white rounded-lg  gap-2 border-gray-600 border-2 border-dashed  text-2xl aspect-square flex flex-col justify-center items-center'>
                            <FaRegImage />
                            <div className='text-sm font-semibold'>Add images</div>
                    </div>
                </label>
                {/* a input place is hidden and referencing with the file input div */}
                <input multiple onChange={handleFileChange} type="file" id="fileInput" style={{ display: 'none' }} />

            </div>
        </div>


      </div>
    )
  }
