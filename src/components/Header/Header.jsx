import React from 'react'
import logoImg from '../../assets/metalFoamIcon.png'
import { IoSettingsSharp } from "react-icons/io5";
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Header = ({menuList,defaultActiveMenu,role, menuContainerWidth,}) => {
    const [activeMenu,setActiveMenu] = useState(defaultActiveMenu)    
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate()

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

  return (
    <div className='container-fluid' style={{position:'fixed',top:0}}>
        <div className='row mt-2'>
            <div className='col-2'>
                <div className='text-center mt-3'><img src={logoImg} alt="logo icon" width='109px' style={{borderRadius:'30px',marginLeft:'95px'}} /></div>
                <p className='text-light text-center'>{role}</p>
            </div>
            <div className='col-8 align-self-center '>
                    <div className='d-flex justify-content-center mx-auto ' style={{ backgroundColor: '#D9D9D9', color: 'black', borderRadius: '50px', height: '43px' ,width:menuContainerWidth}}>
                        <ul className='d-flex flex-row mt-2 gap-3 justify-content-center ' style={{ listStyleType: 'none' }}>
                        {
                          menuList.map((item) => (
                                <li className='text-center '
                                 key={item.name} 
                                 style={{
                                    cursor: 'pointer',
                                    paddingBottom: '3px',
                                    color:activeMenu === item.path ? '#ff3f04' : 'black',
                                }} 
                                 onClick={() => {
                                    setActiveMenu(item.path)
                                    navigate(item.path)
                                }}
                                 >
                                    {item.name}
                                </li> 
                            ))
                    }

                        </ul>
                    </div>
            </div>
            <div className='col-2  d-flex gap-5 align-items-center'>
                <div>
                    <button className='btn btn-danger' onClick={()=>window.location.href='/'}>Logout</button>
                </div>
                <div>
                <IoSettingsSharp 
                            size={40} 
                            style={{ color: 'white', cursor: 'pointer' }} 
                            onClick={toggleDropdown}
                        />
                        {showDropdown && (
                            <div className="dropdown-menu show position-absolute" style={{ right: 0 ,top:'120px'}}>
                                <button className="dropdown-item" onClick={() => navigate('/change-password')}>Change Password</button>
                            </div>
                        )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header