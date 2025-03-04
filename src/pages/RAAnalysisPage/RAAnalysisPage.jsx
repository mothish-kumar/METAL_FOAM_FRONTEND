import React from 'react'
import Header from '../../components/Header/Header'
const RAAnalysisPage = () => {
    const menuList = [
        {name:'Home',path:'/raHome'},
        {name:'Products',path:'/raProduct'},
        {name:'Analysis',path:'/raAnalysis'},
        {name:'Analysis Report',path:'/raAnalysisReport'},
        {name:'Data Access',path:'/raDataAccess'}
    ]
  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='721px' role='Resource Analyst' defaultActiveMenu='/raAnalysis'/>
        <div></div>
    </div>
  )
}

export default RAAnalysisPage