import React from 'react';
import { Auth } from 'aws-amplify';

import styles from './SignOut.module.scss'

const SignOut = () => {

    async function logOut() {
        await Auth.signOut().then(window.location.reload())
      }

    return (
        <button className={styles.linkButton} onClick={logOut}>Sign Out</button>
    )
}

export default SignOut