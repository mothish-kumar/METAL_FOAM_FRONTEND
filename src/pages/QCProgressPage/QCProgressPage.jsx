import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import { useLoader } from "../../context/LoaderContext";
import { toast } from "sonner";
import axiosInstance from "../../api/axiosInstance";
import DataTable from "../../components/DataTable/DataTable";

const QCProgressPage = () => {
    const menuList = [
        {name:'Home',path:'/qcHome'},
        {name:'Quality Check',path:'/qcQualityCheck'},
        {name:'Progress',path:'/qcProgress'},
        {name:'Reports',path:'/qcReport'}
    ]
      const { setLoading } = useLoader();
      const [selectedTab, setSelectedTab] = useState("Pending");
      const [data, setData] = useState([]);
      const queryParams = {
        "Pending": "qualityStatus=Pending",
        "Rework": "qualityStatus=Rework",
      };
      const columnMap = {
        "Pending":[
            { header: "Production ID", accessorKey: "productionId"},
            { header: "Product  Name", accessorKey: "productName" },
            {
                header: "Started At",
                accessorKey: "createdAt",
                cell: ({ getValue }) =>
                  getValue() ? new Date(getValue()).toLocaleString() : "N/A",
              },
              {
                header: "Last Updated At",
                accessorKey: "updatedAt",
                cell: ({ getValue }) =>
                  getValue() ? new Date(getValue()).toLocaleString() : "N/A",
              }
        ],
        "Rework":[
            { header: "Production ID", accessorKey: "productionId"},
            { header: "Product  Name", accessorKey: "productName" },
            {
                header: "Started At",
                accessorKey: "createdAt",
                cell: ({ getValue }) =>
                  getValue() ? new Date(getValue()).toLocaleString() : "N/A",
              },
              {
                header: "Last Updated At",
                accessorKey: "updatedAt",
                cell: ({ getValue }) =>
                  getValue() ? new Date(getValue()).toLocaleString() : "N/A",
              },
              { header: "Rejection Reason  ", accessorKey: "rejectionReason" }
        ]
      }

      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get(
            `/quality/get-status?${queryParams[selectedTab]}`
          );

          setData(response.data.data || []);
        } catch (error) {
          toast.error("Failed to fetch data");
        } finally {
          setLoading(false);
        }
      };
      useEffect(() => {
        fetchData();
      }, [selectedTab]);
  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='521px' role='Quality Check' defaultActiveMenu='/qcProgress'/>
        <div
        className="d-flex justify-content-center mx-auto"
        style={{
          backgroundColor: "#D9D9D9",
          color: "black",
          borderRadius: "50px",
          height: "43px",
          width: "350px",
          marginTop: "170px",
        }}
      >
        <ul
          className="d-flex flex-row mt-2 gap-5 justify-content-center"
          style={{ listStyleType: "none" }}
        >
          {Object.keys(queryParams).map((tab) => (
            <li
              key={tab}
              style={{
                cursor: "pointer",
                fontWeight: selectedTab === tab ? "bold" : "normal",
                textDecoration: selectedTab === tab ? "underline" : "none",
                color:selectedTab=== tab ?"green":"black"
              }}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-light mt-5 w-75 mx-auto" style={{ maxHeight: "700px" ,borderRadius:'30px'}}>
        <DataTable data={data} columns={columnMap[selectedTab]} />
      </div>
    </div>  )
}

export default QCProgressPage