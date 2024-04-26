import React from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate();
    const status = localStorage.getItem('status')
    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <div className={styles.row}>
                    <button disabled={status === 'completed' ? true : false} className={styles.attend} onClick={()=>{
                        navigate('/dashboard/exam')
                    }}>{status === 'completed' ? "Attended" :  "Attend Exam"}</button>
                </div>
            </div>
        </div>
    )
}
