import React from "react";
import { usePostForm } from "./usePostForm";
import { PostFormFields } from "./postFormFields";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../utilities/useFetchData";
import { serverHostName } from "../../utilities/apiUtils";

export function UpdatePostForm() {
  const { postid } = useParams();
  const url = serverHostName() + "/posts/" + postid;
  const { data } = useFetchData(url);
  const { handleInput, handlePost } = usePostForm("PUT", postid, data);
  console.log(data);

  return (
    data && (
      <div>
        <form>
          <PostFormFields fieldData={data} handleInput={handleInput} />
          <button type="submit" onClick={handlePost}>
            Review
          </button>
        </form>
      </div>
    )
  );
}
