import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useLoader } from "../../context/LoaderContext";
import { toast } from "sonner";
import axiosInstance from "../../api/axiosInstance";
import DataTable from "../../components/DataTable/DataTable";

const PRProgressPage = () => {
  const menuList = [
    { name: "Home", path: "/prHome" },
    { name: "Production", path: "/prProduction" },
    { name: "Progress", path: "/prProgress" },
    { name: "Quality Check", path: "/prQualityCheck" },
    { name: "Reports", path: "/prReport" },
  ];

  const { setLoading } = useLoader();
  const [selectedTab, setSelectedTab] = useState("In Progress");
  const [data, setData] = useState([]);

  const queryParams = {
    "In Progress": "productionStatus=In_Progress",
    "Quality Check": "productionStatus=Quality_Check",
    "Completed": "productionStatus=Completed",
    "Rework": "productionStatus=Rework",
  };

  const columnMap = {
    "In Progress": [
      { header: "Production ID", accessorKey: "productionId" },
      { header: "Production Name", accessorKey: "productionName" },
      {
        header: "Started At",
        accessorKey: "startedAt",
        cell: ({ getValue }) =>
          getValue() ? new Date(getValue()).toLocaleString() : "N/A",
      },
      { header: "Feasibility Score", accessorKey: "feasibilityScore" },
    ],
    "Quality Check": [
      { header: "Production ID", accessorKey: "productionId" },
      { header: "Production Name", accessorKey: "productionName" },
      {
        header: "Quality Check",
        accessorKey: "sentForQualityCheckAt",
        cell: ({ getValue }) =>
          getValue() ? new Date(getValue()).toLocaleString() : "N/A",
      },
      { header: "Production Report", accessorKey: "productionReport.recommendations" },
    ], 
    Completed: [
      { header: "Production ID", accessorKey: "productionId" },
      { header: "Production Name", accessorKey: "productionName" },
      {
        header: "Completion Date",
        accessorKey: "finishedAt",
        cell: ({ getValue }) =>
          getValue() ? new Date(getValue()).toLocaleString() : "N/A",
      },
    ],
    Rework: [
      { header: "Production ID", accessorKey: "productionId" },
      { header: "Production Name", accessorKey: "productionName" },
      {
        header: "Updated At",
        accessorKey: "updatedAt",
        cell: ({ getValue }) =>
          getValue() ? new Date(getValue()).toLocaleString() : "N/A",
      },
      { header: "Issue", accessorKey: "reworkIssue" },
    ],
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/production/getProduction?${queryParams[selectedTab]}`
      );
      setData(response.data.productionData || []);
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
      <Header
        menuList={menuList}
        menuContainerWidth="721px"
        role="Production & Assembly"
        defaultActiveMenu="/prProgress"
      />
      <div
        className="d-flex justify-content-center mx-auto"
        style={{
          backgroundColor: "#D9D9D9",
          color: "black",
          borderRadius: "50px",
          height: "43px",
          width: "600px",
          marginTop: "170px",
        }}
      >
        <ul
          className="d-flex flex-row mt-2 gap-3 justify-content-center"
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
    </div>
  );
};

export default PRProgressPage;
