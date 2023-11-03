import { useContext} from 'react';
import {AnimatePresence} from 'framer-motion';
import {  DndContext,
    PointerSensor,
    useSensor,
    useSensors, } from '@dnd-kit/core';

import { FaRegImage } from 'react-icons/fa';
import GalleryDataContext from '../Contexts/GalaryDataContext';
import GridItem from './GridItem';


let current = -1;

export default function(){
    const {gridItems,setGridItems} = useContext(GalleryDataContext);

    
    const sensors = useSensors(
        useSensor(PointerSensor, {
          activationConstraint: {
            distance: 5,
          },
        })
      );

    function swap(start,destination){
        
        if(start>destination){
            for(let i=start;i>destination;i--){
                let temp = gridItems[i];
                gridItems[i] = gridItems[i-1];
                gridItems[i-1] = temp;
            }
        }
        else{
            for(let i=start;i<destination;i++){
                let temp = gridItems[i];
                gridItems[i] = gridItems[i+1];
                gridItems[i+1] = temp;
            }
        }

        setGridItems([...gridItems]);
    }
    

    function dragHandler(e){
        const { active, over } = e;
        if (active && over && current !== over.id-1 ) {
          // Swap items
          swap(current, over.id-1);
          current=over.id-1;
        }
    }

    return (
      <div className="w-full">

        <div className="p-5">
            <div  className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-flow-row gap-4">
                <DndContext onDragStart={(e)=>{current=e.active.id-1}} on onDragOver={dragHandler} sensors={sensors}>
                    <AnimatePresence>

                    {gridItems.map((item,index)=>
                        <GridItem item={item} key={item.id} index={index}/>
                    )}
                
                    </AnimatePresence>
                </DndContext>
                <div  className='text-black bg-white rounded-lg  gap-2 border-gray-600 border-2 border-dashed  text-2xl aspect-square flex flex-col justify-center items-center'>
                    <FaRegImage/>
                    <div className='text-sm font-semibold'>Add images</div>
                </div>
            </div>
        </div>


      </div>
    )
  }
