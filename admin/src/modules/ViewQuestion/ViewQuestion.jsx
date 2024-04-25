import React, { useEffect, useState } from 'react'
import styles from './ViewQuestion.module.css'
import { getQuestion } from './services/apis'

export default function ViewQuestion() {
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        getQuestion(setQuestions);
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                {/* <div className={styles.row}>title</div> */}
                <div className={styles.box}>
                    {questions?.map((que, index) => (
                        <div className={styles.queRow} key={index}>
                            <div className={styles.top}>
                                <div className={styles.left}>{index + 1}.{" "}</div>
                                <div className={styles.right} dangerouslySetInnerHTML={{ __html: que?.question }}></div>
                            </div>
                            <div className={styles.botom}>
                                <div className={styles.cover}>
                                    a)  <div className={styles.ans} dangerouslySetInnerHTML={{ __html: que?.a }}></div>
                                </div>
                                <div className={styles.cover}>
                                    b)  <div className={styles.ans} dangerouslySetInnerHTML={{ __html: que?.b }}></div>
                                </div>
                                <div className={styles.cover}>
                                    c)  <div className={styles.ans} dangerouslySetInnerHTML={{ __html: que?.c }}></div>
                                </div>
                                <div className={styles.cover}>
                                    d)  <div className={styles.ans} dangerouslySetInnerHTML={{ __html: que?.d }}></div>
                                </div>
                                <div className={styles.cover}>
                                    e)  <div className={styles.ans} dangerouslySetInnerHTML={{ __html: que?.e }}></div>
                                </div>
                                <div className={styles.cover}>
                                    Correct)  <div className={styles.ans} dangerouslySetInnerHTML={{ __html: que?.correct }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
