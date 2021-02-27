import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/pages/Login.module.css';

export default function Login() {
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
          <input type="text" placeholder="Nome de usuário"/>
          <input type="text" placeholder="Senha"/>
          
          <button type="button">
            <img src="/icons/arrow_right.svg" alt="icone entrar"/>
          </button>
        </div>

        <Link href="/cadastro">
          <a>
            <img src="/icons/create_account.svg" alt="criar conta"/>
            Criar sua conta
          </a>
        </Link>
      </div>
    </div>
  );
}