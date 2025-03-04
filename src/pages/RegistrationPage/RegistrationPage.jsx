import React from 'react'
import styles from'./RegistrationPage.module.css'
import logoImg from '../../assets/metalFoamIcon.png'
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useState ,useEffect} from 'react';
import axiosInstance from'../../api/axiosInstance'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')  
    const [role, setRole] = useState('')
    const[registeredEmails,setRegisteredEmails] = useState([])
    const [emailExists, setEmailExists] = useState(false)
    const [emailValid, setEmailValid] = useState(true);
    const navigate = useNavigate()


    // get the already registered email id 
    useEffect(() => {
        const fetchRegisteredEmails = async () => {
            try {
                const response = await axiosInstance.get('/auth/getEmails'); 
                setRegisteredEmails(response.data.emails || []);
            } catch (error) {
                console.error("Error fetching registered emails:", error);
            }
        };

        fetchRegisteredEmails();
    },[])

    const validateEmailFormat = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };
    //check if the email is already registered
    useEffect(() => {
        if (registeredEmails.includes(email)) {
            setEmailExists(true);
        }
        setEmailValid(validateEmailFormat(email));
    },[email,registeredEmails])

    // handle the registration
    const handleRegister = async() => {
         // Check if input is valid
    if(emailExists || !emailValid || !name ||(!role && role!=='none')){
        toast.error('Please fill all the fields correctly');
    }
    try{
        const response = await axiosInstance.post('/auth/register',{name,email,role})
        if(response.status === 201){
            toast.success('Registered successfully! Wait for the admin to approve your account .Once approved login credintials will be sent to your email');
            navigate('/')
        }
    }catch(error){
        toast.error('Error while registering');
    }
    }

  return (
    <div className='container'>
        <div className='text-center'>
            <img src={logoImg} alt="icon Image" className='img-fluid mx-auto' width='287px' height='206px' />
        </div>
        <div className=' container bg-light  text-dark text-center p-5' style={{width:'565px',borderRadius:'50px',padding:'20px'}}>
            <h2>Create an Account</h2>
            <div className='mt-5 mx-auto' style={{width:'368px'}}>
                <div className='input-group'>
                    <input type="text" className='form-control' placeholder='Type your Name'  value={name} onChange={(e)=>setName(e.target.value)}/>
                    <span className='input-group-text'><BsFillFileEarmarkPersonFill /></span>
                </div>
                <div className='input-group mt-3'>
                    <input type="email" className='form-control' placeholder='Type your Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <span className='input-group-text'><MdEmail /></span>
                </div>
                {!emailValid && <p className="text-danger mt-1">Invalid email format</p>}
                {emailExists && <p className="text-danger mt-1">This email is already registered.</p>}

                <select className='form-select mt-3' value={role} onChange={(e)=>setRole(e.target.value)}>
                    <option  value='none'>Choose the role</option>
                    <option value="admin">Admin</option>    
                    <option value="resource_analyst">Resource Analyst</option>
                    <option value="design_support">Design Support</option>
                    <option value="production_assembly">Production Assembly</option>   
                    <option value="quality_control">Quality Control</option> 
                </select>
            </div>
            <div className='mt-5'>
                <button type='button'  className={styles.registerBtn}    onClick={handleRegister} >
                        Register
                </button>
            </div>
            <div className='mt-3'>
                <p >Already have an account? <a href='/'>Login</a></p>
            </div>
        </div>
    </div>
  )
}

export default RegistrationPage