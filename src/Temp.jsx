import { useContext, useRef, useState } from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import data from './data.json'
import { closestCenter, DndContext,
    PointerSensor,
    useSensor,
    useSensors, } from '@dnd-kit/core';

import { SortableContext,rectSortingStrategy,useSortable,rectSwappingStrategy,horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { FaRegImage } from 'react-icons/fa';
import GalleryDataContext from './Contexts/GalaryDataContext';

const SortableItem = ({item,index})=>{
    const [isDragging,setIsDragging] = useState(false);
    const [clicked, setClicked] = useState(false);
    const {selectedArr,setSelectedArr} = useContext(GalleryDataContext);

    function selectHandler(id){
        setClicked(!clicked);
        let temp = selectedArr;
        if(selectedArr.includes(id)){
            temp = selectedArr.filter(item=>item!=id);
        }else{
            temp.push(id);
        }
        setSelectedArr([...temp]);
    }

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
                
                key={item.id}

                className={`${
                    index === 0 ? 'col-span-2 row-span-2' : ''
                    }   aspect-square  border bg-gray-50 border-black rounded-lg hover:cursor-pointer`}>
            <motion.div 
                drag
                dragConstraints={{left:0,right:0, top:0, bottom:0}}
                dragElastic={1.2}

                layout
                // whileDrag={{zIndex: 20}}
                onDragStart={()=>{setIsDragging(true)}}
                onDragEnd={()=>setIsDragging(false)}


                initial={{opacity:0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.4}}

                className="border border-black rounded-lg">

                <div  style={{backgroundImage: `url(${item.img})`}} className='bg-white rounded-lg aspect-square bg-cover bg-center'>
                    <div  className={`bg-black aspect-square ${clicked ? 'opacity-30' : 'opacity-0'} transition-all duration-500 hover:${!isDragging ? 'opacity-30':'opacity-0'} ${isDragging ? 'hidden' : 'block'}`}>
                        <input type='checkbox' clicked={clicked} onChange={()=>selectHandler(item.id)}  className='bg-white ml-2 mt-2 h-4 w-4 '/>
                    </div>
                </div>
                    
            </motion.div>
        </motion.div>
    )
}


let current = -1;
export default function(){
    const {selectedArr,setSelectedArr,gridItems,setGridItems} = useContext(GalleryDataContext);

    
    const sensors = useSensors(
        useSensor(PointerSensor, {
          activationConstraint: {
            distance: 5,
          },
        })
      );
   
    

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
        console.log("here")
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

        <div className="p-5">
            <div  className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-flow-row gap-4">
                <DndContext onDragStart={(e)=>{current=e.active.id-1}} on onDragOver={dragHandler} sensors={sensors}>
                    <AnimatePresence>

                    {gridItems.map((item,index)=>
                        <SortableItem item={item} key={item.id} index={index}/>
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
