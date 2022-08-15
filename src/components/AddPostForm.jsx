import { useContext } from "react";
import { useForm } from "react-hook-form";
import {PostsContext} from '../contexts/PostsProvider';


export default function AddPostForm( {groups_id}){
  const {register,handleSubmit,formState:{errors},reset} = useForm();
  const {createOrUpdatePost} = useContext(PostsContext);

  const onSubmit=(data)=>{
    console.log(JSON.stringify(data));
    const {description}=data;
    createOrUpdatePost(description,groups_id);
    reset();
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)} className='m-5'>
    <div className='grid grid-cols-6 gap-6'>
      <div className='col-span-6 sm:col-span-3'>
        <label htmlFor='description'>Text</label>
        <textarea 
        placeholder='posttext' 
        id='description' 
        {...register('description',
          {required:'text is required',minLength:{value:5,message:'Min length is 5'}})} />
           {errors.description && <p className="text-red-500">{errors.description.message}</p>}
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