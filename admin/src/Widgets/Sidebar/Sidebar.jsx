import React from 'react'
import styles from './Sidebar.module.css'
import { navItems } from '../../common/constants/constants'
import { useNavigate, useNavigation } from 'react-router-dom'
import axios from 'axios'
export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.row}>
          <span className={styles.logo}>
            KEAM MOCK
          </span>
        </div>
        <div className={styles.box}>
          {navItems?.map((item) => (
            <div key={item?.title} onClick={() => {
              navigate(item?.url)
            }} className={styles.linkBox}>
              <span className={styles.link}>{item?.title}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
