import React from 'react'
import { useState } from 'react'
import { IoIosSend } from "react-icons/io";
import contactImg from '../../assets/contactImg.png'
import axionInstance from '../../api/axiosInstance';
import { toast } from 'sonner';
import { useLoader } from '../../context/LoaderContext';


const ContactSection = ({id}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')  
    const [message, setMessage] = useState('')
    const {setLoading} = useLoader()

    const handleSend =()=>{
        if(!name || !email || !message){
            toast.error('Required fields are missing')
            return
        }
        setLoading(true)
        try{
            axionInstance.post('auth/sendMail',{name,email,message})
            toast.success('Message sent successfully')
            setName('')
            setEmail('')    
            setMessage('')
        }catch{
            toast.error('Error while sending message')
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className='container text-light' style={{marginTop:'53px' , marginBottom:'25px'}} id={id}>
        <h2>Contact us</h2>
        <div className='d-flex mt-4 gap-5'>
            <div className='col-6'>
                <label className='form-label'>Name</label>
                <input type="text" className='form-control' value={name} onChange={(e)=>setName(e.target.value)} />
                <label className='form-label mt-2'>Email</label>
                <input type="email" className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <label className='form-label mt-2'>Message</label>
                <textarea className='form-control' rows='4' value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
                <div style={{marginLeft:'250px'}}>
                <button className="btn  text-dark btn-warning mt-3 d-flex align-items-center gap-2" onClick={handleSend}>
                    <IoIosSend />
                    send
                    </button>


                </div>
            </div>
            <div className='col-6'>
                <img src={contactImg} alt="contact image"  className='img-fluid' style={{marginLeft:'100px'}}/>
            </div>
        </div>
    </div>
  )
}

export default ContactSection