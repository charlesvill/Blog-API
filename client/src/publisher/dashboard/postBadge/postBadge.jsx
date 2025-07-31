import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./postBadge.module.css";
import { apiFetch, serverHostName } from "../../../utilities/apiUtils";
import { Authorization } from "../../../utilities/authProvider";
import { confirmDialog } from "../../../utilities/confirm/confirm.jsx";

export const PostBadge = ({
  post,
  dialogOpen,
  setDialogOpen,
  reloadParent,
}) => {
  const { token } = useContext(Authorization);
  const textLength = 150;
  const condensedText = post.content.slice(0, textLength);
  const [published, setPublished] = useState(post.published);
  const visibleSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 -960 960 960"
      width="48"
      onClick={toggleHandler}
      className={styles.projectButton}
    >
      <path d="M480.118-330Q551-330 600.5-379.618q49.5-49.617 49.5-120.5Q650-571 600.382-620.5q-49.617-49.5-120.5-49.5Q409-670 359.5-620.382q-49.5 49.617-49.5 120.5Q310-429 359.618-379.5q49.617 49.5 120.5 49.5Zm-.353-58Q433-388 400.5-420.735q-32.5-32.736-32.5-79.5Q368-547 400.735-579.5q32.736-32.5 79.5-32.5Q527-612 559.5-579.265q32.5 32.736 32.5 79.5Q592-453 559.265-420.5q-32.736 32.5-79.5 32.5ZM480-200q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601-260 702.5-325.5 804-391 857-500q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359-740 257.5-674.5 156-609 102-500q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z" />
    </svg>
  );
  const visibleOffSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000000"
      onClick={toggleHandler}
      className={styles.projectButton}
    >
      <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
    </svg>
  );
  const navigate = useNavigate();

  async function toggleHandler() {
    const publishApiUrl = `${serverHostName()}/posts/${post.id}/publish`;
    const response = await apiFetch(publishApiUrl, token, null, "PUT");

    if (response instanceof Error) {
      return;
    }

    setPublished(response.published);
    console.log("published: ", response.published);
  }

  async function deletePost() {
    const serverDelUrl = `${serverHostName()}/posts/${post.id}`;
    const response = await apiFetch(serverDelUrl, token, null, "DELETE");

    if (response instanceof Error) {
      alert("There was an error deleting post!");
    }
    // deletePostFn(post.id);
    setDialogOpen(false);
    reloadParent(true);
    return;
  }

  async function handleDelete() {
    // show a dialoge box to confirm delete.
    if (dialogOpen) {
      return;
    }

    setDialogOpen(true);

    console.log("something should really be happening rn");
    const result = await confirmDialog({
      message: "Are you sure you would like to delete?",
    });

    if (result) {
      deletePost();
    }
  }

  function handleUpdate() {
    navigate(`/admin/update-post/${post.id}`);
  }

  return (
    <div className={styles.projectContainer}>
      <div className={styles.projectCard}>
        <div className={styles.projectContent}>
          <p>{post.title}</p>
          <p>{condensedText}</p>
        </div>
        <div className={styles.projectButtonCont}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
            className={styles.projectButton}
            onClick={handleUpdate}
          >
            <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
          </svg>
          {published ? visibleSVG : visibleOffSVG}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
            className={styles.projectButton}
            onClick={handleDelete}
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
