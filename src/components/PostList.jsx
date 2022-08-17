import {React,useMemo} from "react";
import {  usePosts } from "../contexts/PostsProvider";
import { useSession } from "../contexts/AuthProvider";
import { AiOutlineDelete } from "react-icons/ai";


const Post = ({ user_name,description, post_date ,remove}) => {
  const { user } = useSession();
  const date = new Date(post_date);
   const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }; 
  return (
    <div class="w-96 my-3">
      <div class="flex ..." >
          <div class="mr-2 min-w-max uppercase">{user_name}</div>
          <div class="flex flex-row min-w-max">{date.toLocaleDateString(undefined, options)} 
          {user.name===user_name?
            <AiOutlineDelete onClick={remove}/>
        :""}</div>
      </div>
      <div class="w-full">{description}</div>
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
  if (!posts) return <span class="flex-1">There are no posts </span>;
  return (
    <div>
      
      {filteredPosts.length===0
      ?<span class="flex-1 ">There are no posts </span>
      :filteredPosts
        .sort((a, b) =>
          a.post_date - b.post_date
        )
        .map((post) => (
          <Post {...post} remove={()=>deletePost(post.id)} />
        ))}
    </div>
  );
}
