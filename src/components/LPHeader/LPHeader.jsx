import React, { useState } from 'react';
import logo from '../../assets/metalFoamIcon.png';
import styles from './LPHeader.module.css';


const LPHeader = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('Home'); // Track the active menu

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        console.log(section);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    

    return (
        <div style={{position:'fixed',top:'0',left:'0',zIndex:'100',width:'100%'}}>
            <div className="container">
            <div className="row">
                <div className="col-2">
                    <div className="d-flex justify-content-center">
                        <img src={logo} alt="logo" className="img-fluid" style={{ height: '125px', width: '109px' }} />
                    </div>
                </div>
                <div className="col-7 align-self-center">
                    <div className="d-flex justify-content-center" style={{ backgroundColor: '#D9D9D9', color: 'black', borderRadius: '50px', height: '43px' }}>
                    <ul className="d-flex flex-row mt-2 gap-3 justify-content-center" style={{ listStyleType: 'none' }}>
    {[
        { name: 'Home', id: 'hero' },
        { name: 'About us', id: 'about' },
        { name: 'Module Overview', id: 'module' },
        { name: 'Featured Materials', id: 'featured' },
        { name: 'Contact us', id: 'contact' }
    ].map((item) => (
        <li
            key={item.name}
            className={activeTab === item.name ? styles.activeTab : ''}
            onClick={() => {
                setActiveTab(item.name);
                if (item.id) scrollToSection(item.id);
            }}
            style={{
                cursor: 'pointer',
                paddingBottom: '3px',
            }}
        >
            {item.name}
        </li>
    ))}
</ul>

                    </div>
                </div>
                <div className="col-3">
                    <div className="d-flex justify-content-center flex-row gap-3">
                        <button className="btn" style={{ borderRadius: '50px', height: '43px', width: '150px', backgroundColor: '#D9D9D9', marginTop: '40px' }}  onClick={()=>window.location.href='/register'}>Register</button>
                        <button className="btn" style={{ borderRadius: '50px', height: '43px', width: '150px', backgroundColor: '#D9D9D9', marginTop: '40px' }} data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
                        
                       
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default LPHeader;
