import styles from "./commentMapper.module.css"

export function CommentMapper({ comments }) {
  function dateFormat(date) {
    const dateObj = new Date(date);
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const yyyy = dateObj.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  }

  return (
    <section className={styles.commentCollection}>
      <h5>Comments</h5>
      {comments && comments.map(comment => (
        <span key={comment.id}>
          <span className={styles.commentContainer}>
            <span className={styles.content}>{comment.content}</span>
            <span className={styles.metadata}>
              <span className={styles.author}>@{comment.author.username}</span>
              <span className={styles.publishedText}>{
                dateFormat(comment.published_at)
              }</span>
            </span>
          </span>
        </span>)
      )}
    </section>
  )
}
