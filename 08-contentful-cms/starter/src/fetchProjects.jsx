import {createClient} from "contentful";
import {useState, useEffect} from 'react'

//create instance 
const client =createClient({
    space: 'nlo5zdlhl37i',
    environment:'master',
    accessToken :import.meta.env.VITE_API_KEY,
});

//below is the custom hook 
//parse it in the custom hook itself 
export const useFetchProjects = ()=>{
 const [loading, setLoading] =useState(true); //state variable for loading state 
 const [projects, setProjects] =useState([]) ;//INITIALLY narray as map returns an array og objects below 

const getData =async()=>{
     try{
       //await for client get Entries
         const response= await client.getEntries({ content_type:'projects'}) ;
    const projects = response.items.map((item)=>{
        //pull out the title , url and image first 
        const {title , url ,image}  =item.fields ; 
        //grab id 
        const id  = item.sys.id;
        const img =image?.fields?.file?.url  ;
        
        return {title , url , id ,img}
    })
         //after map returns the data we change the state variable
         setProjects(projects)
         setLoading(false);
     }
     catch(error){
       console.log(error);
       setLoading(false)
     }
}

//run only once on mounting 
 useEffect(()=>{
    getData();
 },[]);
 return {loading ,  projects}//just want  to return loading and the projects list to Projects.jsx
}
