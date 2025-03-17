import React from 'react'
import Header from '../../components/Header/Header'

const QCProgressPage = () => {
    const menuList = [
        {name:'Home',path:'/qcHome'},
        {name:'Quality Check',path:'/qcQualityCheck'},
        {name:'Progress',path:'/qcProgress'},
        {name:'Reports',path:'/qcReport'}
    ]
  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='521px' role='Quality Check' defaultActiveMenu='/qcProgress'/>
    </div>  )
}

export default QCProgressPage