'use client'
import Link from "next/link"
import styles from "./page.module.css"

const page = () => {
  return (
    <div className={styles.page_container}>
      <h1>Arev</h1>
      <div className={styles.login_form}>
        <form className="" action="">
          <h2 className={styles.login_txt}>Login!</h2>
          <p>Please enter your credentials below to continue</p>
          <label htmlFor="">Username</label>
          <input type="text" placeholder="Enter your username" />

          <label htmlFor="">Password</label>
          <input type="password" placeholder="Enter your password" />
          <div className={styles.remeber_me_section}>
            <div className={styles.remeber_me}>
              <input type="checkbox" />
              <span>Remeber me</span>
            </div>
            <Link href="">
              <span className={styles.forget_password}>Forget Password?</span>
            </Link>

          </div>

          <input className={styles.login_btn} type="submit" value="Login" />

        </form>
      </div>
    </div>
  )
}

export default page
