import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import RAValidateMaterialCard from '../../components/RAValidateMaterialCard/RAValidateMaterialCard'
import {toast} from 'sonner'
import axiosInstance from '../../api/axiosInstance'
import { IoMdCloseCircle } from "react-icons/io";
import RAEvaluateMaterialCard from '../../components/RAEvaluationMaterialCard/RAEvaluationMaterialCard'
import RAWeldingParams from '../../components/RAWeldingParams/RAWeldingParams'


const RAAnalysisPage = () => {
    const menuList = [
        {name:'Home',path:'/raHome'},
        {name:'Products',path:'/raProduct'},
        {name:'Analysis',path:'/raAnalysis'},
        {name:'Analysis Report',path:'/raAnalysisReport'},
        {name:'Data Access',path:'/raDataAccess'}
    ]
    const [validationData,setValdationData] = useState(null)
    const [products,setProducts] = useState([])
    const [productsCount,setProductsCount] = useState(0)
    const [selectedProduct,setSelectedProduct] = useState(0)
    const [validationModel,setValidationModel] = useState(false)
    const [evaluationModel,setEvaluationModel] = useState(false)
    const [evaluationData,setEvaluationData] = useState(null)
    const [optimalForce,setOptimalForce] = useState(null)
    const [forcesToTest, setForcesToTest] = useState("") 
    const [gaugeLength, setGaugeLength] = useState("")
    const [changeInLength, setChangeInLength] = useState("")
    const [width, setWidth] = useState("")
    const [showInputModal, setShowInputModal] = useState(false)
    const [powerSpeedInputs,setPowerSpeedInputs] = useState([{ power: "", weldingSpeed: "" }])
    const [weldingResults,setWeldingResults] = useState([])
    const [optimalWeldingParameters,setOptimalWeldingParameters] = useState(null)
    const [weldingModel,setWeldingModel] = useState(false)
    const [weldingInputModel,setWeldingInputModel] = useState(false)
    const[weldingResult,setWeldingResult] = useState(null)
    const [resourceAnalystDescription,setResourceAnalystDescription] = useState('')
    const [isApproved, setIsApproved] = useState(true); 




    const fetchTotalProductsCount = async()=>{
        try{
            const response = await axiosInstance.get('/resource-analyst/get-products-data')
            if(response.data){
              setProductsCount(response.data.pagination.totalItems)
            }else{
              setProductsCount(0)
              toast.error('No products found')
            }
        }catch(error){
          toast.error('Erron on getting Product Count')
        }
    }

    const fetchData = async()=>{
      try{
        const limit = productsCount
        const page = 1
        const response = await axiosInstance.get(`/resource-analyst/get-products-data?limit=${limit}&page=${page}`)
        const products = response.data.products;
        if(products .length === 0 ){
          toast.success('No products Available')
        }else{
          setProducts(products)
        }
      }catch(error){
        toast.error('Failed to fetch data')
      }
    }

    const fetchValidationData = async()=>{
     
      if(selectedProduct == 0){
        toast.error('Please Select the Product first')
        return
      }
      const selectedProductData = products.find(product => product.productId == selectedProduct)
      if(selectedProductData){
        try{
          const response = await axiosInstance.post('/resource-analyst/validate-material',{
            volume:selectedProductData.volume,
            temperature:selectedProductData.temperature,
            density:selectedProductData.density,
            thermalConductivity:selectedProductData.thermalConductivity,
            flexuralStrength:selectedProductData.flexuralStrength,
            tensileStrength:selectedProductData.tensileStrength,
            porosity:selectedProductData.porosity
          })
          setValdationData({
            mass:response.data.mass,
            qualityString:response.data.qualityString,
            issues:response.data.issues
          })
          setValidationModel(true)
          
        }catch(error){
          toast.error('failed to fetch valildation result')
        }

      }

    }

    const updateValidationData = (updatedData) => {
      setValdationData(updatedData);
    };

    
    const fetchEvaluationData = async()=>{
      if(selectedProduct == 0){
        toast.error('Please Select the Product first')
        return
      }
      const selectedProductData = products.find(product => product.productId == selectedProduct)
      if(selectedProductData){
        try{
          const reqData ={
            thickness:selectedProductData.thickness,
            volume:selectedProductData.volume,
            tensileStrength:selectedProductData.tensileStrength,
            flexuralStrength:selectedProductData.flexuralStrength,
            forcesToTest: forcesToTest.split(",").map(Number),
            gaugeLength: parseFloat(gaugeLength),
            changeInLength: parseFloat(changeInLength),
            width: parseFloat(width),
          }
          const response = await axiosInstance.post('/resource-analyst/evaluate-material',reqData)
          setEvaluationData(response.data.evaluation)
          setOptimalForce(response.data.optimalForce)
          setEvaluationModel(true)
        }catch(error){
          toast.error('failed to fetch evaluation result')
        }

      }

    }
    const updateOptimalForce = (updatedData) => {
      setOptimalForce(updatedData);
    };

    const fetchWeldingParamsData = async ()=>{
       if(selectedProduct == 0){
        toast.error('Please Select the Product first')
        return
      }

      const selectedProductData = products.find(product => product.productId == selectedProduct)
       if(selectedProductData){
        try{
          const reqData ={
            thickness:selectedProductData.thickness,
            volume:selectedProductData.volume,
            density:selectedProductData.density,
            thermalConductivity:selectedProductData.thermalConductivity,
            tensileStrength:selectedProductData.tensileStrength,
            flexuralStrength:selectedProductData.flexuralStrength,
            powerSpeedInputs:powerSpeedInputs
          }
          const response = await axiosInstance.post('/resource-analyst/welding-parameters',reqData)
          setWeldingResult(response.data)
          setWeldingResults(response.data.weldingResults)
          setOptimalWeldingParameters(response.data.optimalWeldingParameters)
          setWeldingModel(true)
        }catch(error){
          toast.error('failed to fetch welding result')
        }

      }
    }
    const addInputField = () => {
        setPowerSpeedInputs([...powerSpeedInputs, { power: "", weldingSpeed: "" }]);
      };

      const removeInputField = (index) => {
        setPowerSpeedInputs(powerSpeedInputs.filter((_, i) => i !== index));
      };

      const handleChange = (index, field, value) => {
        const updatedInputs = [...powerSpeedInputs];
        updatedInputs[index][field] = value;
        setPowerSpeedInputs(updatedInputs);
      };
      const updateOptimalWeldingParameters = (updatedData)=>{
        setOptimalWeldingParameters(updatedData)
      }

      //final submission
      const submit =() => {
        toast('Once Submitted cannot be reverted!', {
          action: {
            label: 'Confirm',
            onClick: async() => {
              if (selectedProduct == 0) {
                toast.error('Please Select the Product first');
                return;
              }
              if (!validationData) {
                toast.error('Please Validate the Product first');
                return;
              }
              if (!optimalForce) {
                toast.error('Please Evaluate the Product first');
                return;
              }
              if (!optimalWeldingParameters) {
                toast.error('Please set Welding parameter for the product first');
                return;
              }
              if (!resourceAnalystDescription) {
                toast.error('Description is a required field');
                return;
              }
      

              let approvalStatus = isApproved ? "Approved" : "Rejected";
      

              const selectedProductData = products.find(product => product.productId == selectedProduct);
              if (!selectedProductData) {
                toast.error('Invalid Product Selected');
                return;
              }
      
              // ✅ Exclude productId and prepare request data
              const { productId, ...productDetails } = selectedProductData;
              const reqData = {
                ...productDetails,
                ...validationData,
                optimalForce,
                weldingParameters: optimalWeldingParameters,
                resourceAnalystDescription,
                approvalStatus
              };
              try{
                await axiosInstance.post(`/resource-analyst/final-submission/${productId}`,{...reqData})
                toast.success('Successfull  Submitted')
                setInterval(() => {
                  window.location.reload();
                }, 5000);
              }catch(error){
                toast.error('failed to submit analysis')
              }

            }
          }
        });
      };
      

      const handleToggleApproval = () => {
        setIsApproved((prev) => !prev); 
    };
    
    useEffect(()=>{
      fetchData()
      fetchTotalProductsCount()
    },[])

  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='721px' role='Resource Analyst' defaultActiveMenu='/raAnalysis'/>
        <div style={{marginTop:'250px'}}>
          <div className='container bg-light' style={{height:'500px' ,maxHeight:'1500px',borderRadius:'30px'}}>
            <div className='d-flex flex-row-reverse '> 
              <select className='form-select ' style={{maxWidth:'200px',marginTop:'30px'}} onChange={(e)=>setSelectedProduct(e.target.value)}>
                <option value="">Choose Product Id</option>
                { 
                  products.map((product)=>(
                    <option value={product.productId} key={product.productId}>{product.productId}</option>
                  ))
                }
              </select>
            </div>
            <div className='d-flex justify-content-evenly mt-5'>
                <button className='btn  px-5 ' style={{backgroundColor:'#B22727',color:'white'}} onClick={fetchValidationData}>Validate Material</button>
                <button className='btn  px-5 ' style={{backgroundColor:'#08DA90',color:'white'}} onClick={() => setShowInputModal(true)}>Evaluate Material</button>
                <button className='btn  px-5 ' style={{backgroundColor:'#085993',color:'white'}} onClick={() => setWeldingInputModel(true)}>Welding Parameter</button>
            </div>
            <div className='d-flex justify-content-evenly mt-5'>
              <div >
              <div className="form-floating" style={{width:'700px'}}>
                <textarea className="form-control" placeholder="Leave a brief description about the material analysis" style={{height: "100px"}} value={resourceAnalystDescription} onChange={(e)=>setResourceAnalystDescription(e.target.value)} ></textarea>
                <label >Description</label>
                <div className="d-flex align-items-center justify-content-end gap-2 mt-3 ">
                      <span className={isApproved ? "text-success fw-bold" : "text-danger fw-bold"}>
                          {isApproved ? "Approved" : "Rejected"}
                      </span>

                      <div className="form-check form-switch ">
                          <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="approvalToggle"
                              checked={isApproved}
                              onChange={handleToggleApproval}
                          />
                      </div>
                  </div>

              </div>
              </div>
            </div>
            <div className='text-center mt-5'>
                <button className='btn btn-primary px-5' onClick={submit}>Submit</button>
              </div>
          </div>
       {validationModel && (
          <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
              <button type="button" className=" position-absolute" style={{ top: '18px', right: '18px', zIndex: 10,color:'white' }}  onClick={() => setValidationModel(false)} aria-label="Close"><IoMdCloseCircle size={30} style={{color:'white'}} /></button>
                <div className="modal-body">
                  <RAValidateMaterialCard fromData={validationData} updateValidationData={updateValidationData} closeModal={() => setValidationModel(false)} />
                </div>
              </div>
            </div>
          </div>
        )}
        {showInputModal && (
          <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <button 
                  type="button" 
                  className="position-absolute" 
                  style={{ top: "18px", right: "18px", zIndex: 10, color: "white" }}  
                  onClick={() => setShowInputModal(false)} 
                  aria-label="Close"
                >
                  <IoMdCloseCircle size={30} style={{ color: "black" }} />
                </button>
                <div className="modal-body">
                  <h5>Enter Evaluation Parameters</h5>
                  <input 
                    type="text" 
                    className="form-control mt-2" 
                    placeholder="Enter Forces to Test (comma-separated)" 
                    value={forcesToTest} 
                    onChange={(e) => setForcesToTest(e.target.value)} 
                  />
                  <input 
                    type="number" 
                    className="form-control mt-2" 
                    placeholder="Gauge Length" 
                    value={gaugeLength} 
                    onChange={(e) => setGaugeLength(e.target.value)} 
                  />
                  <input 
                    type="number" 
                    className="form-control mt-2" 
                    placeholder="Change in Length" 
                    value={changeInLength} 
                    onChange={(e) => setChangeInLength(e.target.value)} 
                  />
                  <input 
                    type="number" 
                    className="form-control mt-2" 
                    placeholder="Width" 
                    value={width} 
                    onChange={(e) => setWidth(e.target.value)} 
                  />
                  <button 
                    className="btn btn-primary mt-3" 
                    onClick={() => {
                      if(!forcesToTest || !gaugeLength || !changeInLength || !width){
                         return toast.error('Please fill the required inputs')
                      }
                      setShowInputModal(false); 
                      fetchEvaluationData();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {evaluationModel && (
          <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
              <button type="button" className=" position-absolute" style={{ top: '18px', right: '18px', zIndex: 10,color:'white' }}  onClick={() => setEvaluationModel(false)} aria-label="Close"><IoMdCloseCircle size={30} style={{color:'white'}} /></button>
                <div className="modal-body">
                  <RAEvaluateMaterialCard evaluationData={evaluationData} optimalForce={optimalForce} updateOptimalForce={updateOptimalForce} closeModal={() => setEvaluationModel(false)} />
                </div>
              </div>
            </div>
          </div>
        )}
      {weldingInputModel && (
          <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <button type="button" className="position-absolute" style={{ top: '18px', right: '18px', zIndex: 10, color: 'white' }} onClick={() => setWeldingInputModel(false)} aria-label="Close">
                  <IoMdCloseCircle size={30} style={{ color: 'black' }} />
                </button>
                <div className="modal-body mt-5">
                  <h3>Power Speed Inputs</h3>

                  {/* Map over the powerSpeedInputs array */}
                  {powerSpeedInputs.map((powerSpeedInput, index) => (
                    <div key={index} className="mb-3">
                      <label className="block text-sm font-medium">Power:</label>
                      <input
                        type="number"
                        value={powerSpeedInput.power}
                        onChange={(e) => handleChange(index, "power", e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                      <label className="block text-sm font-medium mt-2">Welding Speed:</label>
                      <input
                        type="number"
                        value={powerSpeedInput.weldingSpeed}
                        onChange={(e) => handleChange(index, "weldingSpeed", e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                      <button 
                        onClick={() => removeInputField(index)} 
                        className="btn btn-danger mt-2">
                        Remove
                      </button>
                    </div>
                  ))}

                  {/* Button to Add More Input Fields */}
                  <div className="text-center">
                    <button onClick={addInputField} className="btn btn-secondary mt-3 px-5">
                      Add More
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button onClick={() => {
                      if (powerSpeedInputs.length === 0) {
                        return toast.error('Please add at least one input field');
                      }
                      fetchWeldingParamsData();
                      setWeldingInputModel(false);
                    }} className="btn btn-primary mt-3 px-5">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {weldingModel &&(
          <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
            <button type="button" className=" position-absolute" style={{ top: '18px', right: '18px', zIndex: 10,color:'white' }}  onClick={() => setWeldingModel(false)} aria-label="Close"><IoMdCloseCircle size={30} style={{color:'black'}} /></button>
              <div className="modal-body">
              <RAWeldingParams results={weldingResult} updateOptimalWeldingParameters={updateOptimalWeldingParameters} closeModal={()=>setWeldingModel(false)}  />
              </div>
            </div>
          </div>
        </div>
        )}





        </div>
    </div>
  )
}

export default RAAnalysisPage