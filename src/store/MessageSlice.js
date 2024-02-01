import { createSlice } from "@reduxjs/toolkit";

const messageSlice=createSlice({
    name:'messageHandler',
    initialState:{messages:[]},
    reducers:{
        getMessages:(state,action)=>{
            state.messages=action.payload.message;
        },
        addNewMessage:(state,action)=>{
         state.messages=[...state.messages,action.payload];
        },
       
        showReadMessages:(state,action)=>{
            const index=state.messages.findIndex((item)=>item.key===action.payload);
               state.messages[index].status=true;
            },
        deleteMessages:(state,action)=>{
            state.messages=state.messages.filter((item)=>item.key!==action.payload);
        }

        

    }
})
export const messageActions=messageSlice.actions;
export default messageSlice.reducer;