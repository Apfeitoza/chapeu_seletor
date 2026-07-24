import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>  
    <p className={styles.footerContent}>All characters and elements © & TM Warner Bros. Entertainment Inc. Publishing Rights © J.K. Rowling.</p>
    <p className={styles.footerContent}>Designed and Developed by Apfeitoza</p>
    </div>
  )
}

export default Footer