import React from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <div className={styles.row}>
                    <button className={styles.attend} onClick={()=>{
                        navigate('/dashboard/exam')
                    }}>Attend Exam</button>
                </div>
            </div>
        </div>
    )
}
