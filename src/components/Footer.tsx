import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      Built by{" "}
      <a href="https://x.com/uixmat" target="_blank">
        uixmat
      </a>
    </div>
  );
}
