import { Client,Databases,ID,Query } from "appwrite";


const Project_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const Db_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const Collection_ID = import.meta.env.VITE_APPWRITE_Collection_ID;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(Project_ID)

const database = new Databases(client);


export const updateSearchTerm = async(searchTerm, movie)=>{
    // console.log(Project_ID,Db_ID,Collection_ID);
    //1.use appwrite sdk to check searchterm is in database or not
    try{
       const result = await database.listDocuments(Db_ID,Collection_ID, [Query.equal('searchTerm', searchTerm) ]);
       //2.if it, then update the count
       if(result.documents.length > 0){
        const doc = result.documents[0];

        await database.updateDocument(Db_ID,Collection_ID,doc.$id, {
            count :doc.count +1,
        })

            //3. if not createa new document with searchterm and  count to 1

       }else{
           
        await database.createDocument(Db_ID,Collection_ID,ID.unique(), {
         searchTerm,
         count:1,
         poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
         movie_id : movie.id,
        })
       }
    }catch(e){
        console.error("Appwrite updateSearchTerm error:", e);
    }
    
}

export const gettrendingMovies = async()=>{
    try{
        const result = await database.listDocuments(Db_ID,Collection_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])

        return result.documents;
    }catch(error){
        console.error("Something went wrong on fetchong Trending movies")
    }
}