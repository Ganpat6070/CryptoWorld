import { textAlign } from '@mui/system';
import React from 'react'
import './MyButton.css';

const MyButton = ({ children, selected, onClick }) => {
  return (
    <span style={{
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "gray",
      fontWeight: selected ? 700 : 500,
      width: '22%',
      textAlign: 'center'
      
    }} 
    className='buttonStyle1' onClick={onClick}>{children}</span>

  )
}

export default MyButton