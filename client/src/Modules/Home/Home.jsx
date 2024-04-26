import React from 'react'
import styles from './Home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <div className={styles.row}>
                    <button className={styles.attend}>Attend Exam</button>
                </div>
            </div>
        </div>
    )
}
