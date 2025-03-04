import React from 'react'
import styles from './HeroSection.module.css'
import heroImage from '../../assets/heroImage.png'

const HeroSection = ({id}) => {
  return (
    <div className={`container text-center ${styles.sectionBody}` } id={id} >
        <img src={heroImage} alt="hero Image" className='img-fluid' />
    </div>
  )
}

export default HeroSection