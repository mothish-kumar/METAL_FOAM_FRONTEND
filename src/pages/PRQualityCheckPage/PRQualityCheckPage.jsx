import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import axiosInstance from '../../api/axiosInstance'
import {toast} from 'sonner'
import { BsFillSendPlusFill } from "react-icons/bs";

const PRQualityCheckPage = () => {
    const menuList = [
        {name:'Home',path:'/prHome'},
        {name:'Production',path:'/prProduction'},
        {name:'Progress',path:'/prProgress'},
        {name:'Quality Check',path:'/prQualityCheck'},
        {name:'Reports',path:'/prReport'}
    ]
        const [options,setOptions] = useState([])
        const [selectedOption,setSelectedOption] = useState(null)
        const [heatInput,setHeatInput] = useState(0)
        const[weldingStrength,setWeldingStrength] = useState(0)
        const [weldingQuality,setWeldingQuality] = useState("")
        const [recommendations,setRecommendations] = useState("" )

        const fetchOptions = async()=>{
      try{
        const response = await axiosInstance.get('/production/getProduction?productionStatus=In_Progress') 
       if (!response.data.productionData) return toast.error("Nothing Production in Progress")
        setOptions(response.data.productionData.map(item=>item.productionId))
      }catch(error){
        toast.error('Failed to fetch options')
      }
    }
    
    const sentBtn = async()=>{
      if (!selectedOption) return toast.error('Please the select production id')
      try{
    await axiosInstance.put(`/production/send-quality-check/${selectedOption}`,{
      heatInput,weldingQuality,weldingStrength,recommendations
    })
    setHeatInput(0)
    setWeldingQuality("")
    setWeldingStrength(0)
    setRecommendations("")
    toast.success('Production send for quality check successfully')
    }catch(error){
      console.log(error.message)
      toast.error('Failed to send for quality check')
    }
    }
    useEffect(()=>{
      fetchOptions()
    },[])
  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='721px' role='Production & Assembly' defaultActiveMenu='/prQualityCheck'/>
        <div style={{ marginTop: '250px', overflow: 'hidden' }}>
            <div
              className="container bg-light"
              style={{
                maxHeight: '600px',
                borderRadius: '30px',
                paddingTop: '30px',
                paddingBottom:'30px'
              }}
            >
                <div className="mx-auto w-75 text-center">
                <select className="form-select w-100" onChange={(e)=>setSelectedOption(e.target.value)}>
                  <option value="">Choose Product</option>
                  {
                    options.map((option)=>(
                      <option value={option} key={option}>{option}</option>
                    ))
                  }
                </select>
              </div>
                  <div className='w-50 mt-5 mx-auto'>
                    <label className='form-label mb-2 mt-2'>Heat Input</label>
                    <input type="number" className='form-control' value={heatInput} onChange={(e)=>setHeatInput(e.target.value)} />
                    <label className='form-label mb-2 mt-2'>Welding Strength</label>
                    <input type="number" className='form-control' value={weldingStrength} onChange={(e)=>setWeldingStrength(e.target.value)} />
                    <label className='form-label mb-2 mt-2'>Welding Quality</label>
                    <input type="text" className='form-control' value={weldingQuality} onChange={(e)=>setWeldingQuality(e.target.value)} />
                    <label className='form-label mb-2 mt-2'>Recommendations</label>
                    <input type="text" className='form-control ' value={recommendations} onChange={(e)=>setRecommendations(e.target.value)} />
                  </div>
                  <div className='d-flex justify-content-center  mt-5 '>
                    <button className=' px-4 d-flex gap-2 align-items-center btn btn-success ' onClick={sentBtn}><BsFillSendPlusFill /> Send</button>
                  </div>
              </div>
              </div>
              

    </div>
  )
}

export default PRQualityCheckPage