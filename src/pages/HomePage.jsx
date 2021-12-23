import GroupsList from "../components/GroupsList";
import { useGroups } from "../contexts/GroupsProvider";


export default function HomePage() {
  const {groups}=useGroups();
  console.log(`groups fetched :${groups}`);
  return(
        <>
          <h1>Groups</h1>

          <GroupsList groups={groups}/>
        </>
  )
};