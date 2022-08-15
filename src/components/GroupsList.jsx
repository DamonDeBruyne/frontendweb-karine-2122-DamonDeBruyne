
import {React} from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useGroups } from "../contexts/GroupsProvider";
import { Link } from "react-router-dom";
import { useSession } from "../contexts/AuthProvider";


const Group = ({ id,name,remove }) => {
  const { hasRole } = useSession();
  return (
      <div class="cursor-pointer">
        <Link to={`posts/${id}`}> {name}</Link>
        {hasRole('admin')?
        <AiOutlineDelete onClick={remove}/>
        :""}  
      </div>
  );
};

export default function GroupsList( ) {
  const {groups,loading,error,deleteGroup} = useGroups();
  
  
  

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  if (!groups) return <span className="flex-1">There are no groups</span>;

  return (
    <div className='border'>
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
