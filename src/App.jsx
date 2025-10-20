import  { useEffect,useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx';
import { Star } from 'lucide-react';
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use';
import { updateSearchTerm } from './appwrite.js';
import { gettrendingMovies} from './appwrite.js'
import '@fontsource/londrina-outline';


 const API_BASE_URl ='https://api.themoviedb.org/3';

  const API_KEY = import.meta.env.VITE_TMBD_API_KEY;

  const API_OPTION={
    method:'GET',
    headers:{
      accept :'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

const App = () => {

  

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const [movieList, setMovieList] =useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendigMovies] = useState([]);
  const [debounceSearchTerm,setDebounceSearchTerm] = useState('');


  //to make the search optmize we make a delay of half second which reduce the API call
  useDebounce(()=> setDebounceSearchTerm(searchTerm), 500, [searchTerm])

   const fetchMovies = async (query='')=>{
    setIsLoading(true);
    try{
     const endpoint = query
      ? `${API_BASE_URl}/search/movie?query=${encodeURIComponent(query)}` 
      :`${API_BASE_URl}/discover/movie?sort_by=popularity.desc`;
     const response = await fetch(endpoint, API_OPTION);

     if(!response.ok){
      throw new Error("something is not right, try again");
     }

     const data = await response.json();
     console.log(data)
     if(data.Response ==="False"){
      setErrorMessage(data.error || 'failed to fetch movies ');
      setMovieList([]);
      return;
     }
    
     setMovieList(data.results || []);

     if(query && data.results.length > 0){
     await updateSearchTerm(query, data.results[0]);
     }
    
    }
    catch(error){
      console.error(`error while fetching movies  ${error}`);
      setErrorMessage( 'plz try again later');
    }finally{
      setIsLoading(false);
    }
  }
  

 useEffect (() =>{
 fetchMovies(debounceSearchTerm);
 },[debounceSearchTerm]);

 
 const allTrendingMovies = async()=>{
  try{
     const movie = await gettrendingMovies();

     setTrendigMovies(movie);
  }catch(error){
    console.error('something went worng while fetching trending movies')
  }
 }

 useEffect(()=>{
  allTrendingMovies();
 },[]);

  return (

    <main className='relative pb-6'>
      <img className='absolute  h-full  w-fit' src="/bg3.jpg" alt="background" />
      <div className='relative flex justify-center '>
        <img className='h-40  ' src="/logo (2).png" alt="logo" />
      </div>
        <div className='relative  '>  
          
          <header className='mx-5  text-[30px] xl:text-5xl text-center   flex justify-center items-center lg:mx-90 lg:text-[42px] text-[#A0AEC0]  font-bold'>
            <h1>Find &nbsp;
               <span className=' font-serif  bg-linear-to-r from-[#b098f1] to-[ABBBFF] bg-clip-text text-transparent'>Movies </span>
              You'll Enjoy Without The Hassle
            </h1>
          </header>

          
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        {/* <h1 className='text-white'>{searchTerm}</h1> */}
        
        </div>
        

        <h1 className='pt-10 font-bold text-[35px] xl:text-5xl  text-[#4CC9F0] flex justify-center relative '>Trending Movies</h1>
       
        <section className='relative pt-10 flex justify-around  '>
        {trendingMovies.length > 0 &&(
            <section className='mx-2 overflow-x-scroll md:overflow-hidden lg:p-6 p-2 rounded-2xl  bg-gradient-to-r from-[#05323a] to-[ABBBFF]  shadow-inner shadow-light-00/10     ' >
              
              <ul className='flex  w-[800px] md:w-full md:gap-4 ' >
                {trendingMovies.map((movie,index)=>(
                  // this time we get direct from db
                  <li key={movie.$id} className='  flex  items-start' >
                    <p className=' text-[140px]  -mr-7 font-bebas text-gray-100/40 backdrop-blur-md opacity-20 leading-none  font-extrabold'>{index +1}</p>
                    <img className='h-40 lg:h-56 lg:w-45 xl:h-70 xl:w-60 object-cover rounded-2xl  transition-transform hover:scale-115  ' src={movie.poster_url} alt={movie.title} ></img>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>

        <section className='relative pt-20 '>

          <h1 className='mb-6 flex  bold justify-center  xl:text-5xl  font-serif font-bold  text-[#cc6238] bg-clip-text  text-[35px] '>All Movies</h1>

          {isLoading ? (
            // <p className='text-white'>Loading...</p>
             <Spinner/>
          ): errorMessage ? (
            <div className='h-15 w-25 bg-linear-to-r from-[#520202] to-[#FF0D1D]'>
              <p className='text-[#16caea]'>{errorMessage}</p>
            </div>
          ):(
            <ul className='mx-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:mx-6 lg::gap-6  '>
              {movieList.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
      
    </main>
    
  )
}

export default App
// ★