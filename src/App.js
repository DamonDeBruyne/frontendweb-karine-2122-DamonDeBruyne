import { useState } from 'react';
import './App.css';
import Groups from './components/groups';
import { GROUPS_DATA } from './mock-data';



function App() {
  const [groups,setGroups] = useState(GROUPS_DATA);
 


  return (
    <div className='GroupList'>
      <h1>Social media app</h1>
      <Groups groups={groups}/>
      <button type='button' onclick> Create new Group</button>
    </div>
  );
}

export default App;
