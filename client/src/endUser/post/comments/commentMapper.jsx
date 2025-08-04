export function CommentMapper({comments}) {
    return (
      <section>
        {comments && comments.map(comment => <span key={comment.id}>{comment.content}</span>)}
      </section>
    )
  }
