import React from "react";
// import { usePostForm } from "./usePostForm";
import { PostFormFields } from "./postFormFields";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../utilities/useFetchData";
import { serverHostName } from "../../utilities/apiUtils";

export function UpdatePostForm() {
  const { postid } = useParams();
  const url = serverHostName() + "/posts/" + postid;
  const { data } = useFetchData(url);
  console.log(data);

  return (
    data && (
      <div>
        <form>
          <PostFormFields httpMethod="PUT" id={postid} initData={data}  />
        </form>
      </div>
    )
  );
}
