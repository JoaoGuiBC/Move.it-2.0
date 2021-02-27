import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import styles from '../styles/pages/Login.module.css';

interface responseData {
  challengesCompleted: number;
  currentExperience: number;
  level: number;
  id: number;
  imagePath: string;
  username: string;
}

import api from '../services/api';
import { useCallback, useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLogin = useCallback(async () => {
    const response = await api.post('users/login', { username, password });
    const data = response.data as responseData;
    console.log(data);

    Cookies.set('level', String(data.level));
    Cookies.set('currentExperience', String(data.currentExperience));
    Cookies.set('challengesCompleted', String(data.challengesCompleted));
    Cookies.set('userId', String(data.id));
    Cookies.set('imagePath', data.imagePath);
    Cookies.set('username', data.username);

    router.push('/');
  }, [username, password]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | move.it</title>
      </Head>

      <img src="/Simbolo.svg" alt="logo"/>
      <div className={styles.loginContainer}>
        <img src="/logoWhite-full.svg" alt=""/>

        <div className={styles.textContainer}>
          <strong>Bem-vindo</strong>
          <p>Faça login na sua conta para começar</p>
        </div>

        <div className={styles.inputContainer}>
          <input 
            type="text" 
            placeholder="Nome de usuário" 
            value={username} 
            onChange={e => setUsername(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Senha" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
          />
          
          <button type="button" onClick={handleLogin}>
            <img src="/icons/arrow_right.svg" alt="icone entrar"/>
          </button>
        </div>

        <Link href="/register">
          <a>
            <img src="/icons/create_account.svg" alt="criar conta"/>
            Criar sua conta
          </a>
        </Link>
      </div>
    </div>
  );
}