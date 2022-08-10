
import { useState } from "react";


export default function AddGroupForm( {onSaveGroup = (f)=>f }){
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveGroup(name);
    setName('');
  };

  return(
    <form onSubmit={handleSubmit} className='m-5'>
    <div className='grid grid-cols-6 gap-6'>
      <div className='col-span-6 sm:col-span-3'>
        <label htmlFor='name'>New groupname</label>
        <input  type='text' placeholder='name' id='name' value={name} required />
      </div>
    </div>
    <div className='col-span-6 sm:col-span-3'>
      <div className='flex justify-end'>
        <button type='submit'>Save</button>
      </div>
    </div>
  </form>
  );
}