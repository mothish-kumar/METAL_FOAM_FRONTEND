import React ,{useState,useEffect}from 'react'
import Header from '../../components/Header/Header'
import {toast} from 'sonner'
import axiosInstance from '../../api/axiosInstance'
import { IoMdCloseCircle } from "react-icons/io";
import { AiFillWarning } from "react-icons/ai";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useLoader } from '../../context/LoaderContext'

const DSAnalysis = () => {
    const menuList = [
        {name:'Home',path:'/dsHome'},
        {name:'Products',path:'/dsProduct'},
        {name:'Analysis',path:'/dsAnalysis'},
        {name:'Analysis Report',path:'/dsAnalysisReport'},
        {name:'Data Access',path:'/dsDataAccess'}
    ]
       const {setLoading} = useLoader()
    const [selectedProduct,setSelectedProduct] = useState(0)
    const [products,setProducts] = useState([])
    const [haveAccess,setHaveAccess]=useState(false)
    const[designSupportComments,setDesignSupportComments] = useState("")
    const[isApproved,setIsApproved] = useState(true)
    const [processMaterialData,setProcessMaterialData] = useState({
        yieldStrength: "",
        hardness: "",
        elasticityVerified: false, 
      })
      const [editedProcessMaterialData,setEditedProcessMaterialData] = useState({...processMaterialData})
    const [showProcessMaterialModal,setShowProcessMaterialModal] = useState(false)
    const [weldingParams,setWeldingParams] = useState({
        heatInput:"",
        coolingTime:"",
        weldingStrength:""
    })
    const [showWeldingModal,setShowWeldingModal] = useState(false)
    const [editedWeldingParamData,setEditedWeldingParamsData] = useState({...weldingParams})


    const handleToggleApproval = () => {
        setIsApproved((prev) => !prev); 
    };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditedProcessMaterialData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    
    const handleChangeWelding = (e)=>{
        setEditedWeldingParamsData({...editedWeldingParamData,[e.target.name]: e.target.value})
    }

    const fetchProductsData = async()=>{
        try{
            const response = await axiosInstance.get('/design-support/get-data')
            setProducts(response.data.products)
            setHaveAccess(true)
        }catch(error){
            if(error.response){
                if(error.response.status = 404){
                    setHaveAccess(false)
                }if(error.response.status = 403){
                    setHaveAccess(false)
                }
            }else{
                console.log(error.message)
                toast.error('Failed to fetch products data')
            }
        }
    }

    const handleProcessMaterial = async()=>{
        if (selectedProduct === 0){
                 toast.error('Please select the product first')
                 return
        }
        const selectedProductData = products.find(product => product.productId == selectedProduct)
            if (selectedProduct){
                 try{
                    const reqData = {
                        tensileStrength:selectedProductData.tensileStrength,
                        youngsModulus:selectedProductData.optimalForce.youngsModulus,
                        stress:selectedProductData.optimalForce.stress,
                        strain:selectedProductData.optimalForce.strain
                    }
                    const response = await axiosInstance.post('/design-support/process-material',{...reqData})
                    setProcessMaterialData(response.data)
                    setEditedProcessMaterialData(response.data);
                    setShowProcessMaterialModal(true)
                }catch(error){
                    toast.error('Failed to process data ')
                }
            }
    }

    const handleSaveChanges = () => {
        setProcessMaterialData(editedProcessMaterialData);
        setShowProcessMaterialModal(false); 
        toast.success("Changes saved successfully!");
    };

    const handleWeldingParams  = async()=>{
        if (selectedProduct === 0){
            toast.error('Please select the product first')
            return
   }
   const selectedProductData = products.find(product => product.productId == selectedProduct)
       if (selectedProduct){
        setLoading(true)
        try{
            const reqData = {
                flexuralStrength:selectedProductData.flexuralStrength,
                tensileStrength:selectedProductData.tensileStrength,
                thermalConductivity:selectedProductData.thermalConductivity,
                porosity:selectedProductData.porosity
            }
            const response = await axiosInstance.post('/design-support/predict-welding',{...reqData})
            setWeldingParams(response.data)
            setEditedWeldingParamsData(response.data)
            setShowWeldingModal(true)
            setLoading(false)

        }catch(error){
            toast.error('Failed to predict welding params')
        }
       }
    }
    const handleSaveWeldingParams = ()=>{
        setWeldingParams(editedWeldingParamData)
        setShowWeldingModal(false)
        toast.success("Changes has been saved...")
    }
    const submit = ()=>{
        toast('Once submitted cannot be revert ! ',{
            action:{
                label:'Confirm',
                onClick:async()=>{
                    if (selectedProduct === 0){
                        toast.error('Please select the product first')
                        return
                    }
                    if (!processMaterialData.yieldStrength || !processMaterialData.hardness || processMaterialData.yieldStrength === "" || processMaterialData.hardness === "") {
                        toast.error('Process Material data is missing. Please process material first.');
                        return;
                    }
                
                    if (!weldingParams.heatInput || !weldingParams.coolingTime || weldingParams.heatInput === "" || weldingParams.coolingTime === "") {
                        toast.error('Welding Parameter data is missing. Please process welding parameters first.');
                        return;
                    }
                    setLoading(true)
                    try{
                        const selectedProductData = products.find(product => product.productId == selectedProduct)
                        const reqData = {
                            productName:selectedProductData.productName,
                            materialType:selectedProductData.materialType,
                            materialSpecification:selectedProductData.materialSpecification,
                            density:selectedProductData.density,
                            tensileStrength:selectedProductData.tensileStrength,
                            yieldStrength:processMaterialData.yieldStrength,
                            flexuralStrength:selectedProductData.flexuralStrength,
                            hardness:processMaterialData.hardness,
                            thermalConductivity:selectedProductData.thermalConductivity,
                            porosity:selectedProductData.porosity,
                            elasticityVerified:processMaterialData.elasticityVerified,
                            optimizedWeldingParameters:{
                                heatInput:weldingParams.heatInput,
                                coolingTime:weldingParams.coolingTime,
                                weldingStrength:weldingParams.heatInput
                            },
                            finalApprovalStatus:isApproved?"Approved":"Rejected",
                            designSupportComments
                        }
                        await axiosInstance.post(`/design-support/save-data/${selectedProduct}`,{...reqData})
                        toast.success('Analysis submitted successfully..')
                        // Clear the inputs
                        window.location.reload()
                    }catch(error){
                        toast.error('Failed to submit analysis')
                    }finally{
                        setLoading (false)
                    }
                }
            }
        })

    }

    useEffect(()=>{ 
        fetchProductsData()
    },[])

  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='721px' role='Design Support' defaultActiveMenu='/dsAnalysis'/>
        <div style={{marginTop:'250px'}}>
       { haveAccess?(
          <div className='container bg-light' style={{height:'500px' ,maxHeight:'1500px',borderRadius:'30px'}}>
            <div className='d-flex flex-row-reverse '> 
              <select className='form-select ' style={{maxWidth:'200px',marginTop:'30px'}} onChange={(e)=>setSelectedProduct(e.target.value)}>
                <option value="">Choose Product Id</option>
                { 
                    products.map((product)=>(
                        <option value={product.productId} key={product.productId}>{product.productId}</option>
                      ))
                }1
              </select>
            </div>
            <div className='d-flex justify-content-evenly mt-5'>
                <button className='btn  px-5 ' style={{backgroundColor:'#B22727',color:'white'}} onClick={handleProcessMaterial} >Process Material</button>
                <button className='btn  px-5 ' style={{backgroundColor:'#085993',color:'white'}} onClick={handleWeldingParams}>Welding Parameter</button>
            </div>
            <div className='d-flex justify-content-evenly mt-5'>
              <div >
              <div className="form-floating" style={{width:'700px'}}>
                <textarea className="form-control" placeholder="Leave a brief description about the material analysis" style={{height: "100px"}} value={designSupportComments} onChange={(e)=>setDesignSupportComments(e.target.value)} ></textarea>
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
          </div> ):(
                            <div className='container bg-light'  style={{height:'300px' ,maxHeight:'1500px',borderRadius:'30px'}}>
                            <div className=' text-center p-5 fs-5'>No have Access to get data</div>
                            </div>
                      )}

            </div>

            {showProcessMaterialModal && (
                    <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                        <div className="modal-content bg-dark text-white">
                            <button 
                            type="button" 
                            className="position-absolute" 
                            style={{ top: '18px', right: '18px', zIndex: 10, color: 'white' }}  
                            onClick={() => setShowProcessMaterialModal(false)} 
                            aria-label="Close"
                            >
                            <IoMdCloseCircle size={30} style={{color:'white'}} />
                            </button>
                            <div className="modal-body p-5">
                            <h2 className='d-flex gap-1 align-items-center'>
                                <AiFillWarning className="text-yellow-400" /> Process Material
                            </h2>

                            {/* Table Section */}
                            <table className='table mt-5 table-info table-hover table-bordered'>
                                <tbody>
                                <tr>
                                    <th>Yield Strength</th>
                                    <td>
                                    <input 
                                        type="number" 
                                        className='form-control' 
                                        value={editedProcessMaterialData.yieldStrength} 
                                        name='yieldStrength' 
                                        onChange={handleChange} 
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Hardness</th>
                                    <td>
                                    <input 
                                        type="number" 
                                        className='form-control' 
                                        value={editedProcessMaterialData.hardness} 
                                        name='hardness' 
                                        onChange={handleChange} 
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Elasticity Verified</th>
                                    <td className='text-center'>
                                    <span className={editedProcessMaterialData.elasticityVerified ? "text-success fw-bold" : "text-danger fw-bold"}>
                                        {editedProcessMaterialData.elasticityVerified ? "Verified" : "Not Verified"}
                                    </span>
                                    <div className="form-check form-switch">
                                        <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        name="elasticityVerified"
                                        checked={editedProcessMaterialData.elasticityVerified}
                                        onChange={handleChange}
                                        />
                                    </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                              {/* Chart Section  */}
                            <div className="mt-4">
                                <h5>Material Properties Visualization</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={[
                                        { name: "Yield Strength", value: Number(editedProcessMaterialData.yieldStrength) },
                                        { name: "Hardness", value: Number(editedProcessMaterialData.hardness) }
                                    ]}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Save Changes Button */}
                            <div className="text-center mt-4">
                                <button className="btn btn-primary" onClick={handleSaveChanges}>
                                Save Changes
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    )}
            {showWeldingModal && (
                    <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                        <div className="modal-content bg-dark text-white">
                            <button 
                            type="button" 
                            className="position-absolute" 
                            style={{ top: '18px', right: '18px', zIndex: 10, color: 'white' }}  
                            onClick={() => setShowWeldingModal(false)} 
                            aria-label="Close"
                            >
                            <IoMdCloseCircle size={30} style={{color:'white'}} />
                            </button>
                            <div className="modal-body p-5">
                            <h3 className='d-flex gap-1 align-items-center'>
                                <AiFillWarning className="text-yellow-400" size={100} /> Predicted Welding Params(Random Forest Algorithm)
                            </h3>

                            {/* Table Section */}
                            <table className='table mt-5 table-info table-hover table-bordered'>
                                <tbody>
                                <tr>
                                    <th>Heat Input </th>
                                    <td>
                                    <input 
                                        type="number" 
                                        className='form-control' 
                                        value={editedWeldingParamData.heatInput} 
                                        name='heatInput' 
                                        onChange={handleChangeWelding} 
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Cooling Time</th>
                                    <td>
                                    <input 
                                        type="number" 
                                        className='form-control' 
                                        value={editedWeldingParamData.coolingTime} 
                                        name='coolingTime' 
                                        onChange={handleChangeWelding} 
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Welding Strength</th>
                                    <td>
                                    <input 
                                        type="number" 
                                        className='form-control' 
                                        value={editedWeldingParamData.weldingStrength} 
                                        name='weldingStrength' 
                                        onChange={handleChangeWelding} 
                                    />
                                    </td>
                                </tr>
                                
                                </tbody>
                            </table>
                           {/* Chart Section */}
                           <div className="mt-4">
                                <h5>Welding Parameters Visualization</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={[
                                        { name: "Heat Input", value: Number(editedWeldingParamData.heatInput) },
                                        { name: "Cooling Time", value: Number(editedWeldingParamData.coolingTime) },
                                        { name: "Welding Strength", value: Number(editedWeldingParamData.weldingStrength) }
                                    ]}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            {/* Save Changes Button */}
                            <div className="text-center mt-4">
                                <button className="btn btn-primary" onClick={handleSaveWeldingParams}>
                                Save Changes
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    )}

    </div>
  )
}

export default DSAnalysis