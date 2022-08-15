import PostList from "../components/PostList"
import AddPostForm from "../components/AddPostForm"
import { useParams } from "react-router"



export default function PostPage(){
  const {groupsId} = useParams();
  console.log(groupsId);
  return(
    <div className="Border">
      <h1>Posts</h1>
        <PostList groupsId={groupsId}/>

      <h1>New Post</h1>
        <AddPostForm groupsId={groupsId} />
      </div>
  )
}