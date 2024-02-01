import {createSlice} from'@reduxjs/toolkit'
// const getInitialToken=()=>{
//     const storedToken=localStorage.getItem('token');
//     return storedToken?storedToken:'';
// }
const authSlice=createSlice({
    name:'authentication',
    initialState:{
        authenticated:false,
        token:'',
        emailID:''},
    reducers:{
        login:(state,action)=>{
            state.authenticated=true;
            state.emailID=action.payload.email;
            state.token=action.payload.token;
            

        },
        logout:(state)=>{
          state.authenticated=false;
          state.token='';
         
        }
    }
    
})
export const authActions=authSlice.actions;
export default authSlice.reducer;