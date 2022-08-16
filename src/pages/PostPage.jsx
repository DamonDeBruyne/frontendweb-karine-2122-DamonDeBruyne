import PostList from "../components/PostList"
import AddPostForm from "../components/AddPostForm"
import { useParams } from "react-router"
import { useContext } from "react";
import { GroupsContext } from "../contexts/GroupsProvider";



export default function PostPage(){
  const {groupsId} = useParams();
  const {groups}= useContext(GroupsContext);
  const groupName = groups.filter(group=>group.id===groupsId).map(group=>group.name);
  return(
    <div className="Border">
      <h1 className="my-2">{groupName}</h1>

      <h1>Posts</h1>
        <PostList groupsId={groupsId}/>

      <h1>New Post</h1>
        <AddPostForm group_id={groupsId} />
      </div>
  )
}