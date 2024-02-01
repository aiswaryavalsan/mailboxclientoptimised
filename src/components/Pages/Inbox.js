import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Container } from 'react-bootstrap';
import MyButton from '../layout/MyButton';
import { messageActions } from '../../store/MessageSlice';

const Inbox = () => {

    const messages = useSelector(state => state.message.messages);
    const dispatch=useDispatch();
    const email=useSelector(state=>state.auth.emailID);
    const inboxMessages=messages.filter((item)=>item.receiver===email);
    const sendboxMessages =messages.filter((item)=>item.sender===email);
   
    const { type } = useParams();
    console.log(type);

    //console.log(auth.emailID);
    const messageDeleteHandler=async(key)=>{
        const response=await fetch(`https://react-http-learning-movies-app-default-rtdb.firebaseio.com/mail/${key}.json`,{method:'DELETE',
        headers:{'content-type':'application/json'}});
        const data=await response.json();
        console.log(data);
        dispatch(messageActions.deleteMessages(key));
        
    }

    return (
        <>

            {type === 'inbox' && inboxMessages && inboxMessages.map((item) => {
                console.log("item", item);
                const message = item.message;
                console.log(message);
                return (
                    <>
                        <Container key={item.key} style={{ 'margin': '2rem' }}>



                            <Link to={`/home/messagebox/viewmessage/inbox/${item.key}`} className="nav-link">
                                <div style={{ 'display': 'flex' }}>
                                    {item.status == false ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    </svg> : ''}
                                    <h6>{item.sender}    </h6> <h6>{item.subject}</h6>
                                </div>
                            </Link>

                            <hr />

                            <MyButton onClick={()=>messageDeleteHandler(item.key)} type='button'>delete</MyButton>


                        </Container>
                    </>




                )
            })}



            {type === 'sentbox' && sendboxMessages && sendboxMessages.map((item) => {
                console.log("item", item);
                const message = item.message;
                console.log(message);
                return (
                    <>
                        <Container key={item.key} style={{ 'margin': '2rem' }}>



                            <Link to={`/home/messagebox/viewmessage/sendbox/${item.key}`} className="nav-link">
                                <div style={{ 'display': 'flex' }}>
                                    
                                    <h6>{item.receiver}    </h6> <h6>{item.subject}</h6>
                                </div>
                            </Link>

                            <hr />
                           
                          

                        </Container>

                    </>




                )
            })}
        </>
    )
}

export default Inbox