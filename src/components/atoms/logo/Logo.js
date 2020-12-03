import React, { Fragment } from "react";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <Fragment >
      <img className={styles.Logo}
        src="../../../assets/img/LypSync_Academy_500_Horizontal.png"
        alt="LypSync Academy Logo"
      />
    </Fragment>
  );
};

export default Logo;
