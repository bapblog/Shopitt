import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'


const SearchBar:React.FC = () => {
  return (
    <div className="search-wrapper flex flex-nowrap flex-row items-center border-[1px] border-slate-200 bg-[#ECEFF1]">
        {/* <input type="text" name="search" id="search" placeholder='Search ...' className='w-full text-textGray bg-bgLightGray text-sm focus:border-x-1 focus:border-white p-1'/> */}
        <input type="text" name="search" id="search" placeholder='Search ...' className='rounded-sm border-transparent flex-1 appearance-none border border-gray-300 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent'/>
        <AiOutlineSearch size={'1.5rem'} />
    </div>
  )
}

export default SearchBar