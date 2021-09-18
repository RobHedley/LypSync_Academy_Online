import React from 'react'
import styles from './Spinner.module.scss'


const Spinner = () => {

  return (
    <div id="ShowLoad" class={styles.loader}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default Spinner

