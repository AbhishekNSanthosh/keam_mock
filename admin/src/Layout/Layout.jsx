import React, { Suspense, useEffect } from 'react'
import styles from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Widgets/Sidebar/Sidebar'
import Navbar from '../Widgets/Navbar/Navbar'

const Layout = () => {
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!token) {
    //         navigate('/');
    //     }
    // }, []);

    return (
        <div className={styles.fullPage}>
            <div className={styles.SideNavBarWrap}>
                <Sidebar />
            </div>
            <div className={styles.rightSide}>
                <Navbar />
                <div className={styles.mainContent}>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default Layout