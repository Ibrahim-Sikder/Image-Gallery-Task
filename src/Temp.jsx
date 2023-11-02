import { useRef, useState } from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import data from './data.json'
import { closestCenter, DndContext } from '@dnd-kit/core';
import { SortableContext,rectSortingStrategy,useSortable,rectSwappingStrategy,horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS} from "@dnd-kit/utilities"

const SortableItem = ({item,index})=>{
    const {
        // attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: index+1});
    return(
        <motion.div 
            ref = {setNodeRef}
            {...listeners}
            drag
            dragConstraints={{left:0,right:0, top:0, bottom:0}}
            dragElastic={1.2}

            layout
            whileDrag={{zIndex: 20}}

            initial={{opacity:0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.4}}
            
            key={item.id}
            className={`${
            index === 0 ? 'col-span-2 row-span-2' : ''
            }  text-white text-2xl aspect-square text-center border border-black rounded-lg`}
        >

            <img className='rounded-lg' src={item.img}/>
        </motion.div>
    )
}
let current = -1;
export default function(){

    const [gridItems,setGridItems] = useState([...data]);
   
    

    function swap(start,destination=10){
        
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

    function del(index){
        gridItems.splice(index,1);
        setGridItems([...gridItems])
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

        <div className="px-4 md:px-20 pt-10 lg:px-52">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-flow-row gap-4">
                    <DndContext onDragStart={(e)=>{current=e.active.id-1}} onDragOver={dragHandler}>
                <AnimatePresence>

                        {gridItems.map((item,index)=>
                            <SortableItem item={item} key={item.id} index={index}/>
                        )}
                    
                </AnimatePresence>
                    </DndContext>
                    <div className='bg-black text-white text-2xl aspect-square text-center'>sdf</div>
            </div>
        </div>


      </div>
    )
  }
