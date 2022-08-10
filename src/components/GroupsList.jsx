
import {React,useState} from "react";
import { GROUP_DATA,POST_DATA } from "../mock-data";
import AddGroupForm from "./AddGroupForm";
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
  const posts = POST_DATA.filter(post=>post.group_id===selectedGroup);

  const createGroup =(name)=>{
    const newGroup=[name];
    setGroups(newGroup);
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
      </div>
    </div>
  );
};
