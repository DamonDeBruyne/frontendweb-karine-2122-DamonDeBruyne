import { useForm } from "react-hook-form";


export default function AddPostForm( {groups_id,onSavePost = (f)=>f }){
  const {register,handleSubmit,formState:{errors},reset} = useForm();

  const onSubmit=(data)=>{
    console.log(JSON.stringify(data));
    const {name,description,groups_id}=data;
    onSavePost(name,description,groups_id);
    reset();
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)} className='m-5'>
    <div className='grid grid-cols-6 gap-6'>
      <div className='col-span-6 sm:col-span-3'>
        <label htmlFor='user'>user</label>
        <input  
        type='text' 
        placeholder='name' 
        id='user' 
        {...register('name',
        {required:'name is required'})} />
         {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
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