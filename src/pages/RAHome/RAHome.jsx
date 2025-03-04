import { toast } from 'sonner'
import Header from '../../components/Header/Header'
import React, { useState ,useEffect} from 'react'
import axiosInstance from '../../api/axiosInstance'

const RAHome = () => {
    const menuList = [
        {name:'Home',path:'/raHome'},
        {name:'Products',path:'/raProduct'},
        {name:'Analysis',path:'/raAnalysis'},
        {name:'Analysis Report',path:'/raAnalysisReport'},
        {name:'Data Access',path:'/raDataAccess'}
    ]
    const [densityThreshold, setDensityThreshold] = useState('')
    const [flexuralStrengthThreshold, setFlexuralStrengthThreshold] = useState('')
    const [tensileStrengthThreshold, setTensileStrengthThreshold] = useState('')
    const [porosityThreshold, setPorosityThreshold] = useState('')
    const [thermalConductivityThreshold, setThermalConductivityThreshold] = useState('')
    const [isEditing,setIsEditing] = useState(false)
    const [isNewEntry,setIsNewEntry] = useState(false)
    const [originalData, setOriginalData] = useState({});


    const handleReset = () => {
        setDensityThreshold('')
        setFlexuralStrengthThreshold('')
        setTensileStrengthThreshold('')
        setPorosityThreshold('')
        setThermalConductivityThreshold('')
    }

    const handleInputChange = (setter) => (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, '')  
        setter(value)
    }

    const fetchData = async()=>{
        try{
            const response = await axiosInstance.get('/resource-analyst/get-quality-criteria')
            const data =  response.data
            if(data != null){
                setDensityThreshold(data.densityThreshold)
                setFlexuralStrengthThreshold(data.flexuralStrengthThreshold)
                setTensileStrengthThreshold(data.tensileStrengthThreshold)
                setPorosityThreshold(data.porosityThreshold)
                setThermalConductivityThreshold(data.thermalConductivityThreshold)
                setOriginalData(data);
                setIsEditing(false)
                setIsNewEntry(false)
            }else{
                toast.error('!Fill the threshold values')
                setDensityThreshold('')
                setFlexuralStrengthThreshold('')
                setTensileStrengthThreshold('')
                setPorosityThreshold('')
                setThermalConductivityThreshold('')
                handleReset()
                setIsNewEntry(true)
                setIsEditing(true)
            }
        }catch(error){
                    console.log('Error : ',error.message)
                    toast.error('Failed to fetch data')
        }
    }

    const toggleEdit = () => {
        setIsEditing(true) 
    }
    const handleCancelEdit = () => {
        setDensityThreshold(originalData.densityThreshold || '');
        setFlexuralStrengthThreshold(originalData.flexuralStrengthThreshold || '');
        setTensileStrengthThreshold(originalData.tensileStrengthThreshold || '');
        setPorosityThreshold(originalData.porosityThreshold || '');
        setThermalConductivityThreshold(originalData.thermalConductivityThreshold || '');
        setIsEditing(false);
    };
    
    const handleSaveChanges = async()=>{
        try{
            await axiosInstance.put('/resource-analyst/update-quality-criteria',{
                densityThreshold,flexuralStrengthThreshold,tensileStrengthThreshold,porosityThreshold,thermalConductivityThreshold
            })
            toast.success('Quality Criteria Updated Successfully')
            setIsEditing(false)
            fetchData()
        }catch(error){
            toast.error('Failed to update quality criteria')
        }
    }
    const handleNewEntry = async()=>{
        try{
            await axiosInstance.post('/resource-analyst/set-quality-criteria/',{
                densityThreshold,flexuralStrengthThreshold,tensileStrengthThreshold,porosityThreshold,thermalConductivityThreshold
            })
            toast.success('Quality Criteria Added Successfully')
            setIsNewEntry(false)
            setIsEditing(false)
            fetchData()
        }catch(error){
            toast.error('Failed to add quality criteria')
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <div>
            <Header menuList={menuList} menuContainerWidth='721px' role='Resource Analyst' defaultActiveMenu='/raHome'/>
            <div style={{marginTop:'25vh'}} className='container'>
                <h3 className='text-light '>Quality Criteria Threshold</h3>
                <div className='bg-light mx-auto p-5 '>
                    <div className="form-floating">
                        <input type="text" className="form-control" value={densityThreshold} onInput={handleInputChange(setDensityThreshold)} disabled={!isEditing}/>
                        <label>Density (g/cm³)</label>
                    </div>
                    <div className="form-floating mt-3">
                        <input type="text" className="form-control" value={flexuralStrengthThreshold} onInput={handleInputChange(setFlexuralStrengthThreshold)} disabled= {!isEditing} />
                        <label>Flexural Strength (MPa)</label>
                    </div>
                    <div className="form-floating mt-3">
                        <input type="text" className="form-control" value={tensileStrengthThreshold} onInput={handleInputChange(setTensileStrengthThreshold)} disabled= {!isEditing} />
                        <label>Tensile Strength (MPa)</label>
                    </div>
                    <div className="form-floating mt-3">
                        <input type="text" className="form-control" value={porosityThreshold} onInput={handleInputChange(setPorosityThreshold)} disabled= {!isEditing} />
                        <label>Porosity</label>
                    </div>
                    <div className="form-floating mt-3">
                        <input type="text" className="form-control" value={thermalConductivityThreshold} onInput={handleInputChange(setThermalConductivityThreshold)}  disabled= {!isEditing}/>
                        <label>Thermal Conductivity (W/mK)</label>
                    </div>
                    <div className='d-flex justify-content-evenly mt-5'>
                        {isNewEntry ? (
                            <>
                            <button className='btn btn-secondary px-5' onClick={handleReset}>Reset</button>
                            <button className='btn btn-success px-5' onClick={handleNewEntry} >Save</button>
                            </>
                             
                        ) : (
                            isEditing ? (
                                <>
                                <button className='btn btn-secondary px-5' onClick={handleReset}>Reset</button>
                                <button className='btn btn-success px-5' onClick={handleSaveChanges} >Save Changes</button>
                                <button className='btn btn-danger px-5' onClick={handleCancelEdit}>Cancel</button>
                                </>
                            ) : (
                                <button className='btn btn-warning px-5' onClick={toggleEdit}>Edit</button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RAHome
