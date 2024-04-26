import React, { useState } from 'react'
import styles from './Navbar.module.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export default function Navbar() {
    const [modalOpen, setModalOpen] = useState(false);
    const userObj = localStorage.getItem('user');
    const user = JSON.parse(userObj)
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <div className={styles.left}>
                    <span className={styles.title}>KEAM MOCK TEST</span>
                </div>
                <div className={styles.right}>
                    <div className={styles.item}>
                        <span className={styles.welcome}>👋Welcome, {user?.firstName + " " + user?.lastName} </span>
                    </div>
                    <div className={styles.item}>
                        <button onClick={() => {
                            setModalOpen(!modalOpen);
                        }} className={styles.logout}>Logout</button>
                    </div>
                </div>
            </div>
            {modalOpen &&
                <div className={styles.modalOverlay}>
                    <div className={styles.box}>
                        <div className={styles.modalRow}>
                            <span className={styles.que}>Are you sure you want to logout ?</span>
                        </div>
                        <div className={styles.modalRow}>
                            <button className={styles.cancel} onClick={() => {
                                setModalOpen(false)
                            }}>Cancel</button>
                            <button className={styles.logout} onClick={() => {
                                localStorage.clear();
                                toast.success("Logout successful. Redirecting to login page");
                                setTimeout(() => {
                                    navigate('/login')
                                }, 1000);
                            }}>Confirm</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
