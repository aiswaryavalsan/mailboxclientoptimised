import  { useEffect, useState } from 'react'

const useFetch = (url,method) => {
    const[data,setData]=useState(null);
    // useEffect(()=>{
    //     fetch(url)
    //     .then((res)=>res.json())
    //     .then((data)=>setData(data));

    // },[])
    useEffect(()=>{
      const fetchData=async()=>{
        const response=await fetch(url);
        const data=await response.json();
        setData(data);
      }
        fetchData();
        const id=setInterval(fetchData,2000);
        return clearInterval(id);
      
    })
  return [data];
  
  
}

export default useFetch;