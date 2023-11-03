import { useContext, useState } from 'react';
import {motion} from 'framer-motion';

import {useSortable} from '@dnd-kit/sortable';
import GalleryDataContext from '../Contexts/GalaryDataContext';


export default function({item,index}){
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
        listeners,
        setNodeRef
    } = useSortable({id: index+1});

    
    return(
        <motion.div
            ref = {setNodeRef}
            {...listeners}
            key={item.id}

            className={`${
                index === 0 ? 'col-span-2 row-span-2' : '' }   
                aspect-square  border bg-gray-50 border-black rounded-lg hover:cursor-pointer`}>

                <motion.div 
                    drag
                    dragConstraints={{left:0,right:0, top:0, bottom:0}}
                    dragElastic={1.2}

                    layout
                    whileDrag={{zIndex: 20}}

                    onDragStart={()=>{setIsDragging(true)}}
                    onDragEnd={()=>setIsDragging(false)}


                    initial={{opacity:0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.4}}

                    className="border border-black rounded-lg">

                    <div  style={{backgroundImage: `url(${item.img})`}} className='bg-white rounded-lg aspect-square bg-cover bg-center'> 
                        <div  className={`bg-black aspect-square ${clicked ? 'opacity-50' : 'opacity-0'} transition-all duration-500 hover:opacity-30 ${isDragging ? 'hidden' : 'block'}`}>
                            <input type="checkbox" clicked={clicked} onChange={()=>selectHandler(item.id)} className="checkbox checkbox-accent bg-white  mt-2 ml-2 checkbox-sm md:checkbox-md" />
                        </div>
                    </div>
                        
                </motion.div>
        </motion.div>
    )
}
