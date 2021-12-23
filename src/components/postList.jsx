
import React, { useContext } from "react";
import { PostsContext } from "../contexts/PostsProvider";

const Post = ({ id, user, description,postDate,...rest }) => {
  return (
    <div>
      <p>{user.name}     {new Date(postDate).toLocaleDateString('nl-BE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
      <p>{description}</p>
    </div>
  );
};
export default React.memo(function PostList(id) {
  const {posts}=useContext(PostsContext);
   
  return (
    <div>
      {posts
        .map((post,id) => (
          <Post {...post} key={id} />
        ))}
    </div>
  );
});
