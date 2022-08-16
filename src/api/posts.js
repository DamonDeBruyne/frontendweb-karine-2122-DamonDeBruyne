import { axios } from '.';


export const getAllPosts= async()=>{
  const {data}=await axios.get(`posts`);
  return data;
};

export const savePost=async({
      id,
      groups_id,
      description,
      user_id
})=>{
  const { data } = await axios({
		method: id ? 'put' : 'post',
		url: `posts/${id ?? ''}`,
		data: {
      groups_id,
      description,
      user_id
		},
	});
	return data;
};

export const deletePost=async(id)=>{
  await axios.delete(`posts/${id}`);
};