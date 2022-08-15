import {React,useMemo} from "react";
import {  usePosts } from "../contexts/PostsProvider";


const Post = ({ user_name,description, post_date }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return (
    <div className="border">
      <table>
        <tr>
          <td>{user_name}</td>
          {/* <td>{post_date.toLocaleDateString(undefined, options)}</td> */}
          <td>{post_date}</td>
        </tr>
        <tr aria-rowspan={2}>{description}</tr>
      </table>
    </div>
  );
};

export default function PostList({groupsId}) {
  const {loading, posts,error} = usePosts();
  console.log(posts);
  
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      return post.group_id===groupsId;
    });
  }, [posts, groupsId]);
  console.log(filteredPosts);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  if (!posts) return <span className="flex-1">There are no posts </span>;
  return (
    <div className="border">
      {filteredPosts
        .sort((a, b) =>
          a.post_date - b.post_date
        )
        .map((post) => (
          <Post {...post} />
        ))}
    </div>
  );
}
