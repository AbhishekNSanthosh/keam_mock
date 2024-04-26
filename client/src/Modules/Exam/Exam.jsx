import React, { useEffect, useState } from 'react';
import styles from './Exam.module.css';
import { useNavigate } from 'react-router-dom';
import { getRandomQuestions } from './services/api';

export default function Exam() {
  const [time, setTime] = useState(5 * 60);
  const [ques, setQues] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(interval);
          handleBeforeUnload();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time === 0) {
      localStorage.setItem("status", "completed");
      navigate('/dashboard/home');
    }
  }, [time, navigate]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    const message =
      "Are you sure you want to leave? All provided data will be lost.";
    e.returnValue = message;
    return message;
  };


  useEffect(() => {
    getRandomQuestions(setQues)
  }, [])

  const handleOptionSelect = (questionId, selectedValue) => {
    const updatedOptions = [...selectedOptions];
    const index = updatedOptions.findIndex(option => option._id === questionId);
    if (index !== -1) {
      updatedOptions[index].selectedValue = selectedValue;
    } else {
      updatedOptions.push({ _id: questionId, selectedValue });
    }
    setSelectedOptions(updatedOptions);
  };

  console.log(selectedOptions)

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>

        <div className={styles.questionRow}>
          {ques?.map((que, index) => (
            <div key={index} className={styles.queWrapCover}>
              <div className={styles.queWrap}>
                <div className={styles.queLeft}>
                  <span className={styles.index}>{index + 1}.</span>
                </div>
                <div className={styles.queRight}>
                  <div className={styles.chooseitem}>
                    <span className={styles.label} dangerouslySetInnerHTML={{ __html: que?.question }}></span>
                  </div>

                  <div className={styles.optionRow}>
                    {['a', 'b', 'c', 'd', 'e'].map((option, optionIndex) => (
                      <div key={optionIndex} className={styles.radioItem}>
                        <input
                          type="radio"
                          name={que._id}
                          value={que[option]}
                          className={styles.radio}
                          onChange={() => handleOptionSelect(que._id, que[option])}
                        />
                        <span className={styles.optionName} dangerouslySetInnerHTML={{ __html: `${option}) ${que[option]}` }}></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.hr}></div>
            </div>
          ))}
        </div>

      </div>
      <div className={styles.timer}>
        {formatTime(time)}
      </div>
    </div>
  )
}
