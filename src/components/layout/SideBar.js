import React, { useEffect, useState } from 'react'
import { Navbar,Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom';
import MyButton from './MyButton';

const SideBar = () => {
    const[numberOfUnread,setNumber]=useState();
    const messages=useSelector(state=>state.message.messages);
    const email=useSelector(state=>state.auth.emailID)
    const receivedMsgs=messages.filter((item)=>item.receiver===email)
    const unreadMessages=receivedMsgs.filter(item=>item.status===false);
    useEffect(()=>{
       
        let number= unreadMessages.length;
        setNumber(number)
    },[unreadMessages])
  return (
    <>
    <Navbar expand="md" bg='dark' className="sidebar vh-100 " style={{'width':'40%',margin:0}}>
   
        
          <Nav className="flex-column">
            <Nav.Link as={Link} to='/home/compose'><MyButton type='button'>Compose</MyButton></Nav.Link>
            <Nav.Link as={Link} to='/home/messagebox/inbox'><MyButton type='button'>Inbox<h6>{numberOfUnread}</h6></MyButton></Nav.Link>
            <Nav.Link as={Link} to='/home/messagebox/sentbox'><MyButton> Sent</MyButton></Nav.Link> 

          </Nav>
       
     
    </Navbar>
    </>
    
  )
}

export default SideBar