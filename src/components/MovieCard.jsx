import React from 'react'

const MovieCard = ({movie: {original_language,title, release_date,vote_average,poster_path}}) => {
  return (
    
     <div className='h-auto w-fit bg-linear-to-r from-[#013842] to-[#032c33] p-3.5 rounded-2xl shadow-inner shadow-light-00/10     '>
        
          <img className='  ' src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/noMovie.png"} alt={title} />
        
        
        
            <h3 className='mt-2 text-[#FFFFFF] m-0 p-0'>{title}</h3>
            <span className='text-yellow-400 text-[14px]'>★</span> 
            <span className='text-white p-1'>•</span>
            <span className='text-[#A0AEC0] text-[14px]'>{vote_average}</span>
            <span className='text-white p-1'>•</span>
            <span className='text-white text-[14px] uppercase'>{original_language}</span>
            <span className='text-white p-1'>•</span>
            <span className='text-white text-[14px]'>{release_date ? release_date.split('-')[0] : "N/A"} </span>
        
    </div>
    
    
   

  )
}

export default MovieCard