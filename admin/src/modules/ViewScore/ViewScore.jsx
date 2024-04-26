import React, { useEffect, useState } from 'react'
import styles from './ViewScore.module.css'
import { winners } from './services/api'

export default function ViewScore() {
    const [winner, setWinner] = useState([]);
    useEffect(() => {
        winners(setWinner)
        console.log(winner)
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <div className={styles.title}>
                    KEAM SCORE
                </div>
                <div className={styles.row}>
                    {winner?.map((win,index) => (
                        <div className={styles.box} key={index}>
                            {index+1}.
                            <span className={styles.name}>{win?.firstName}{" "}{win?.lastName}</span>
                            <span className={styles.name}>{win?.college}</span>
                            <span className={styles.name}>{win?.email}</span>
                            <span className={styles.name}>{win?.mobileNo}</span>
                            <span className={styles.name}>Score: {win?.keamScore}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
