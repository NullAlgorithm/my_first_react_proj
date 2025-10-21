import React from 'react'


const Search = ({searchTerm,setSearchTerm}) => {
  return (
    <div>
      <div className='flex justify-center items-center mt-6'>
        <div className='relative'>
          <img className='h-6  absolute top-2 left-5' src="/search-removebg-preview (1).png" alt="search" />
          {/* <svg className='text-amber-50  cursor-pointer absolute top-2 left-4' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg> */}
        <input className='h-10 mx-2 w-[370px] lg:w-[500px] xl:h-20 xl:text-4xl  xl:w-[800px] pl-12 text-white font-serif    rounded-[50px] ' type="text"
      placeholder='Search through unlimited Movies'
      value={searchTerm}
      onChange= {(e)=>setSearchTerm(e.target.value)} />
        </div>
      
      </div>

    </div>
  )
}

export default Search