import { useContext } from 'react';
import Cookies from 'js-cookie';

import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  const imgPath = Cookies.get('imagePath');
  const username = Cookies.get('username')

  return (
    <div className={styles.profileContainer}>
      <img src={`http://localhost:3333/files/${imgPath}`} alt={`${username}-image`}/>
      <div>
        <strong>{username}</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level {level}
        </p>
      </div>
    </div>
  );
}