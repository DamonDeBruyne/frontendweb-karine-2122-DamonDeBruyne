import PostList from "../components/PostList"
import AddPostForm from "../components/AddPostForm"
import { useParams } from "react-router";


export default function PostPage(){
  const {id}=useParams();
  return(
    <div class = 'border'>
        <PostList groupsId={id}/>
        <AddPostForm groupsId={id} />
      </div>
  )
}