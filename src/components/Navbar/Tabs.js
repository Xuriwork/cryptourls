import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Tabs = () => {
    const [activeTab, setActiveTab] = useState<string>('/');
    
    return (
        <div className='tabs-container'>
        <ul className='tabs-list'>
            <li onClick={() => setActiveTab('/')} className={activeTab === '/' ? 'active' : ''}>
                <Link to='/'>Lastest</Link>
            </li>
            <li onClick={() => setActiveTab('/highest-voted')} className={activeTab === '/highest-voted' ? 'active' : ''}>
                <Link to='/highest-voted'>Highest voted</Link>
            </li>
            <li onClick={() => setActiveTab('/highest-viewed')} className={activeTab === '/highest-viewed' ? 'active' : ''}>
                <Link to='/highest-viewed'>Highest viewed</Link>
            </li>
            <li onClick={() => setActiveTab('/my-favorites')} className={activeTab === '/my-favorites' ? 'active' : ''}>
                <Link to='/my-favorites'>My Favorites</Link>
            </li>
        </ul>
        </div>
    )
};

export default Tabs;