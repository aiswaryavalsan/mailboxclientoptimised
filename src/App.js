import './App.css';
import Signup from './components/auth/Signup';
import Home from './components/Pages/Home';
import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import EditorComponent from './components/Pages/EditorComponent';
import Inbox from './components/Pages/Inbox';
import ViewMessage from './components/Pages/ViewMessage';
import SideBar from './components/layout/SideBar';
import NavBar from './components/layout/NavBar';
import { Col ,Container,Row} from 'react-bootstrap';
import { useSelector } from 'react-redux';


function App() {
  const authenticated=useSelector(state=>state.auth.authenticated);
 
 
  return (
    <>
    
   
    <Container className='bg-light mx-0  h-100vh' >
      <Row style={{'margin':'2rem'}}>
        <Col>
        {authenticated&&<NavBar></NavBar>}
        </Col>
      
      </Row>
      </Container>
      <Container className='bg-light mx-0  h-100vh' >
      <Row >
        <Col md={4}>
       
        {authenticated&&<SideBar></SideBar>}
        </Col>
        <Col  md={8}>
        
        <Switch>
      <Route path='/' exact><Signup/></Route>
      
      <Route path='/home' exact>{authenticated&&<Home></Home>} {!authenticated&&<Signup/>}</Route>
      <Route path='/home/compose'>
        {authenticated&&<EditorComponent/>}
        {!authenticated&&<Signup/>}
        </Route>
      <Route path='/home/messagebox/:type' exact>{authenticated&&<Inbox/>} {!authenticated&&<Signup/>}</Route>
      <Route path='/home/messagebox/viewmessage/:type/:id'>{authenticated&&<ViewMessage/>} {!authenticated&&<Signup/>}</Route>
      <Route path="*">
        <Redirect to='/'></Redirect>
      </Route>
    </Switch>
    </Col>
      </Row>

    </Container>
    
    
   
    
    
   
    </>
    
  );
}

export default App;
