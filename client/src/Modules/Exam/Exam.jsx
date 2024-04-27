import React, { useEffect, useState } from 'react';
import styles from './Exam.module.css';
import { useNavigate } from 'react-router-dom';
import { getRandomQuestions, submitAnswersApi } from './services/api';
import { GridLoader } from 'react-spinners'

export default function Exam() {
  const [time, setTime] = useState(120 * 60);
  const [ques, setQues] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      submitAnswersApi(selectedOptions, navigate);
      console.log("called")
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
    if (localStorage.getItem('status') === "completed") {
      navigate('/dashboard/home')
    }
    getRandomQuestions(setQues, setIsLoading)
  }, [])

  const handleOptionSelect = (questionId, selectedValue) => {
    setSelectedOptions(prevOptions => {
      const updatedOptions = [...prevOptions];
      const index = updatedOptions.findIndex(option => option._id === questionId);
      if (index !== -1) {
        updatedOptions[index].selectedValue = selectedValue;
      } else {
        updatedOptions.push({ _id: questionId, selectedValue });
      }
      return updatedOptions;
    });
    console.log(selectedOptions)
  };


  const handleSubmit = () => {
    submitAnswersApi(selectedOptions, navigate);
  }
  return (
    <>
      {
        isLoading ?
          <div className={styles.wcontainer}>
            <GridLoader color="red" />
          </div>
          :
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

              <div className={styles.bottomRow}>
                <button onClick={() => {
                  setModalOpen(true)
                }} className={styles.submit}>Submit</button>
              </div>

            </div>
            <div className={styles.timer}>
              {formatTime(time)}
            </div>
            {modalOpen &&
              <div className={styles.modalOverlay}>
                <div className={styles.modalBox}>
                  <span className={styles.txt}>Are you sure you want to submit ?</span>
                  <div className={styles.actionRow}>
                    <button className={styles.modalcancel} onClick={(e) => {
                      e.preventDefault();
                      setModalOpen(false);
                    }}>Cancel</button>
                    <button className={styles.modalsubmit} onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}>Submit</button>
                  </div>
                </div>
              </div>
            }
          </div >
      }
    </>
  )
}
