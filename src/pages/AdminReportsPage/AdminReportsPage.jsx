import React,{useEffect,useState} from 'react'
import Header from '../../components/Header/Header'
import axiosInstance from '../../api/axiosInstance'
import DataTable from '../../components/DataTable/DataTable'

const AdminReportsPage = () => {
    const menuList = [
        { name: 'Dashboard', path: '/adminHome' },
        { name: 'Products', path: '/adminProduct' },
        { name: 'User Management', path: '/adminUserManagement' },
        { name: 'Reports', path: '/adminReports' },
        { name: 'Rejected Products', path: '/adminRejectedProducts' },
        { name: 'Data Access', path: '/adminDataAccess' }
      ]
      const [selectedReport,setSelectedReport] = useState(null)
      //RA Report
      const [raData,setRadata] = useState([])
      const [showRaModal,setShowRaModal] = useState(false)
      const raColumns = [
        { accessorKey: "productName", header: "Product Name" },
        { accessorKey: "materialType", header: "Material Type" },
        { accessorKey: "approvalStatus", header: "Approval Status" },
        {header:'Actions',
          cell:({row})=>{
            const report = row.original
            return(
              <div style={{cursor:'pointer',color:'#0095FF'}} className='text-center' onClick={()=>{handleRaReport(report)}}>more info...</div>
            )
          }
        }
      ]
      const handleRaReport = (report)=>{
        setSelectedReport(report)
        setShowRaModal(true)
      }
      const fetchRaData = async()=>{
        try{
          const response = await axiosInstance.get('/admin/get-ra-report')
          setRadata(response.data.products)
        }catch(error){
          toast.error('Failed to fetch resource analyst report')
        }
      }
      //Design Support
      const [dsData,setDsReport] = useState([])
      const [showDsModal,setShowDsModal] = useState(false)
      const dsColumns = [
        { accessorKey: "productName", header: "Product Name" },
        { accessorKey: "materialType", header: "Material Type" },
        { accessorKey: "finalApprovalStatus", header: "Approval Status" },
        {header:'Actions',
          cell:({row})=>{
            const report = row.original
            return(
              <div style={{cursor:'pointer',color:'#0095FF'}} className='text-center' onClick={()=>{handleDsReport(report)}}>more info...</div>
            )
          }
        }
      ]
      const handleDsReport = (report)=>{
        setSelectedReport(report)
        setShowDsModal(true)
      }
      const fetchDsData = async()=>{
        try{
          const response = await axiosInstance.get('/admin/get-ds-report')
          setDsReport(response.data.products)
        }catch(error){
          toast.error('Failed to fetch Design support reports')
        }
      }
      //Production 
      const [paData,setPaData] = useState([])
      const [showPaModal,setShowPaModal] = useState(false)
      const paColumns = [
        { accessorKey: "productionName", header: "Production Name" },
        { accessorKey: "startedAt", header: "Production starts at",cell: ({ row }) => new Date(row.original.startedAt).toLocaleString() },
        { accessorKey: "productionStatus", header: "Production Status" },
        {header:'Actions',
          cell:({row})=>{
            const report = row.original
            return(
              <div style={{cursor:'pointer',color:'#0095FF'}} className='text-center' onClick={()=>{handlePaReport(report)}}>more info...</div>
            )
          }
        }
      ]
      const handlePaReport = (report)=>{
        setSelectedReport(report)
        setShowPaModal(true)
      }
      const fetchPaData = async()=>{
        try{
          const response = await axiosInstance.get('admin/get-pa-report')
          setPaData(response.data.data)
        }catch(error){
          toast.error('Failed to fetch Production Report ')
        }
      }

      //Quality
      const [qcData,setQcData] = useState([])
      const [showQcModal,setShowQcModal] = useState(false)
      const qcColumns = [
        { accessorKey: "productName", header: "Production Name" },
        { accessorKey: "createdAt", header: "Quality starts at",cell: ({ row }) => new Date(row.original.createdAt).toLocaleString() },
        { accessorKey: "qualityStatus", header: "Quality Status" },
        {header:'Actions',
          cell:({row})=>{
            const report = row.original
            return(
              <div style={{cursor:'pointer',color:'#0095FF'}} className='text-center' onClick={()=>{handleQcReport(report)}}>more info...</div>
            )
          }
        }
      ]
      const handleQcReport = (report)=>{
        setSelectedReport(report)
        setShowQcModal(true)
      }
      const fetchQcData = async()=>{
        try{
          const response = await axiosInstance.get('/admin/get-qa-report')
          setQcData(response.data.qualityReports)
        }catch(error){
          toast.error('Failed to fetch Quality Report')
        }
      }
      useEffect(()=>{
        fetchRaData()
        fetchDsData()
        fetchPaData()
        fetchQcData()
      },[])
      return (
        <div>
          <Header menuList={menuList} menuContainerWidth='921px' role='Admin' defaultActiveMenu='/adminReports'/>
          <div style={{marginTop:'180px',maxHeight: "750px",maxWidth:'2500px', overflowY: "auto"}}>
            <div className='container'>
              <h3 className='text-light'>Resource Analyst</h3>
              <div className='mt-3 bg-light'>
                    <DataTable data={raData} columns={raColumns}/>
              </div>
            </div>
            <div className='container mt-5'>
              <h3 className='text-light'>Design Support</h3>
              <div className='mt-3 bg-light'>
                    <DataTable data={dsData} columns={dsColumns}/>
              </div>
            </div>
            <div className='container mt-5'>
              <h3 className='text-light'>Production & Assembly</h3>
              <div className='mt-3 bg-light'>
                    <DataTable data={paData} columns={paColumns}/>
              </div>
            </div>
            <div className='container mt-5'>
              <h3 className='text-light'>Quality Control</h3>
              <div className='mt-3 bg-light'>
                    <DataTable data={qcData} columns={qcColumns}/>
              </div>
            </div>
            {showRaModal && selectedReport && (
              <div>
                <div 
                  key="raReportModal"
                  className="modal fade show d-block"
                  tabIndex="-1"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Resource Analyst Report</h5>
                        <button className="btn-close btn-close-white" onClick={() => setShowRaModal(false)}></button>
                      </div>

                      <div className="modal-body">
                        {/* Product Information */}
                        <div className="card border-start border-4 border-primary p-3 mb-3">
                          <h5 className="text-primary">Product Information</h5>
                          <div className="row">
                            <div className="col-md-6">
                              <p className="text-secondary fw-bold">Product Name:</p> <p className="text-dark">{selectedReport.productName}</p>
                              <p className="text-secondary fw-bold">Material Type:</p> <p className="text-dark">{selectedReport.materialType}</p>
                            </div>
                            <div className="col-md-6">
                              <p className="text-secondary fw-bold">Specification:</p> <p className="text-dark">{selectedReport.materialSpecification}</p>
                              <p className="text-secondary fw-bold">Quantity:</p> <p className="text-dark">{selectedReport.quantity} units</p>
                            </div>
                          </div>
                        </div>

                        {/* Material Properties */}
                        <div className="card border-start border-4 border-success p-3 mb-3">
                          <h5 className="text-success">Material Properties</h5>
                          <div className="row">
                            <div className="col-md-4">
                              <p className="text-secondary fw-bold">Thickness:</p> <p className="text-dark">{selectedReport.thickness} mm</p>
                              <p className="text-secondary fw-bold">Volume:</p> <p className="text-dark">{selectedReport.volume} cm³</p>
                            </div>
                            <div className="col-md-4">
                              <p className="text-secondary fw-bold">Density:</p> <p className="text-dark">{selectedReport.density} g/cm³</p>
                              <p className="text-secondary fw-bold">Thermal Conductivity:</p> <p className="text-dark">{selectedReport.thermalConductivity} W/mK</p>
                            </div>
                            <div className="col-md-4">
                              <p className="text-secondary fw-bold">Flexural Strength:</p> <p className="text-dark">{selectedReport.flexuralStrength} MPa</p>
                              <p className="text-secondary fw-bold">Tensile Strength:</p> <p className="text-dark">{selectedReport.tensileStrength} MPa</p>
                            </div>
                          </div>
                        </div>

                        {/* Evaluation Metrics Table */}
                        <div className="card border-start border-4 border-warning p-3 mb-3">
                          <h5 className="text-warning">Evaluation Metrics</h5>
                          <table className="table table-hover">
                            <thead className="table-warning">
                              <tr>
                                <th>Force (N)</th>
                                <th>Stress (MPa)</th>
                                <th>Strain</th>
                                <th>Young's Modulus (GPa)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedReport.evaluation.map((evalItem, index) => (
                                <tr key={index}>
                                  <td>{evalItem.force}</td>
                                  <td>{evalItem.stress}</td>
                                  <td>{evalItem.strain}</td>
                                  <td>{evalItem.youngsModulus}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Welding Parameters */}
                        <div className="card border-start border-4 border-danger p-3 mb-3">
                          <h5 className="text-danger">Welding Parameters</h5>
                          <table className="table table-striped">
                            <tbody>
                              <tr><td className="text-secondary fw-bold">Heat Input</td><td className="text-dark">{selectedReport.weldingParameters.heatInput} J</td></tr>
                              <tr><td className="text-secondary fw-bold">Cooling Time</td><td className="text-dark">{selectedReport.weldingParameters.coolingTime} sec</td></tr>
                              <tr><td className="text-secondary fw-bold">Welding Strength</td><td className="text-dark">{selectedReport.weldingParameters.weldingStrength} MPa</td></tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Resource Analyst Description */}
                        <div className="card border-start border-4 border-info p-3 mb-3">
                          <h5 className="text-info">Resource Analyst Description</h5>
                          <p className="bg-light p-2 border rounded">{selectedReport.resourceAnalystDescription}</p>
                        </div>

                        {/* Status & Meta Info */}
                        <div className="row">
                          <div className="col-md-6">
                            <p className="text-secondary fw-bold">Resource Analyst ID:</p>
                            <p className="text-dark">{selectedReport.resourceAnalystID}</p>
                          </div>
                          <div className="col-md-6">
                            <p className="text-secondary fw-bold">Timestamp:</p>
                            <p className="text-dark">{new Date(selectedReport.timestamp * 1000).toLocaleString()}</p>
                          </div>
                        </div>

                        {/* Approval Status Badge */}
                        <div className="text-center mt-3">
                          <span className={`badge ${selectedReport.approvalStatus === 'Approved' ? 'bg-success' : 'bg-danger'} p-2`}>
                            {selectedReport.approvalStatus}
                          </span>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => setShowRaModal(false)}>Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showDsModal && selectedReport && (
              <div>
                <div 
                  key="raReportModal"
                  className="modal fade show d-block"
                  tabIndex="-1"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Design Support Report</h5>
                        <button className="btn-close btn-close-white" onClick={() => setShowDsModal(false)}></button>
                      </div>

                      <div className="modal-body">
                        {/* Product Information */}
                        <div className="card border-start border-4 border-primary p-3 mb-3">
                          <h5 className="text-primary">Product Information</h5>
                          <div className="row">
                            <div className="col-md-6">
                              <p className="text-secondary fw-bold">Product Name:</p> <p className="text-dark">{selectedReport.productName}</p>
                              <p className="text-secondary fw-bold">Material Type:</p> <p className="text-dark">{selectedReport.materialType}</p>
                            </div>
                            <div className="col-md-6">
                              <p className="text-secondary fw-bold">Specification:</p> <p className="text-dark">{selectedReport.materialSpecification}</p>
                              <p className="text-secondary fw-bold">Timestamp:</p> 
                              <p className="text-dark">{new Date(selectedReport.timestamp * 1000).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>

                        {/* Mechanical Properties */}
                        <div className="card border-start border-4 border-success p-3 mb-3">
                          <h5 className="text-success">Mechanical Properties</h5>
                          <div className="row">
                            <div className="col-md-4">
                              <p className="text-secondary fw-bold">Density:</p> <p className="text-dark">{selectedReport.density} g/cm³</p>
                              <p className="text-secondary fw-bold">Porosity:</p> <p className="text-dark">{selectedReport.porosity}</p>
                            </div>
                            <div className="col-md-4">
                              <p className="text-secondary fw-bold">Tensile Strength:</p> <p className="text-dark">{selectedReport.tensileStrength} MPa</p>
                              <p className="text-secondary fw-bold">Yield Strength:</p> <p className="text-dark">{selectedReport.yieldStrength} MPa</p>
                            </div>
                            <div className="col-md-4">
                              <p className="text-secondary fw-bold">Flexural Strength:</p> <p className="text-dark">{selectedReport.flexuralStrength} MPa</p>
                              <p className="text-secondary fw-bold">Hardness:</p> <p className="text-dark">{selectedReport.hardness}</p>
                            </div>
                          </div>
                        </div>

                        {/* Thermal Properties */}
                        <div className="card border-start border-4 border-warning p-3 mb-3">
                          <h5 className="text-warning">Thermal Properties</h5>
                          <p className="text-secondary fw-bold">Thermal Conductivity:</p> 
                          <p className="text-dark">{selectedReport.thermalConductivity} W/mK</p>
                        </div>

                        {/* Welding Parameters */}
                        <div className="card border-start border-4 border-danger p-3 mb-3">
                          <h5 className="text-danger">Optimized Welding Parameters</h5>
                          <table className="table table-striped">
                            <tbody>
                              <tr><td className="text-secondary fw-bold">Heat Input</td><td className="text-dark">{selectedReport.optimizedWeldingParameters.heatInput} J</td></tr>
                              <tr><td className="text-secondary fw-bold">Thermal Conductivity Rate</td><td className="text-dark">{selectedReport.optimizedWeldingParameters.thermalConductivityRate}</td></tr>
                              <tr><td className="text-secondary fw-bold">Cooling Time</td><td className="text-dark">{selectedReport.optimizedWeldingParameters.coolingTime} sec</td></tr>
                              <tr><td className="text-secondary fw-bold">Welding Strength</td><td className="text-dark">{selectedReport.optimizedWeldingParameters.weldingStrength} MPa</td></tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Elasticity Verification */}
                        <div className="card border-start border-4 border-info p-3 mb-3">
                          <h5 className="text-info">Elasticity Verification</h5>
                          <p className={`badge ${selectedReport.elasticityVerified ? 'bg-success' : 'bg-danger'}`}>
                            {selectedReport.elasticityVerified ? 'Verified' : 'Not Verified'}
                          </p>
                        </div>

                        {/* Design Support Comments */}
                        <div className="card border-start border-4 border-secondary p-3 mb-3">
                          <h5 className="text-secondary">Design Support Comments</h5>
                          <p className="bg-light p-2 border rounded">{selectedReport.designSupportComments}</p>
                        </div>

                        {/* Approval Status */}
                        <div className="text-center mt-3">
                          <span className={`badge ${selectedReport.finalApprovalStatus === 'Approved' ? 'bg-success' : 'bg-danger'} p-2`}>
                            {selectedReport.finalApprovalStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showPaModal && selectedReport && (
              <div>
                <div 
                  key="productionReportModal"
                  className="modal fade show d-block"
                  tabIndex="-1"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Production Report</h5>
                        <button className="btn-close btn-close-white" onClick={() => setShowPaModal(false)}></button>
                      </div>
            
                      <div className="modal-body">
                        {/* Production Details */}
                        <div className="card border-start border-4 border-primary p-3 mb-3">
                          <h5 className="text-primary">Production Details</h5>
                          <div className="row">
                            <div className="col-md-6">
                              <p className="text-secondary fw-bold">Production Name:</p> <p className="text-dark">{selectedReport.productionName}</p>
                              <p className="text-secondary fw-bold">Production ID:</p> <p className="text-dark">{selectedReport.productionId}</p>
                            </div>
                            <div className="col-md-6">
                              <p className="text-secondary fw-bold">Production Status:</p> 
                              <span className={`badge ${selectedReport.productionStatus === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
                                {selectedReport.productionStatus}
                              </span>
                              <p className="text-secondary fw-bold">Production Employee:</p> <p className="text-dark">{selectedReport.productionEmployeeId}</p>
                            </div>
                          </div>
                        </div>
            
                        {/* Feasibility Score */}
                        <div className="card border-start border-4 border-warning p-3 mb-3">
                          <h5 className="text-warning">Feasibility Score</h5>
                          <p className="fs-4 fw-bold">{selectedReport.feasibilityScore}</p>
                        </div>
            
                        {/* Timestamps */}
                        <div className="card border-start border-4 border-info p-3 mb-3">
                          <h5 className="text-info">Timestamps</h5>
                          <p className="text-secondary fw-bold">Started At:</p> 
                          <p className="text-dark">{new Date(selectedReport.startedAt).toLocaleString()}</p>
                          <p className="text-secondary fw-bold">Sent for Quality Check At:</p> 
                          <p className="text-dark">{new Date(selectedReport.sentForQualityCheckAt).toLocaleString()}</p>
                        </div>
            
                        {/* Production Metrics */}
                        <div className="card border-start border-4 border-success p-3 mb-3">
                          <h5 className="text-success">Production Metrics</h5>
                          <table className="table table-striped">
                            <tbody>
                              <tr><td className="text-secondary fw-bold">Heat Input</td><td className="text-dark">{selectedReport.productionReport.metrics.heatInput} J</td></tr>
                              <tr><td className="text-secondary fw-bold">Welding Strength</td><td className="text-dark">{selectedReport.productionReport.metrics.weldingStrength} MPa</td></tr>
                            </tbody>
                          </table>
                        </div>
            
                        {/* Quality Report */}
                        <div className="card border-start border-4 border-danger p-3 mb-3">
                          <h5 className="text-danger">Quality Report</h5>
                          <p className="text-secondary fw-bold">Welding Quality:</p> 
                          <p className="text-dark">{selectedReport.productionReport.weldingQuality}</p>
                          <p className="text-secondary fw-bold">Recommendations:</p> 
                          <p className="bg-light p-2 border rounded">{selectedReport.productionReport.recommendations}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showQcModal && selectedReport && (
                <div>
                  <div 
                    key="qualityAssessmentModal"
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{ background: "rgba(0,0,0,0.5)" }}
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                          <h5 className="modal-title">Quality Assessment Report</h5>
                          <button className="btn-close btn-close-white" onClick={() => setShowQcModal(false)}></button>
                        </div>

                        <div className="modal-body">
                          {/* Product Details */}
                          <div className="card border-start border-4 border-primary p-3 mb-3">
                            <h5 className="text-primary">Product Details</h5>
                            <div className="row">
                              <div className="col-md-6">
                                <p className="text-secondary fw-bold">Product Name:</p> <p className="text-dark">{selectedReport.productName}</p>
                                <p className="text-secondary fw-bold">Product ID:</p> <p className="text-dark">{selectedReport.productId}</p>
                              </div>
                              <div className="col-md-6">
                                <p className="text-secondary fw-bold">Production ID:</p> <p className="text-dark">{selectedReport.productionId}</p>
                                <p className="text-secondary fw-bold">Transaction Hash:</p> 
                                <p className="text-dark text-truncate">{selectedReport.productTransactionHash}</p>
                              </div>
                            </div>
                          </div>

                          {/* Quality Status */}
                          <div className="card border-start border-4 border-danger p-3 mb-3">
                            <h5 className="text-danger">Quality Status</h5>
                            <span className={`badge ${selectedReport.qualityStatus === 'Approved' ? 'bg-success' : 'bg-danger'} p-2`}>
                              {selectedReport.qualityStatus}
                            </span>
                          </div>

                          {/* Test Results */}
                          <div className="card border-start border-4 border-success p-3 mb-3">
                            <h5 className="text-success">Test Results</h5>
                            <table className="table table-striped">
                              <tbody>
                                <tr><td className="text-secondary fw-bold">Corrosion Resistance</td><td className="text-dark">{selectedReport.testResults.corrosionResistance} %</td></tr>
                                <tr><td className="text-secondary fw-bold">Tensile Strength</td><td className="text-dark">{selectedReport.testResults.tensileStrength} MPa</td></tr>
                                <tr><td className="text-secondary fw-bold">Weight Efficiency</td><td className="text-dark">{selectedReport.testResults.weightEfficiency} %</td></tr>
                                <tr><td className="text-secondary fw-bold">Young's Modulus</td><td className="text-dark">{selectedReport.testResults.youngsModulus} GPa</td></tr>
                              </tbody>
                            </table>
                          </div>

                          {/* Welding Assessment */}
                          <div className="card border-start border-4 border-warning p-3 mb-3">
                            <h5 className="text-warning">Welding Assessment</h5>
                            <table className="table table-striped">
                              <tbody>
                                <tr><td className="text-secondary fw-bold">Corrosion Impact</td><td className="text-dark">{selectedReport.weldingAssessment.corrosionImpact} %</td></tr>
                                <tr><td className="text-secondary fw-bold">Weight Retention</td><td className="text-dark">{selectedReport.weldingAssessment.weightRetention} %</td></tr>
                                <tr><td className="text-secondary fw-bold">Weld Integrity</td><td className="text-dark">{selectedReport.weldingAssessment.weldIntegrity} %</td></tr>
                              </tbody>
                            </table>
                          </div>

                          {/* Approval & Comments */}
                          <div className="card border-start border-4 border-primary p-3 mb-3">
                            <h5 className="text-primary">Approval Information</h5>
                            <p className="text-secondary fw-bold">Approved By:</p> <p className="text-dark">{selectedReport.approvedBy}</p>
                            <p className="text-secondary fw-bold">Approval Date:</p> <p className="text-dark">{new Date(selectedReport.approvalDate).toLocaleString()}</p>
                          </div>

                          {/* Improvement Suggestions */}
                          <div className="card border-start border-4 border-danger p-3 mb-3">
                            <h5 className="text-danger">Improvement Suggestions</h5>
                            <p className="bg-light p-2 border rounded">{selectedReport.improvementSuggestions}</p>
                          </div>

                          {/* Rejection Reason */}
                          {selectedReport.rejectionReason !== "none" && (
                            <div className="card border-start border-4 border-danger p-3 mb-3">
                              <h5 className="text-danger">Rejection Reason</h5>
                              <p className="bg-light p-2 border rounded">{selectedReport.rejectionReason}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            
          </div>
        </div>
      )
}

export default AdminReportsPage