import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { RiLockPasswordFill } from "react-icons/ri";
import styles from'../RegistrationPage/RegistrationPage.module.css'
import logoImg from '../../assets/metalFoamIcon.png'
import axiosInstance from '../../api/axiosInstance';

const ChangePasswordPage = () => {
    const [oldPassword,setOldPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const navigate = useNavigate()
    const handleChangePassword = async()=>{
        try{
            await axiosInstance.put('/employee/change-password',{
                oldPassword,
                newPassword
            })
            toast.success('Password has been changed successfully')
            navigate('/')
        }catch(error){
            console.log(error.message)
            toast.error('Error on change password')
        }
    }
  return (
    <div>
         <div className='container'>
                <div className='text-center'>
                    <img src={logoImg} alt="icon Image" className='img-fluid mx-auto' width='287px' height='206px' />
                </div>
                <div className=' container bg-light  text-dark text-center p-5' style={{width:'565px',borderRadius:'50px',padding:'20px'}}>
                    <h2>Change password</h2>
                    <div className='mt-5 mx-auto' style={{width:'368px'}}>
                        <div className='input-group'>
                            <input type="password" className='form-control' placeholder='Type your old password'  value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
                            <span className='input-group-text'><RiLockPasswordFill /></span>
                        </div>
                        <div className='input-group mt-3'>
                            <input type="password" className='form-control' placeholder='Type your new password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                            <span className='input-group-text'><RiLockPasswordFill /></span>
                        </div>
        
                    </div>
                    <div className='mt-5'>
                        <button type='button'  className={styles.registerBtn}    onClick={handleChangePassword} >
                                Change Password
                        </button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default ChangePasswordPage