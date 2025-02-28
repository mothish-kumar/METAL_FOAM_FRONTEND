import React from 'react'
import flex1Img  from '../../assets/flex1ImgAboutus.png'
import flex2Img from '../../assets/flex2ImgAboutus.png'
import flex3Img from '../../assets/flex3ImgAboutus.png'

const AboutSection = ({id}) => {
  return (
    <div className='container text-light' id={id} style={{marginTop:'83px'}} >
        <h2 >About us</h2>
        <h5 className='text-center mt-5' >“Pioneering Innovation in Material Science”</h5>
        <div className='d-flex mt-5 gap-5'>
            <div className='flex-fill' style={{textAlign: 'justify', width:'572px'}}>
            Composite metal foams represent a groundbreaking advancement in material science, offering a unique combination of lightweight construction, exceptional strength, and remarkable energy absorption. These innovative materials are created by introducing pores into a metal matrix, resulting in a cellular structure that delivers a wide range of desirable properties.
            </div>
            <div className='flex-fill'>
                <img src={flex1Img} alt="flex1 Image" className='img-fluid' style={{height:'120px'}} />
            </div>
        </div>
        <div className='d-flex mt-5 gap-5'>
            <div className='flex-fill' >
                <img src={flex2Img} alt="flex2 Image" className='img-fluid'  />
            </div>
            <div className='flex-fill' style={{textAlign: 'justify',width:'572px'}}>
            At Private Solutions, we are at the forefront of composite metal foam technology. Our team of experts possesses extensive knowledge and experience in developing and manufacturing high-quality composite metal foams tailored to meet specific application requirements. We leverage cutting-edge techniques and state-of-the-art facilities to ensure the production of materials that consistently exceed industry standards.
            </div>
        </div>
        <div className='d-flex mt-5 gap-5'>
            <div className='flex-fill' style={{textAlign: 'justify', width:'572px'}}>
            We are committed to delivering exceptional value to our customers through our unwavering focus on quality, sustainability, and customer satisfaction. Our composite metal foams are meticulously crafted to meet the most stringent performance demands while adhering to environmentally responsible practices. We strive to build long-lasting partnerships with our clients by providing personalized solutions and unparalleled support.
            </div>
            <div className='flex-fill'>
                <img src={flex3Img} alt="flex1 Image" className='img-fluid' style={{height:'120px'}} />
            </div>
        </div>
    </div>
  )
}

export default AboutSection