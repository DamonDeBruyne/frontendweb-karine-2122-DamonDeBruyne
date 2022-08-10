import { useState } from "react";


export default function AddPostForm( {groups_id,onSavePost = (f)=>f }){
  const [user_id, setUser] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSavePost(user_id,description,groups_id);
    setUser('');
    setDescription('');
  };

  return(
    <form onSubmit={handleSubmit} className='m-5'>
    <div className='grid grid-cols-6 gap-6'>
      <div className='col-span-6 sm:col-span-3'>
        <label htmlFor='user'>user</label>
        <input  type='text' placeholder='name' id='user' value={user_id} onChange={(e)=>setUser(e.target.value)} required />
      </div>
      <div className='col-span-6 sm:col-span-3'>
        <label htmlFor='description'>Text</label>
        <textarea placeholder='posttext' id='description' value={description} onChange={(e)=>setDescription(e.target.value)} required />
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