import GroupsList from '../components/GroupsList';
import AddGroupForm from '../components/AddGroupForm';
import '../index.css';

export default function GroupPage(){
  return(
    <div class="mx-8" >

      <h1 class="text-xl mx-8 my-8">Groups</h1>
      <GroupsList/>
      
      <hr />

      <h1 class="text-xl mx-8 my-8">New Group</h1>
      <AddGroupForm/>
    </div>
  )
}