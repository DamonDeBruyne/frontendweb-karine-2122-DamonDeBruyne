import {React,useContext} from "react";
import { USER_DATA } from "../mock-data";
import { PostsContext } from "../contexts/PostsProvider";


const Post = ({ user_id, description, post_date }) => {
  const user = USER_DATA.find((user) => user.id === user_id);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return (
    <div class="border">
      <table>
        <tr>
          <td>{user.name}</td>
          <td>{post_date.toLocaleDateString(undefined, options)}</td>
        </tr>
        <tr aria-rowspan={2}>{description}</tr>
      </table>
    </div>
  );
};

export default function PostList({ groupsId }) {
  const {loading, posts,error} = useContext(PostsContext);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  if (!posts) return null;
  return (
    <div class="border">
      <h1>Posts</h1>
      {posts
        .filter(post=>post.group_id===groupsId)
        .sort((a, b) =>
          a.post_date - b.post_date
        )
        .map((post) => (
          <Post {...post} />
        ))}
    </div>
  );
}
