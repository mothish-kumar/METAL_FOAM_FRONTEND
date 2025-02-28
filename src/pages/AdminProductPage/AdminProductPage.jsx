import React from 'react'
import Header from '../../components/Header/Header'

const AdminProductPage = () => {
    const menuList = [
        { name: 'Dashboard', path: '/adminHome' },
        { name: 'Products', path: '/adminProduct' },
        { name: 'User Management', path: '/adminUserManagement' },
        { name: 'Reports', path: '/adminReports' },
        { name: 'Rejected Products', path: '/adminRejectedProducts' },
        { name: 'Data Access', path: '/adminDataAccess' }
      ]
      return (
        <div>
          <Header menuList={menuList} menuContainerWidth='921px' role='Admin' defaultActiveMenu='/adminProduct'/>
        </div>
    
      )
}

export default AdminProductPage