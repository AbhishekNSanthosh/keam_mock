import React from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.left}>
          <span className={styles.welcome}>👋Welcome</span>
        </div>
        <div className={styles.right}></div>
      </div>
    </div>
  )
}
