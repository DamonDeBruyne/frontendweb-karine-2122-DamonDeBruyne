import { POST_DATA } from "../mock-data";
import React from "react";

const Post = ({ id, user, description,postDate,...rest }) => {
  return (
    <div>
      <p>{user.name}     {new Date(postDate).toLocaleDateString('nl-BE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
      <p>{description}</p>
    </div>
  );
};
export default React.memo(function PostList(id) {
  const posts=POST_DATA.filter(groupId=>groupId===id);
   
  return (
    <div>
      {posts
        .map((post,id) => (
          <Post {...post} key={id} />
        ))}
    </div>
  );
});
