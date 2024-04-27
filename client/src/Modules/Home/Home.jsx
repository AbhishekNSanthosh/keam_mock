import React from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import gif from '../../assets/Completed.gif'

export default function Home() {
    const navigate = useNavigate();
    const status = localStorage.getItem('status')
    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                {status !== 'completed' &&
                    <div className={styles.row}>
                        <div className={styles.top}>
                            <span className={styles.title}>Instructions</span>
                        </div>
                        <div className={styles.right}>
                            <span className={styles.note}>Each Quesions carries 4 marks</span>
                            <span className={styles.note}>Total Marks: 960</span>
                        </div>
                    </div>
                }
                {status === 'completed' &&
                    <div className={styles.row}>
                        <img src={gif} alt="" className={styles.img} />
                    </div>
                }
                {status === 'completed' &&
                    <div className={styles.row}>
                                                   <span className={styles.greet}>Have a nice day ❤️</span>
                    </div>
                }
                {status !== 'completed' &&
                    <div className={styles.row}>
                        <button disabled={status === 'completed' ? true : false} className={styles.attend} onClick={() => {
                            navigate('/dashboard/exam')
                        }}>{status === 'completed' ? "Attended" : "Attend Exam"}</button>
                    </div>
                }
            </div>
        </div>
    )
}
