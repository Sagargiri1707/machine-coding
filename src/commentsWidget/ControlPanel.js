import { useRef, useState } from "react";

function editCommentGlobally(state, editedComment) {
  for (let i = 0; i < state.length; i++) {
    if (state[i].id === editedComment.id) {
      state[i].comment = editedComment.comment;
    }
    if (state[i].children.length > 0) {
      state[i].children = editCommentGlobally(state[i].children, editedComment);
    }
  }

  return state;
}

function deleteCommentGlobally(state, id) {
  for (let i = 0; i < state.length; i++) {
    if (state[i].id === id) {
      state.splice(i, 1);
      break;
    }
    if (state[i].children.length > 0) {
      state[i].children = deleteCommentGlobally(state[i].children, id);
    }
  }

  return state;
}

function replyCommentGlobally(state, newComment) {
  for (let i = 0; i < state.length; i++) {
    if (state[i].id === newComment.parentId) {
      state[i].children.push(newComment);
    }
    if (state[i].children.length > 0) {
      state[i].children = replyCommentGlobally(state[i].children, newComment);
    }
  }
  return state;
}
function ControlPanel({
  comment,
  comments,
  setComments,
  edit,
  deleteComm,
  reply,
}) {
  const [isEditable, setIsEditable] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const replyInputRef = useRef(null);
  const [newComment, setNewComment] = useState(comment.comment);
  function editButton() {
    setIsEditable(!isEditable);
  }
  function handleEditComment(e) {
    setNewComment(e.target.value);
  }

  function editComment() {
    setIsEditable(!isEditable);
    setComments(
      editCommentGlobally([...comments], { ...comment, comment: newComment })
    );
  }
  function deleteComment() {
    setComments(deleteCommentGlobally([...comments], comment.id));
  }

  function replyToComment() {
    setIsReplying(!isReplying);
  }
  function submitReply() {
    setIsReplying(!isReplying);
    const reply = replyInputRef.current.value;
    setComments(
      replyCommentGlobally([...comments], {
        comment: reply,
        id: Math.random(),
        parentId: comment.id,
        children: [],
        depth: comment.depth + 1,
      })
    );
    replyInputRef.current.value = "";
  }
  return (
    <div style={{ paddingLeft: `${comment.depth * 20}px`, marginTop: "10px" }}>
      <div style={{ display: "flex" }}>
        {!isEditable ? (
          <span>{comment.comment}</span>
        ) : (
          <input
            value={newComment}
            onBlur={editComment}
            onChange={handleEditComment}
          />
        )}

        {edit && (
          <button type="button" onClick={editButton}>
            Edit
          </button>
        )}

        {deleteComm && (
          <button
            style={{ marginLeft: "6px" }}
            type="button"
            onClick={deleteComment}
          >
            delete
          </button>
        )}
        {isReplying && (
          <input
            style={{ marginLeft: "6px" }}
            onBlur={submitReply}
            ref={replyInputRef}
          />
        )}
        {reply && (
          <button
            style={{ marginLeft: "6px" }}
            type="button"
            onClick={replyToComment}
          >
            Reply
          </button>
        )}
      </div>
      {comment.children.map((replies) => {
        return (
          <ControlPanel
            key={replies.id}
            comment={replies}
            setComments={setComments}
            edit={true}
            deleteComm={true}
            reply={true}
            comments={comments}
          />
        );
      })}
    </div>
  );
}

export default ControlPanel;
