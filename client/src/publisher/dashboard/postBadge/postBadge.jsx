import { useState, useContext } from 'react';
import styles from './postBadge.module.css'
import { LinkButton } from '../../../utilities/linkButton';
import { apiFetch, serverHostName } from '../../../utilities/apiUtils';
import { Authorization } from '../../../utilities/authProvider';


export const PostBadge = ({ post }) => {
  const { token } = useContext(Authorization);
  const textLength = 150;
  const condensedText = post.content.slice(0, textLength);
  const [published, setPublished] = useState(post.published);

  async function toggleHandler() {
    const publishApiUrl = `${serverHostName()}/posts/${post.id}/publish`;
    const response = await apiFetch(publishApiUrl, token, null, "PUT");

    if (response instanceof Error || !response.published) {
      return;
    }

    setPublished(response.published);
    console.log("published: ", response.published);
  }

  return (
    <div className={styles.projectContainer}>
      <div className={styles.projectCard}>
        <div className={styles.projectContent}>
          <p>{post.title}</p>
          <p >{condensedText}</p>
        </div>
        <div className={styles.projectButtonCont}>
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m323-205 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-355Z" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M480.118-330Q551-330 600.5-379.618q49.5-49.617 49.5-120.5Q650-571 600.382-620.5q-49.617-49.5-120.5-49.5Q409-670 359.5-620.382q-49.5 49.617-49.5 120.5Q310-429 359.618-379.5q49.617 49.5 120.5 49.5Zm-.353-58Q433-388 400.5-420.735q-32.5-32.736-32.5-79.5Q368-547 400.735-579.5q32.736-32.5 79.5-32.5Q527-612 559.5-579.265q32.5 32.736 32.5 79.5Q592-453 559.265-420.5q-32.736 32.5-79.5 32.5ZM480-200q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601-260 702.5-325.5 804-391 857-500q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359-740 257.5-674.5 156-609 102-500q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z" onClick={toggleHandler} className={styles.projectButton} /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M727-80q-47.5 0-80.75-33.346Q613-146.693 613-194.331q0-6.669 1.5-16.312T619-228L316-404q-15 17-37 27.5T234-366q-47.5 0-80.75-33.25T120-480q0-47.5 33.25-80.75T234-594q23 0 44 9t38 26l303-174q-3-7.071-4.5-15.911Q613-757.75 613-766q0-47.5 33.25-80.75T727-880q47.5 0 80.75 33.25T841-766q0 47.5-33.25 80.75T727-652q-23.354 0-44.677-7.5T646-684L343-516q2 8 3.5 18.5t1.5 17.741q0 7.242-1.5 15Q345-457 343-449l303 172q15-14 35-22.5t46-8.5q47.5 0 80.75 33.25T841-194q0 47.5-33.25 80.75T727-80Zm.035-632Q750-712 765.5-727.535q15.5-15.535 15.5-38.5T765.465-804.5q-15.535-15.5-38.5-15.5T688.5-804.465q-15.5 15.535-15.5 38.5t15.535 38.465q15.535 15.5 38.5 15.5Zm-493 286Q257-426 272.5-441.535q15.5-15.535 15.5-38.5T272.465-518.5q-15.535-15.5-38.5-15.5T195.5-518.465q-15.5 15.535-15.5 38.5t15.535 38.465q15.535 15.5 38.5 15.5Zm493 286Q750-140 765.5-155.535q15.5-15.535 15.5-38.5T765.465-232.5q-15.535-15.5-38.5-15.5T688.5-232.465q-15.5 15.535-15.5 38.5t15.535 38.465q15.535 15.5 38.5 15.5ZM727-766ZM234-480Zm493 286Z" /></svg>
        </div>
      </div>
    </div>
  )
}

