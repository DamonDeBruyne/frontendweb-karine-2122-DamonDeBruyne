import PostList from "../components/PostList"
import AddPostForm from "../components/AddPostForm"



export default function PostPage(id){
  return(
    <div class = 'border'>
        <PostList groupsId={id}/>
        <AddPostForm groupsId={id} />
      </div>
  )
}