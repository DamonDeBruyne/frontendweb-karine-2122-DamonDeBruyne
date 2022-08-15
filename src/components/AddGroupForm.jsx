
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { GroupsContext } from "../contexts/GroupsProvider";

export default function AddGroupForm( ){
  const {register,handleSubmit,formState:{errors},reset} = useForm();
  const { createOrUpdateGroup } = useContext(GroupsContext);
  
  const onSubmit=(data)=>{
    console.log(JSON.stringify(data));
    const {name}=data;
    createOrUpdateGroup({name});
    reset();
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)} className='m-5'>
      <div className='grid grid-cols-6 gap-6'>
        <div className='col-span-6 sm:col-span-3'>
          <label htmlFor='name'>New groupname</label>
          <input 
          type='text' 
          placeholder='name' 
          id='name' 
          {...register('name',
          {required:'name is required',minLength:{value:3,message:'Min length is 3'}})} />
           {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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