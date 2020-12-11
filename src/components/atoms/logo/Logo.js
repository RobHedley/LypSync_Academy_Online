import React, { Fragment } from "react";
import styles from "./Logo.module.scss";
import AcademyLogo from '../../../assets/img/LypSync_Academy_500_Horizontal.png'

const Logo = () => {
  return (
    <Fragment >
      <img className={styles.Logo}
        src={AcademyLogo}
        alt="LypSync Academy Logo"
      />
    </Fragment>
  );
};

export default Logo;
