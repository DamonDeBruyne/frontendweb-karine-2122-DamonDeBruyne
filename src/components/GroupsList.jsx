
import {React,useContext} from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GroupsContext } from "../contexts/GroupsProvider";
import { Link } from "react-router-dom";

const Group = ({ id,name,remove }) => {
  return (
      <div class="cursor-pointer">
        <Link to='/posts' params={{id:id}}> {name}</Link>
        {/* toevoegen deleteGroup */}
        <AiOutlineDelete onClick={remove}/>
      </div>
  );
};

export default function GroupsList( ) {
  const {loading, groups,error,deleteGroup} = useContext(GroupsContext);

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
              remove={()=>deleteGroup(group.id)}/>
            ))}
      </div>
      
    </div>
  );
};
