import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import exam from '../../../assets/Exams.gif'
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (accessToken) {
      navigate('/dashboard/home')
    }
  }, [])

  const handleSubmit = () => {
    login(email, dob, navigate, setIsLoading, setEmail, setDob);
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.box}>
          <div className={styles.row}>
            <span className={styles.title}>KEAM MOCK TEST</span>
          </div>
          <div className={styles.row}>
            <span className={styles.title}>Login</span>
          </div>
          <div className={styles.row}>
            <input onChange={(e) => {
              setEmail(e.target.value)
            }} value={email} type="text" placeholder='Email' className={styles.inp} />
            <input value={dob} onChange={(e) => {
              setDob(e.target.value)
            }} type="date" placeholder='Date of birth' className={styles.inp} />
          </div>
          <div className={styles.row}>
            <button disabled={isLoading} onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }} className={styles.submit}>{isLoading ? "Please wait..." : "Submit"}</button>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <img src={exam} alt="" className={styles.exam} />
      </div>
    </div>
  )
}
