import React from 'react'
import style from './LandingPage.module.css'
import LPHeader from '../../components/LPHeader/LPHeader'
import HeroSection from '../../components/HeroSection/HeroSection'
import AboutSection from '../../components/AboutSection/AboutSection'
import { FaUserTie } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import ModuleOverviewSection from '../../components/ModuleOverviewSection/ModuleOverviewSection'
import FeaturedMaterialSection from '../../components/FeaturedMaterialSection/FeaturedMaterialSection'


const LandingPage = () => {
  return (
    <>
        <LPHeader/>
        <HeroSection id='hero'/>
        <AboutSection id='about'/>
        <ModuleOverviewSection id='module'/>
        <FeaturedMaterialSection id='featured'/>

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
                <input type="text" className="form-control" placeholder="Type your username" />
                <span className="input-group-text"><FaUserTie /></span>
              </div>
              <div className="input-group mt-3">
                <input type="text" className="form-control" placeholder="Type your password" />
                <span className="input-group-text"><RiLockPasswordLine /></span>
              </div>
            </div>
            <div className="text-center pb-5">
              <button type="button" className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage