import { useCallback, useRef, useEffect, useState, } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import FormData from 'form-data'

import styles from '../styles/pages/Register.module.css';

interface responseData {
  challengesCompleted: number;
  currentExperience: number;
  level: number;
  id: number;
  imagePath: string;
  username: string;
}

import api from '../services/api';
import ValidationErrorModal from '../components/ValidationErrorModal';

export default function Login() {
  const [isModalActive, setIsModalActive] = useState(false);

  const formRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const checkUserLoggedIn = Cookies.get('userId');

    if (checkUserLoggedIn) {
      router.push('/');
    }
  }, []);

  const handleRegister = useCallback(async () => {
    if (!formRef.current[0].value 
        || !formRef.current[1].value 
        || !formRef.current[2].files[0]
    ) {
      return;
    }
    
    const formData = new FormData(formRef.current);

    try {
      const response = await api.post('users', formData);
      const data = response.data as responseData;

      Cookies.set('level', String(data.level));
      Cookies.set('currentExperience', String(data.currentExperience));
      Cookies.set('challengesCompleted', String(data.challengesCompleted));
      Cookies.set('userId', String(data.id));
      Cookies.set('imagePath', data.imagePath);
      Cookies.set('username', data.username);
    } catch (error) {
      return setIsModalActive(true);
    }

    router.push('/');
  }, [formRef]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cadastro | move.it</title>
      </Head>

      <img src="/Simbolo.svg" alt="logo"/>
      <div className={styles.loginContainer}>
        <img src="/logoWhite-full.svg" alt=""/>

        <div className={styles.textContainer}>
          <strong>Cadastre-se</strong>
          <p>Informe um nome de usuário e senha</p>
        </div>

        <form className={styles.inputContainer} ref={formRef}>
          <input 
            type="text" 
            placeholder="Nome de usuário"
            name="username"
          />
          <input
            type="text" 
            placeholder="Senha"
            name="password"
          />
          <div className={styles.imageInput}>
            <label htmlFor="images">Selecionar imagem de perfil</label>
            <input type="file" name="image" id="images" />
          </div>
          
          <button type="button" onClick={handleRegister}>
            Cadastrar
          </button>
        </form>

        <Link href="/login">
          <a>
            <img src="/icons/arrow_right.svg" alt="criar conta"/>
            Voltar para o login
          </a>
        </Link>
      </div>

      { isModalActive && 
        <ValidationErrorModal setModal={setIsModalActive} page="register" /> 
      }
    </div>
  );
}