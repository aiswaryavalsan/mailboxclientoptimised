import React from 'react'
import { Card } from 'react-bootstrap'
import classes from './MyCard.module.css'
const MyCard = (props) => {
   
  return (
    <Card className={classes.card} style={{width:'18rem',margin:'auto'}}>
        
        <Card.Body className={`${classes.card_body} ${props.classes}`}>
        <Card.Title className={`${classes.card_title}`}>{props.title}</Card.Title>
        {props.children}</Card.Body>

    </Card>
  )
}

export default MyCard