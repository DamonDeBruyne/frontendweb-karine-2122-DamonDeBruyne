
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { GroupsContext } from "../contexts/GroupsProvider";


export default function AddGroupForm( ){
  const {register,handleSubmit,formState:{errors},reset} = useForm();
  const { createOrUpdateGroup } = useContext(GroupsContext);
  
  const onSubmit=(data)=>{
    const {name}=data;
    createOrUpdateGroup({name});
    reset();
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)} >
      <div >
        <div>
          <label htmlFor='name'>New groupname</label>
          <input
          data-cy="name_input" 
          class="w-80 mb-2"
          type='text' 
          placeholder='name' 
          id='name' 
          {...register('name',
          {required:'name is required',minLength:{value:3,message:'Min length is 3'}})} />
           {errors.name && <p data-cy="error" class="text-red-500">{errors.name.message}</p>}
        </div>
          <div>
            <button data-cy="submit_group" class="ml-0" type='submit'>Save</button>
          </div>
        </div>
    </form>
  );
}