import GroupsList from '../components/GroupsList';
import AddGroupForm from '../components/AddGroupForm';

export default function GroupPage(){
  console.log("on GroupsPage");
  return(
    <div className="border">
      <GroupsList/>
      <AddGroupForm/>
    </div>
  )
}