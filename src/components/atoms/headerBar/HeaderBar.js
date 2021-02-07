import React from 'react'
import classNames from 'classnames'
import Logo from '../logo/Logo'
import styles from './HeaderBar.module.scss'
import {
  NavLink
} from "react-router-dom";
import SignOut from '../signOut/SignOut'

const HeaderBar = () => {

  const classes = classNames(
    styles.container
  )

  return (
    <div className={classes}>
      <div className={styles.grid3Fade}></div>
      <div className={styles.content}>
        <Logo/>
        <nav>
          <ul className={styles.header}>
            <li>
              <NavLink to="/" activeClassName={styles.selected} exact>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/myCourses" activeClassName={styles.selected}>My Courses</NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName={styles.selected}>Help Pages</NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName={styles.selected}>Admin</NavLink>
            </li>
          </ul>
          <SignOut />
        </nav>
      </div>
    </div>
  )
}

export default HeaderBar

