import React, { useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch, useSelector } from 'react-redux';
import MyButton from '../layout/MyButton';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw } from 'draft-js';
import { Card } from 'react-bootstrap';
import { messageActions } from '../../store/MessageSlice';

const EditorComponent = () => {
    const auth=useSelector(state=>state.auth);
    const[error,setError]=useState();
    const dispatch=useDispatch();
    console.log(auth.emailID);
    const toEmailRef=useRef();
    const subjectRef=useRef();
    const[editor,setEditorState]=useState();
    const onEditorStateChange=(newEditorState)=>{
        setEditorState(newEditorState);
      
        
       
    }
    // const value=draftToHtml(convertToRaw(editor.getCurrentContent()))
    console.log("editor",editor);
    const sendDataHandler=async()=>{
        const message=draftToHtml(convertToRaw(editor.getCurrentContent()))

        const response=await fetch("https://react-http-learning-movies-app-default-rtdb.firebaseio.com//mail.json",{method:'post',headers:{'content-type':'application/json'},
        body:JSON.stringify({message:message,receiver:toEmailRef.current.value,sender:auth.emailID,subject:subjectRef.current.value,status:false})});
        if(!response.ok){
            setError('something went wrong');
        }
        else{
        const data=await response.json();
         setError("Successfully sent message!!");
        dispatch(messageActions.addNewMessage({key:data.name,message:message,receiver:toEmailRef.current.value,sender:auth.emailID,subject:subjectRef.current.value,status:false}))
        console.log(data);
        }
        }
  
return(
    <>
    <Card>
     <label htmlFor='toemail'>To</label>
     <input type="email" id="toemail" ref={toEmailRef}></input>
    <label htmlFor='subject'>Subject</label>
   <input type="text" id="subject" ref={subjectRef}></input>

<Editor 
editorState={editor}
wrapperClassName="demo-wrapper"
editorClassName="demo-editor"
onEditorStateChange={onEditorStateChange}

/>

<MyButton type="button" onClick={sendDataHandler}>send</MyButton>
</Card>
<p style={{'color':'red'}}>{error}</p>
</>
)
}
export default EditorComponent;