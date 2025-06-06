import styles from "./header.module.css"

export const Header = () => {
  return (
    <div className={styles.headerCont}>
      <div>
        wrapper for padding
        <div>
          left container
          <div>
            greeting container
          </div>
        </div>
        <div>
          Right container
          <div>
            user icon container
          </div>
          <div>
            post controls container
          </div>
        </div>
      </div>
    </div>
  )
}
