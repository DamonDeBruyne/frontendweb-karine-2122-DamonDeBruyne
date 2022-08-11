
import {React,useState} from "react";
import { GROUP_DATA,POST_DATA } from "../mock-data";
import AddGroupForm from "./AddGroupForm";
import AddPostForm from "./AddPostForm";
import PostList from "./PostList";


const Group = ({ name, onSelect }) => {
  return (
      <div class="cursor-pointer">
        <h2  onClick={onSelect}> {name}</h2>
      </div>
  );
};

export default function GroupsList( ) {
  const [groups,setGroups]=useState(GROUP_DATA);
  const [posts, setPosts] = useState(POST_DATA);
  const [selectedGroup,setSelectedGroup] = useState(groups[0].id)
  

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

  const createPost=(user_id,description)=>{
    const post_date = new Date();
    const id='1';
    const newPost =[
      {
      id,
      user_id,
      group_id:selectedGroup,
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
        {groups
            .sort((a, b) =>
            a.name.toUpperCase().localeCompare(b.name.toUpperCase())
          )
            .map((group) => (
              <Group {...group} onSelect={()=>setSelectedGroup(group.id)}/>
            ))}
        <AddGroupForm onSaveGroup={createGroup}/>  
      </div>
      <div class = 'border'>
        <PostList groupsId={selectedGroup}/>
        <AddPostForm groupsId={selectedGroup} onSavePost={createPost}/>
      </div>
    </div>
  );
};
