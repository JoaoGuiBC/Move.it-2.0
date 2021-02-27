import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/pages/Register.module.css';

export default function Login() {
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

        <div className={styles.inputContainer}>
          <input type="text" placeholder="Nome de usuário"/>
          <input type="text" placeholder="Senha"/>
          
          <button type="button">
            Cadastrar
          </button>
        </div>

        <Link href="/login">
          <a>
            <img src="/icons/arrow_right.svg" alt="criar conta"/>
            Voltar para o login
          </a>
        </Link>
      </div>
    </div>
  );
}