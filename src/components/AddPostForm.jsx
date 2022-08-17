import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "../contexts/AuthProvider";
import {PostsContext} from '../contexts/PostsProvider';


export default function AddPostForm( { group_id }){
  const {register,handleSubmit,formState:{errors},reset} = useForm();
  const {createOrUpdatePost} = useContext(PostsContext);
  const { user } = useSession();

  const onSubmit=(data)=>{
    const userId = user.id;
    const {description}=data;
    createOrUpdatePost({description,group_id,user_id:userId});
    reset();
  }

  return(
  <form onSubmit={handleSubmit(onSubmit)} >
    <div >
      <div >
        <label htmlFor='description'>Text</label>
        <textarea
        class="rounded-md scroll-smooth w-80 h-48 resize-none"
        placeholder='posttext' 
        id='description' 
        {...register('description',
          {required:'text is required',minLength:{value:5,message:'Min length is 5'}})} />
           {errors.description && <p class="text-red-500">{errors.description.message}</p>}
      </div>
      <div>
        <button class="ml-0" type='submit'>Save</button>
      </div> 
    </div>
  </form>
  );
}