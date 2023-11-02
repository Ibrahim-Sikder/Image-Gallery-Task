import { useState } from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import data from './data.json'

export default function(){

    const [gridItems,setGridItems] = useState([...data]);
    const colors = [
        'bg-blue-500',
        'bg-green-500',
        'bg-red-500',
        'bg-yellow-500',
        'bg-purple-500',
        'bg-indigo-500',
        'bg-pink-500',
        'bg-cyan-500',
        'bg-gray-500',
        'bg-yellow-500',
        'bg-purple-500',
        'bg-indigo-700',
        'bg-yellow-700',
        'bg-cyan-700',
        'bg-gray-700'
      ];


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

        setGridItems([...gridItems])
    }

    function del(index){
        gridItems.splice(index,1);
        setGridItems([...gridItems])
    }


    return (
      <div className="w-full">

        <div className="px-20 pt-10 lg:px-52">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-flow-row gap-2">
                <AnimatePresence>
                    {gridItems.map((item,index)=>
                        <motion.div
                            onClick={(e)=>{swap(index)}}
                            drag
                            dragConstraints={{left:0,right:0, top:0, bottom:0}}
                            dragElastic={1}

                            layout
                            style={{borderRadius: 7}}

                            // onDrag={(e)=>console.log(`${e.clientX} ${e.clientY}`)}
                            onDragOver={()=>console.log('here')}

                            initial={{opacity:0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}

                            key={item.id}
                            className={`${
                            index === 0 ? 'col-span-2 row-span-2' : ''
                            } ${colors[parseInt(item.id)]} text-white text-2xl aspect-square text-center `}
                        >

                            {item.id}
                        </motion.div>
                    )}
                    <div className='bg-black text-white text-2xl aspect-square text-center '>sdf</div>
                </AnimatePresence>
            </div>
        </div>


      </div>
    )
  }


