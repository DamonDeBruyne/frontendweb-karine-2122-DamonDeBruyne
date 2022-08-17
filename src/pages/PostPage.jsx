import PostList from "../components/PostList"
import AddPostForm from "../components/AddPostForm"
import { useParams } from "react-router"
import { useContext } from "react";
import { GroupsContext } from "../contexts/GroupsProvider";
import '../index.css';
import {Link} from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";



export default function PostPage(){
  const {groupsId} = useParams();
  const {groups}= useContext(GroupsContext);
  const groupName = groups.filter(group=>group.id===groupsId).map(group=>group.name);
  return(
    <div class="mx-8">
      <Link  class="flex flex-row" to="/groups"><IoArrowBack/> Go Back </Link>
 
      <h1 class="underline uppercase text-2xl my-3">{groupName}</h1>

      <h1 class="text-xl my-3">Posts</h1>
      <PostList groupsId={groupsId}/>

      <hr/>

      <h1 class="text-xl my-3">New Post</h1>
      <AddPostForm group_id={groupsId} />
    </div>
  )
}