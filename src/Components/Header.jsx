import { useContext } from "react"
import GalleryDataContext from "../Contexts/GalaryDataContext"


//the header component
export default function(){
    //selected image array and the updater is being destracted from context api
    const {selectedArr,handleDelete,} = useContext(GalleryDataContext);

    return(
        <div className='w-full px-5 py-5 flex justify-between items-center text-sm sm:text-xl font-semibold'>
            <div className={`${!selectedArr.length ? 'flex' : 'hidden'} font-bold`}>Gallery</div>
            {/* showing the selected count agaist the selected array size */}
            <div className={` gap-3 items-center ${selectedArr.length ? 'flex' : 'hidden'}`}>
                <input type="checkbox" checked className="checkbox checkbox-info " />
                <div>{selectedArr.length} File{`${selectedArr.length > 1 ? 's': ''}`} Selected</div>
            </div>
            
             {/* deleting button */}
            <div onClick={handleDelete} className={`text-red-600 hover:scale-105 hover:cursor-pointer text-sm sm:text-lg  ${selectedArr.length ? 'flex' : 'hidden'}`}>Delete File{`${selectedArr.length > 1 ? 's': ''}`}</div>
        </div>
    )
}