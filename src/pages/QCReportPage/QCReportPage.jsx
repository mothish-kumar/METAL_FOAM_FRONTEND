import React from 'react'
import Header from '../../components/Header/Header'

const QCReportPage = () => {
    const menuList = [
        {name:'Home',path:'/qcHome'},
        {name:'Quality Check',path:'/qcQualityCheck'},
        {name:'Progress',path:'/qcProgress'},
        {name:'Reports',path:'/qcReport'}
    ]
  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='521px' role='Quality Check' defaultActiveMenu='/qcReport'/>
    </div>  )
}

export default QCReportPage