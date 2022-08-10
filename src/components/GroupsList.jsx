
import {React,useState,useId} from "react";
import { GROUP_DATA,POST_DATA } from "../mock-data";
import AddGroupForm from "./AddGroupForm";
import AddPostForm from "./AddPostForm";
import PostList from "./PostList";


const Group = ({ name,onSelect }) => {
  return (
      <div>
        <h2 onClick={onSelect}> {name}</h2>
      </div>
  );
};

export default function GroupsList( ) {
  const [selectedGroup,setSelectedGroup] = useState(GROUP_DATA[0].id)
  const [groups,setGroups]=useState(GROUP_DATA);
  const [posts, setPosts] = useState(POST_DATA.filter(post=>post.group_id===selectedGroup));

  const createGroup =(name)=>{
    const id='1';
    const newGroup=[
      {
        id,
        name
      },...groups];
      console.log(newGroup);
    setGroups(newGroup);
  }

  const createPost=(user_id,description,group_id)=>{
    const post_date = new Date();
    const id='1';
    const newPost =[
      {
      id,
      user_id,
      group_id,
      description,
      post_date
    },...posts];
    console.log(newPost)
    setPosts(newPost);
  }

  return (
    <div class='border'>
      <h1>Groups</h1>
      <div>
        {groups.map((group) => (
            <Group {...group} onSelect={()=>setSelectedGroup(group.id)}/>
          ))}
        <AddGroupForm onSaveGroup={createGroup}/>  
      </div>
      <div class = 'border'>
        <PostList posts={posts}/>
        <AddPostForm groupsId={selectedGroup} onSavePost={createPost}/>
      </div>
    </div>
  );
};
