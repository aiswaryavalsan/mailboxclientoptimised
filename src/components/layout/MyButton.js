import React from 'react'
import { Button } from 'react-bootstrap'
import classes from './MyButton.module.css'
const MyButton = (props) => {
  console.log(props.class)
  return (
   <Button type={props.type} className={`${classes.mybutton} ${props.class}`} onClick={props.onClick}>{props.children}</ Button>
  )
}

export default MyButton