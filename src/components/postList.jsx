import {React,useMemo} from "react";
import {  usePosts } from "../contexts/PostsProvider";
import { useSession } from "../contexts/AuthProvider";
import { AiOutlineDelete } from "react-icons/ai";


const Post = ({ user_name,description, post_date ,remove}) => {
  const { user } = useSession();
 /*  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }; */
  return (
    <div className="border">
      <table>
        <tr>
          <td>{user_name}</td>
          {/* <td>{post_date.toLocaleDateString(undefined, options)}</td> */}
          <td>{post_date}</td>
          {user.name===user_name?
            <AiOutlineDelete onClick={remove}/>
        :""}
        </tr>
        <tr aria-rowspan={2}>{description}</tr>
      </table>
    </div>
  );
};

export default function PostList({groupsId}) {
  const {loading, posts,error,deletePost} = usePosts();
  
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      return post.group_id===groupsId;
    });
  }, [posts, groupsId]);

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
          <Post {...post} remove={()=>deletePost(post.id)} />
        ))}
    </div>
  );
}
