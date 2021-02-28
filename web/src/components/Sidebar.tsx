import styles from '../styles/components/Sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <img src="/logo_blue.svg" alt="logo"/>

      <div className={styles.options}>
        <button disabled>
          <img src="/icons/home.svg" alt="home"/>
        </button>
        <button>
          <img src="/icons/award.svg" alt="award"/>
        </button>
      </div>

      <button>
        <img src="/icons/logout.svg" alt="logout"/>
      </button>
    </div>
  )
}