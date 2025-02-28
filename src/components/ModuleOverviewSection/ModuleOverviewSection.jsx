import React from 'react'
import adminImg from '../../assets/admin.png'
import raImg from '../../assets/resourceAnalyst.png'
import dsImg from '../../assets/designSupport.png'
import paImg from '../../assets/productionAssembly.png'
import  qaImg from '../../assets/qualityControl.png'

const ModuleOverviewSection = ({id}) => {
  return (
    <div className='container text-light' style={{marginTop:'83px'}} id={id}>
        <h2>Module Overview</h2>
        <div className='d-flex text-center gap-5 mt-5'>
            <div style={{marginLeft:'150px'}}>
                <img src={adminImg} alt="admin Image" className='img-fluid'  />
            </div>
            <div>
                <img src={raImg} alt="resource analyst Image" className='img-fluid' />
            </div>
            <div>
                <img src={dsImg} alt="design support Image" className='img-fluid' />
            </div>
            <div>
                <img src={paImg} alt="production assembly image"  className='img-fluid'/>
            </div>
            <div>
                <img src={qaImg} alt="quality control image" className='img-fluid' />
            </div>
        </div>
    </div>
  )
}

export default ModuleOverviewSection