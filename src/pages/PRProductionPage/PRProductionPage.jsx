import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import { toast } from 'sonner'
import axiosInstance from '../../api/axiosInstance'
import { FaClipboardCheck, FaInfoCircle, FaCommentDots } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";



const PRProductionPage = () => {
    const menuList = [
        {name:'Home',path:'/prHome'},
        {name:'Production',path:'/prProduction'},
        {name:'Progress',path:'/prProgress'},
        {name:'Quality Check',path:'/prQualityCheck'},
        {name:'Reports',path:'/prReport'}
    ]
    const [options,setOptions] = useState([])
    const [selectedOption,setSelectedOption] = useState(null)
    const [productData,setProductData] = useState(null)
    const [feasibilitySection,setFeasibilitySection] = useState(false)
    const [feasibilityData,setFeasibilityData] = useState(null)
    const [productionNameInput,setProductionNameInput] = useState(false)
    const [productionName,setProductionName] = useState("")
    const [rejectedProductInput,setRejectedProductInput] = useState(false)
    const [rejectionReason,setRejectionReason] = useState("")
    const[improvementSuggestions,setImprovementSuggestions]  = useState("")
    const [additionalNotes,setAdditionalNotes] = useState("")
    const fetchOptions = async()=>{
      try{
        const response = await axiosInstance.get('/production/getProductOptions') 
        setOptions(response.data.options)
      }catch(error){
        toast.error('Failed to fetch options')
      }
    }
    const fetchProductData = async()=>{
      if(!selectedOption) return
        try{
          const response = await axiosInstance.get(`/production/get-data/${selectedOption}`)
          setProductData(response.data.product)
        }catch(error){
          toast.error('Failed to fetch productData')
        }
    }
    const feasibilityCheck = async()=>{
      if(!selectedOption) return toast.error('Please select the product first')
      try{
    const reqData = {
      tensileStrength:productData.tensileStrength,
      density:productData.density,
      weldingStrength:productData.optimizedWeldingParameters.weldingStrength,
      porosity:productData.porosity
    }
    const response = await axiosInstance.post('/production/evaluate-for-production',{...reqData})
    setFeasibilityData(response.data)
    setFeasibilitySection(true)
      }catch(error){
        toast.error('Failed to check feasibility score ')
      }
    }
    const handleConfirmProduction = async()=>{
      if (!productionName.trim() || !feasibilityData) {
        toast.error("Production Name and feasibility check is mandatory"); 
        return;
      }
      try{
        await axiosInstance.post('/production/start-production',{
          feasibilityScore:feasibilityData.feasibilityScore,
          productId:productData.productId,
          productionName:productionName
          })
          toast.success("Production started successfully!");
          window.location.reload()
      }catch(error){
        toast.error('Failed to start production')
      }
    }

    const handleConfirmRejection = async()=>{
      if(!rejectionReason.trim()||!improvementSuggestions.trim()|| !additionalNotes.trim() || !feasibilityData){
        toast.error('Plese fill the required inputs and feasibility check is mandatory')
        return  
      }
      try{
        await axiosInstance.post('/production/reject-product',{
          productId:productData.productId,
          productName:productData.productName,
          materialType:productData.materialType,
          rejectionReason,improvementSuggestions,additionalNotes,
          previousFeasibilityScore:feasibilityData.feasibilityScore,
          heatInput:productData.optimizedWeldingParameters.heatInput,
          thermalConductivityRate:productData.thermalConductivity,
          coolingTime:productData.optimizedWeldingParameters.coolingTime,
          weldingStrength:productData.optimizedWeldingParameters.weldingStrength
        })
        toast.success('Product Rejected Successfully')
        window.location.reload()
      }catch(error){
        console.log(error.message)
        toast.error('Failed to reject product')
      }
    }

    useEffect(()=>{
      fetchOptions()
    },[])
    useEffect(()=>{
      fetchProductData()
    },[selectedOption])
  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='721px' role='Production & Assembly' defaultActiveMenu='/prProduction'/>
        <div style={{ marginTop: '250px', overflow: 'hidden' }}>
            <div
              className="container bg-light"
              style={{

                maxHeight: '600px',
                borderRadius: '30px',
                paddingTop: '30px', 
                overflowY: "auto"
              }}
            >
            <div className="mx-auto w-75 text-center">
                <select className="form-select w-100" onChange={(e)=>setSelectedOption(e.target.value)}>
                  <option value="">Choose Product</option>
                  {
                    options.map((option)=>(
                      <option value={option.transactionHash} key={option.transactionHash}>{option.productName}({option.transactionHash}) </option>
                    ))
                  } 
                </select>
              </div>
              <div className='text-center mt-5'>
                <button className='btn' style={{backgroundColor:'#B22727',color:'white'}} onClick={feasibilityCheck}>Check Feasibility Score</button>
              </div>
              {
                feasibilitySection &&(
                  <div className="container w-50 mx-auto mt-4 p-4 rounded-3 shadow-lg" style={{ backgroundColor: "#1E1E1E", color: "#F8F9FA" }}>
      
                  {/* Feasibility Score */}
                  <div className="d-flex align-items-center mb-3">
                    <FaClipboardCheck className="me-2 text-success" size={22} />
                    <strong>Feasibility Score:</strong>
                    <span 
                      className="ms-2 px-3 py-1 rounded-2 fw-bold" 
                      style={{ backgroundColor: "#28A745", color: "#FFF", fontSize: "1rem" }}>
                      {feasibilityData.feasibilityScore}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="d-flex align-items-center mb-3">
                    <FaInfoCircle className="me-2 text-warning" size={22} />
                    <strong>Status:</strong>
                    <span className="ms-2 px-2 py-1 border rounded-2" style={{ borderColor: "#FFC107" }}>
                     {feasibilityData.status}
                    </span>
                  </div>

                  {/* Comments */}
                  <div className="d-flex align-items-center">
                    <FaCommentDots className="me-2 text-info" size={22} />
                    <strong>Comments:</strong>
                    <div 
                      className="ms-2 p-2 border rounded-2 w-100" 
                      style={{ borderColor: "#17A2B8", backgroundColor: "#2A2A2A", minHeight: "50px" }}>
                      {feasibilityData.comments}
                    </div>
                  </div>
                  
                </div>
                )
              }
              <div className='d-flex justify-content-evenly mt-3 '>
                <button 
                  disabled={!selectedOption} 
                  style={{ cursor: selectedOption ? "pointer" : "not-allowed", opacity: selectedOption ? 1 : 0.6 ,backgroundColor:'green',color:'white',padding:'7px',borderRadius:'10px'}}
                  title={!selectedOption ? "Select a product first" : ""} onClick={ ()=>setProductionNameInput(true)}
                >
                  Start Production
                </button>

                <button 
                  disabled={!selectedOption} 
                  style={{ cursor: selectedOption ? "pointer" : "not-allowed", opacity: selectedOption ? 1 : 0.6,backgroundColor:'red',color:'white',padding:'7px',borderRadius:'10px' }}
                  title={!selectedOption ? "Select a product first" : ""} onClick={()=>setRejectedProductInput(true)}
                >
                  Reject Product
                </button>
              </div>
              <div className='d-flex justify-content-evenly mt-3 '>
                    {
                        productionNameInput &&(
                          <div className='w-50 text-center p-5  position-relative mb-3' style={{backgroundColor:'#BBB6B6',borderRadius:'30px'}} >
                             <div 
                                  style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    cursor: 'pointer',
                                    fontSize: '24px', 
                                    color: 'black'
                                  }}
                                  onClick={() => setProductionNameInput(false)} 
                                >
                                  <IoCloseCircleOutline />
                                </div>
                          <input 
                            type="text" 
                            className="form-control d-inline w-50" 
                            placeholder="Enter Production Name" 
                            value={productionName}
                            onChange={(e) => setProductionName(e.target.value)}
                          />
                          <button className="btn btn-primary ms-2" onClick={handleConfirmProduction}>
                            Confirm
                          </button>
                          </div>
                        )
                      }
                      {
                        rejectedProductInput &&(
                          <div className='w-50 text-center p-5  position-relative mb-3' style={{backgroundColor:'#BBB6B6',borderRadius:'30px'}} >
                          <div 
                               style={{
                                 position: 'absolute',
                                 top: '10px',
                                 right: '10px',
                                 cursor: 'pointer',
                                 fontSize: '24px', 
                                 color: 'black'
                               }}
                               onClick={() => setRejectedProductInput(false)} 
                             >
                               <IoCloseCircleOutline />
                             </div>
                               <textarea className='form-control w-75 mb-2' placeholder='Enter the Rejected Reasons....' value={rejectionReason} onChange={(e)=>setRejectionReason(e.target.value)}></textarea>
                               <textarea className='form-control w-75 mb-2' placeholder='Enter the Improvement Suggestions....' value={improvementSuggestions} onChange={(e)=>setImprovementSuggestions(e.target.value)}></textarea>
                               <textarea className='form-control w-75 mb-2' placeholder='Enter the Additional Notes....' value={additionalNotes} onChange={(e)=>setAdditionalNotes(e.target.value)}></textarea>

                            <button className="btn btn-primary ms-2" onClick={handleConfirmRejection}>
                              Confirm
                            </button>
                            </div>
                        )
                      }
              </div>

            </div>
          </div>

    </div>
  )
}

export default PRProductionPage