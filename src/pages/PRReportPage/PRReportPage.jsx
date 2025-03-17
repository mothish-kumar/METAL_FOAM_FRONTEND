import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import { toast } from 'sonner'
import axiosInstance from '../../api/axiosInstance'
import DataTable from '../../components/DataTable/DataTable'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";




const PRReportPage = () => {
  pdfMake.vfs = pdfFonts.vfs;
    const menuList = [
        {name:'Home',path:'/prHome'},
        {name:'Production',path:'/prProduction'},
        {name:'Progress',path:'/prProgress'},
        {name:'Quality Check',path:'/prQualityCheck'},
        {name:'Reports',path:'/prReport'}
    ]
    const[data,setData] = useState([])
    const columns = [
      { accessorKey: "productionId", header: "Production ID" },
      { accessorKey: "productionName", header: "Production Name" },
      { accessorKey: "createdAt", header: "StartedAt" },
      {header:"Action",
        cell:({row})=>{
          const production = row.original
          return(
            <div className='text-center'>
              <button className='btn btn-warning px-4' onClick={()=>generatePdf(production.productionId)} >Download Report</button>
            </div>
          )
        }
      }
    ]
    const fetchProductionList = async()=>{
      try{
        const response = await axiosInstance.get('/production/getProduction?productionStatus=Completed')
        setData(response.data.productionData || [])
      }catch(error){
        toast.error('Failed to fetch production list')
      }
    }

    const pdfHelperFunction = (reportData)=>{
      const docDefinition = {
        content: [
          { text: "Production Report", style: "header" },
          { text: `Production  ID: ${reportData.productionId}`, style: "subheader" },
          { text: `Production Name: ${reportData.productionName}`, style: "subheader" },
          { text: `Product ID: ${reportData.productId}`, style: "subheader" },
          { text: `Production Status: ${reportData.productionStatus}`, style: "subheader" },
          { text: `Feasibility Score: ${reportData.feasibilityScore}`, style: "subheader" },
          { text: `Started At: ${new Date(reportData.startedAt).toLocaleString()}`, style: "subheader" },
          { text: `Production Employee ID: ${reportData.productionEmployeeId}`, style: "subheader" },
          { text: `Fineshed At: ${new Date(reportData.finishedAt).toLocaleString()}`, style: "subheader" },
          { text: "Metrics", style: "header" },
          {
            table: {
              widths: ["50%", "50%"],
              body: [
                ["Heat Input", "Welding Strength"],
                [reportData.productionReport.metrics?.heatInput || "N/A", reportData.productionReport.metrics?.weldingStrength || "N/A"],
              ],
            },
          }
        ],
        styles: {
          header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
          subheader: { fontSize: 14, margin: [0, 5, 0, 5] },
        },
      };
  
      pdfMake.createPdf(docDefinition).download(`Production_Report_${reportData.productionId}.pdf`);
    }

    const generatePdf = async (productionId) => {
      try {
        const response = await axiosInstance.get(`/production/generate-production-report/${productionId}`);
        const report = response.data.data;
        pdfHelperFunction(report);
      } catch (error) {
        console.error("Error generating PDF:", error.message);
        toast.error("Failed to generate report");
      }
    };
    

useEffect(()=>{
  fetchProductionList()
},[]) 
  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='721px' role='Production & Assembly' defaultActiveMenu='/prReport'/> 
        <div className='bg-light mx-auto' style={{marginTop:'180px', maxWidth:'1500px',borderRadius:'30px',padding:'20px'}}>
          <DataTable data={data} columns={columns}/>
        </div>
    </div>
  )
}

export default PRReportPage