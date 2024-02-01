import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertFromRaw } from 'draft-js';
import { Card } from 'react-bootstrap';
import MyCard from '../layout/MyCard';
import { messageActions } from '../../store/MessageSlice';

const ViewMessage = () => {
    const param=useParams();
    const email=useSelector(state=>state.auth.emailID);
    const dispatch=useDispatch();
    const[inboxMessage,setMessage]=useState();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    
    console.log(param);
    const messages=useSelector(state=>state.message.messages);
    const message=messages.filter((item)=>item.key===param.id)
    
   
   useEffect(()=>{
    
    async function ViewMessage(){
        const response=await fetch(`https://react-http-learning-movies-app-default-rtdb.firebaseio.com/mail/${param.id}.json`,
        {method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify({status:true})})
       
        dispatch(messageActions.showReadMessages(param.id));
        console.log(message);
    }
    if(param.type==='inbox')
    ViewMessage();
   },[])
    
    useEffect(()=>{
        let message=[];
     
       message= messages.filter((item)=>item.key===`${param.id}`);
      
       
       
        console.log(message);
        if(message.length>0){
        setMessage(message);
        setEditorState(message[0].message);
        }
        
       
    },[])

  return (
    <MyCard>
       
      
       {inboxMessage&&
       <>
       <label>From:</label>
       {param.type==='inbox'?<p>{inboxMessage[0].sender}</p>:<p>{email}</p>}
       <label>To</label>
       {param.type==='inbox'?<p>{email}</p>:<p>{inboxMessage[0].receiver}</p>}
       
       </>
       }
     
     {inboxMessage&&
    <Card style={{'width':'15rem','height':'10rem', 'padding':'2px'}} dangerouslySetInnerHTML={{__html:editorState}}/>
     
  
   
      }
        
    </MyCard>
  )
}

export default ViewMessage