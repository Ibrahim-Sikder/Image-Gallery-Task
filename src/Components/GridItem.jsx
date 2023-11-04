import { useContext, useState } from 'react';
import {motion} from 'framer-motion';

import {useSortable} from '@dnd-kit/sortable';
import GalleryDataContext from '../Contexts/GalaryDataContext';

//single grid item component with dragging functionality
export default function({item,index}){

    const [isDragging,setIsDragging] = useState(false); 
    const [clicked, setClicked] = useState(false); //checkbox state
    const {selectedArr,setSelectedArr} = useContext(GalleryDataContext); //selected image state array and updater are imported

    function selectHandler(id){

        setClicked(!clicked);//image selection state updated
        let temp = selectedArr;

        if(selectedArr.includes(id)){
            temp = selectedArr.filter(item=>item!=id); //selected array is being filtered instead of the selection state
        }else{
            temp.push(id);
        }
        setSelectedArr([...temp]); //selected array updated
    }

    //here listeners and setNode are destracted from useSortable hook of dnd kit
    //they are besically used for getting the ref of the dragging item's id and dropping item's id.
    const {
        listeners,
        setNodeRef
    } = useSortable({id: index+1}); //id is started from 1 coz it doesn't support 0.


    return(
        <motion.div
            ref = {setNodeRef}  //referencing the item
            {...listeners} //adding the event listeners from the library
            key={item.id}
            
            //increasing the first ele of the grid with rowSpan 2 and colSpan2
            className={`${
                index === 0 ? 'col-span-2 row-span-2' : '' }   
                aspect-square  border bg-gray-50 border-black rounded-lg hover:cursor-pointer`}>

                <motion.div 
                    drag //for dragging effect
                    dragConstraints={{left:0,right:0, top:0, bottom:0}} //when drag released the ele will place 
                    dragElastic={1.2}

                    layout //this is for the sorting animation, providing from AnimatePresence component
                    whileDrag={{zIndex: 20}}

                    onDragStart={()=>{setIsDragging(true)}}
                    onDragEnd={()=>setIsDragging(false)}

                    //these are used for the sorting effect. besically animation effect
                    initial={{opacity:0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.4}}

                    className="border border-black rounded-lg">

                    {/* image box with checkBox and hovering effect */}
                    <div  style={{backgroundImage: `url(${item.img})`}} className='bg-white rounded-lg aspect-square bg-cover bg-center'> 
                        <div  className={`bg-black aspect-square ${clicked ? 'opacity-50' : 'opacity-0'} transition-all duration-500 hover:opacity-30 ${isDragging ? 'hidden' : 'block'}`}>
                            <input type="checkbox" clicked={clicked} onChange={()=>selectHandler(item.id)} className="checkbox checkbox-accent bg-white  mt-2 ml-2 checkbox-sm md:checkbox-md" />
                        </div>
                    </div>
                        
                </motion.div>
        </motion.div>
    )
}
