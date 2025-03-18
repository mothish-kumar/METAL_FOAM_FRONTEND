import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import {toast} from 'sonner'
import axiosInstance from '../../api/axiosInstance'
const QCQualityCheckPage = () => {
    const menuList = [
        {name:'Home',path:'/qcHome'},
        {name:'Quality Check',path:'/qcQualityCheck'},
        {name:'Progress',path:'/qcProgress'},
        {name:'Reports',path:'/qcReport'}
    ]
    const [options,setOptions] = useState(null)
    const [selectedOption,setSelectedOption] = useState(null)
    const [formData, setFormData] = useState({
        youngsModulus: '',
        corrosionResistance: '',
        weightEfficiency: '',
        tensileStrength: '',
        weldIntegrity: '',
        corrosionImpact: '',
        weightRetention: ''
    });
    const[showReworkInputModal,setShowReworkInputModal] = useState(false)
    const[rejectionReason,setRejectionReason] = useState("")
    const [improvementSuggestions,setImprovementSuggestions] = useState("")
    const [reworkIssue,setReworkIssue] = useState("")
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const fetchOptions = async()=>{
        try{
            const response = await axiosInstance.get('/quality/getProduction') 
           if (!response.data.productionId.length > 0) return toast.error('No Production is found for quality checks')
            setOptions(response.data.productionId)
          }catch(error){
            toast.error('Failed to fetch options')
          }
    }
    const reworkBtn = async()=>{
        if(!selectedOption) return toast.error('Please select the product first')
        if(!rejectionReason || !improvementSuggestions || !reworkIssue) return toast.error('Please fill the required fields')
        try{
            await axiosInstance.post( `/quality/submit-report/${selectedOption}`,{
                rejectionReason,reworkIssue,improvementSuggestions,qualityStatus:"Rework"
            })
            toast.success('Production has been sent to rework successfully')
            window.location.reload()
       }catch(error){
        toast.error('Failed to send rework message')
       }
    }
    const approveBtn = async()=>{
        if(!selectedOption) return toast.error('Please select the product first')
        if(!formData) return toast.error('All the fields are mandatory')
        try{
            const qualityStatus = "Approved"
            await axiosInstance.post( `/quality/submit-report/${selectedOption}`,{...formData,qualityStatus})
            toast.success('Production has been Succefully Appoved')
            window.location.reload()
        }catch(error){
            toast.error('Failed to approve production')
        }
    }
    useEffect(()=>{
        fetchOptions()
    },[])

  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='521px' role='Quality Check' defaultActiveMenu='/qcQualityCheck'/>
       <div style={{marginTop:'170px'}}>
            <div className='container bg-light p-5 ' style={{maxHeight:'1500px',borderRadius:'30px'}}>
                    <div className='d-flex flex-row-reverse '> 
                        <select className='form-select' style={{maxWidth:'250px',marginTop:'10px'}} onChange={(e)=>{setSelectedOption(e.target.value)}}>
                            <option value="">Choose Production ID</option>
                            {options && options.map((option) => (
                                <option value={option} key={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mt-5 container'>
                        <div className='row mb-5'>
                            <div className='col-6'>
                                <input type="number" placeholder='Young Modulus' className='form-control' name='youngsModulus' value={formData.youngsModulus} onChange={handleChange}/>
                            </div>
                            <div className='col-6'>
                            <input type="number" placeholder='Corrosion Resistance' className='form-control' name='corrosionResistance' value={formData.corrosionResistance} onChange={handleChange} />
                            </div>
                        </div>  
                        <div className='row mb-5'>
                            <div className='col-6'>
                                <input type="number" placeholder='Weight Efficiency' className='form-control' name='weightEfficiency' value={formData.weightEfficiency} onChange={handleChange} />
                            </div>
                            <div className='col-6'>
                                <input type="number" placeholder='Tensile Strength' className='form-control' name='tensileStrength' value={formData.tensileStrength} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='row mb-5'>
                            <div className='col-6'>
                                <input type="number" placeholder='Weld Integrity'  className='form-control' name='weldIntegrity' value={formData.weldIntegrity} onChange={handleChange}/>
                            </div>
                            <div className='col-6'>
                                <input type="number" placeholder='Corrosion Impact' className='form-control' name='corrosionImpact' value={formData.corrosionImpact} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='row mb-5'>
                            <div className='col-6'>
                                <input type="number" placeholder='Weight Retention' className='form-control' name='weightRetention' value={formData.weightRetention} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-evenly'>
                        <button className='btn btn-success px-4' onClick={approveBtn}>Approve</button>
                        <button className='btn btn-danger px-4' onClick={()=>setShowReworkInputModal(true)}>Rework</button>
                    </div>
                </div>
       </div>
       {showReworkInputModal &&(
                <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Rework message</h5>
                      <button className="btn-close" onClick={() => setShowReworkInputModal(false)}></button>
                    </div>
                    <div className="modal-body">
                          <textarea className='form-control mb-2' placeholder='Rework Issue' value={reworkIssue} onChange={(e)=>setReworkIssue(e.target.value)}></textarea>
                          <textarea className='form-control mb-2' placeholder='Improvement Sugesstion' value={improvementSuggestions} onChange={(e)=>setImprovementSuggestions(e.target.value)}></textarea>
                          <textarea className='form-control mb-2' placeholder='Rejection Reason' value={rejectionReason} onChange={(e)=>setRejectionReason(e.target.value)}></textarea>
                          <div className='text-center'>
                            <button className='btn btn-warning px-4' onClick={reworkBtn}>Confirm</button>
                          </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
    </div>  )
}

export default QCQualityCheckPage