
import {React,useContext,useState} from "react";
import { POST_DATA } from "../mock-data";
import AddGroupForm from "./AddGroupForm";
import AddPostForm from "./AddPostForm";
import PostList from "./PostList";
import { AiOutlineDelete } from "react-icons/ai";
import { GroupsContext } from "../contexts/GroupsProvider";



const Group = ({ name, onSelect,remove }) => {
  return (
      <div class="cursor-pointer">
        <h2  onClick={onSelect}> {name}</h2>
        {/* toevoegen deleteGroup */}
        <AiOutlineDelete onClick={remove}/>
      </div>
  );
};

export default function GroupsList( ) {
  const {loading, groups,error,deleteGroup} = useContext(GroupsContext);
  const [posts, setPosts] = useState(POST_DATA);
  const [selectedGroup,setSelectedGroup] = useState('');


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
    console.log(JSON.stringify(newPost))
    setPosts(newPost);
  }


  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  if (!groups) return null;

  return (
    <div class='border'>
      <h1>Groups</h1>
      <div>
        {groups
            .sort((a, b) =>
            a.name.toUpperCase().localeCompare(b.name.toUpperCase())
          )
            .map((group) => (
              <Group {...group} 
              onSelect={()=>setSelectedGroup(group.id)}
              remove={()=>deleteGroup(group.id)}/>
            ))}
        <AddGroupForm/>  
      </div>
      <div class = 'border'>
        <PostList groupsId={selectedGroup}/>
        <AddPostForm groupsId={selectedGroup} onSavePost={createPost}/>
      </div>
    </div>
  );
};
