import React, { useState } from 'react'
import { useDispatch,useSelector} from 'react-redux';
import {useEffect } from 'react';
import { messageActions } from '../../store/MessageSlice';
import useFetch from '../../useFetch';
const Home = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
   const [data]=useFetch("https://react-http-learning-movies-app-default-rtdb.firebaseio.com/mail.json", { method: 'GET', headers: { 'Content-Type': 'Application/json' } });
  console.log(data);
//     const inboxHandler = async () => {
//       const response = await fetch("https://react-http-learning-movies-app-default-rtdb.firebaseio.com/mail.json",
//           { method: 'GET', headers: { 'Content-Type': 'Application/json' } });
  
  
//       const data = await response.json();
//       if (!response.ok) {
//           console.log(data.error)
//       }
//       console.log("data", data);
     const messageList = [];
      
  
       for (let key in data) {
           //console.log(data[key].receiver);
        
  
              messageList.unshift({
                  key: key,
                  message: data[key].message,
                  sender: data[key].sender,
                  receiver:data[key].receiver,
                  subject: data[key].subject,
                  status: data[key].status
              });
          }
  
      
     
   
      dispatch(messageActions.getMessages({message:messageList}));
     
  
//   }
//   useEffect(() => {
//       const interval = setInterval(inboxHandler, 2000)
//       return () => { clearInterval(interval) }
  
//   }, [dispatch])
  
  return (
    <>
     
    </>
  )
}

export default Home