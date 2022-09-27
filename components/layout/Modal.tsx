import ReactDOM from 'react-dom';
import React from 'react'
import { useEffect, useState } from 'react';

type ModalProps = { 
  children: React.ReactElement | React.ReactElement[]
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  
  const [show, setShow] = useState(false)

  useEffect(()=>{ setShow(true)}, [])
  
  if(!show) return null

  return ReactDOM.createPortal(props.children, document.body)
})

Modal.displayName = 'Modal'

export default Modal;
