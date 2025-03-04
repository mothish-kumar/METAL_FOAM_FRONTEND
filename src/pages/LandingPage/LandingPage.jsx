import React from 'react'
import style from './LandingPage.module.css'
import LPHeader from '../../components/LPHeader/LPHeader'
import HeroSection from '../../components/HeroSection/HeroSection'
import AboutSection from '../../components/AboutSection/AboutSection'
import { FaUserTie } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import ModuleOverviewSection from '../../components/ModuleOverviewSection/ModuleOverviewSection'
import FeaturedMaterialSection from '../../components/FeaturedMaterialSection/FeaturedMaterialSection'
import ContactSection from '../../components/ContactSection/ContactSection'
import { useState } from 'react'
import {login} from '../../api/authService'


const LandingPage = () => {

const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');

const handleLogin =()=>{
  login(userName,password)
}
  return (
    <>
        <LPHeader/>
        <div style={{ maxHeight: "1000px",maxWidth:'2000px', overflowY: "auto", paddingRight: "10px" ,marginLeft:'100px' ,marginTop:'150px'}}>
        <HeroSection id='hero'/>
        <AboutSection id='about'/>
        <ModuleOverviewSection id='module'/>
        <FeaturedMaterialSection id='featured'/>
        <ContactSection id='contact'/>
        </div>
        

        {/* LoginModal Script */}
        <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: '#232A58', color: 'white' }}>
              <h5 className="modal-title text-center" id="loginModalLabel">Login</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body px-5 py-5">
              <div className="input-group mt-3">
                <input type="text" className="form-control" placeholder="Type your username" value={userName} onChange={(e)=>setUserName(e.target.value)} required />
                <span className="input-group-text"><FaUserTie /></span>
              </div>
              <div className="input-group mt-3">
                <input type="password" className="form-control" placeholder="Type your password"  value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <span className="input-group-text"><RiLockPasswordLine /></span>
              </div>
            </div>
            <div className="text-center pb-5">
              <button type="button" className={style.loginBtn} onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage