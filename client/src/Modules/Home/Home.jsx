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
                            <span className={styles.note}>Total number of questions: 100.</span>
                            <span className={styles.note}>Total Marks: 400</span>
                            <span className={styles.note}>Marks awarded for correct answer: 4.</span>
                            <span className={styles.note}>Marks deducted for wrong answer: 1.</span>
                            <span className={styles.note}>Exam duration: 120 mins.</span>
                            <span className={styles.note}>Do not hit back button while attending the exam.</span>
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
