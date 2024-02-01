import React from 'react'
import { Navbar} from 'react-bootstrap'

import { Link} from 'react-router-dom/cjs/react-router-dom.min'


const NavBar = () => {
        
      
  return (
   <>
    
                <Navbar fixed='top' bg='light' expand='md' className='mb-4'>
                    
                        <Link to={'/home'}><Navbar.Brand>MAILBOX</Navbar.Brand></Link>
                      
                   
                </Navbar>
                
        </>
  )
}

export default NavBar