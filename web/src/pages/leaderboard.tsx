import Head from 'next/head';

import styles from '../styles/pages/Leaderboard.module.css';

import Sidebar from "../components/Sidebar"
import { GetStaticProps } from 'next';
import api from '../services/api';

interface LeaderboardUsers {
  username: string;
  imagePath: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface LeaderboardProps {
  Leaderboard: LeaderboardUsers[];
}

export default function leaderboard({ Leaderboard }: LeaderboardProps) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Leaderboard | move.it</title>
      </Head>

      <Sidebar page="leaderboard" />

      <div className={styles.leaderboard}>
        <strong>Leaderboard</strong>

        <section className={styles.info}>
          <p>POSIÇÃO</p>
          <p>USUÁRIO</p>
          <p>DESAFIOS</p>
          <p>EXPERIÊNCIA</p>
        </section>

        { Leaderboard.map((user, index) => (
          <section className={styles.users}>
            <div className={styles.position}>
              {index + 1}
            </div>

            <div className={styles.userInfo}>

              <div className={styles.user}>
                <img 
                  src={`http://localhost:3333/files/${user.imagePath}`} 
                  alt="user image"
                />

                <div>
                  <strong>{user.username}</strong>
                  <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {user.level}
                  </p>
                </div>
              </div>

              <div className={styles.text}>
                <p>{user.challengesCompleted}</p>
                <p>completados</p>
              </div>
              
              <div className={styles.text}>
                <p>{user.currentExperience}</p>
                <p>xp</p>
              </div>
            </div>
          </section>
        )) }
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('users');
  const Leaderboard = response.data;

  return {
    props: {
      Leaderboard,
    },
    revalidate: 60,
  };
};
