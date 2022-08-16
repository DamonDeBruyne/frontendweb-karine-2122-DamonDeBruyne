import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "../contexts/AuthProvider";
import {PostsContext} from '../contexts/PostsProvider';


export default function AddPostForm( { group_id }){
  const {register,handleSubmit,formState:{errors},reset} = useForm();
  const {createOrUpdatePost} = useContext(PostsContext);
  const { user } = useSession();

  const onSubmit=(data)=>{
    console.log(user);
    const userId = user.id;
    console.log(userId);
    //controle tekst van de post
    const {description}=data;
    createOrUpdatePost({description,group_id,user_id:userId});
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