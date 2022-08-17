
import {React} from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useGroups } from "../contexts/GroupsProvider";
import { Link } from "react-router-dom";
import { useSession } from "../contexts/AuthProvider";


const Group = ({ id,name,remove }) => {
  const { hasRole } = useSession();
  return (
      <div data-cy="group" class="cursor-pointer flex flex-row space-x-4 my-2">
        <Link data-cy="group_name" to={`posts/${id}`}> {name}</Link>
        {hasRole('admin')?
        <AiOutlineDelete data-cy="group_remove_btn" onClick={remove}/>
        :""}  
      </div>
  );
};

export default function GroupsList( ) {
  const {groups,loading,error,deleteGroup} = useGroups();
  
  
  

  if (loading) return <h1 data-cy="loading">Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  if (!groups) return <span className="flex-1">There are no groups</span>;

  return (
    <div>
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
