import GroupsList from '../components/GroupsList';
import AddGroupForm from '../components/AddGroupForm';

export default function GroupPage(){
  return(
    <div className="border">
      <h1>Groups</h1>
      <GroupsList/>
      <h1>New Group</h1>
      <AddGroupForm/>
    </div>
  )
}