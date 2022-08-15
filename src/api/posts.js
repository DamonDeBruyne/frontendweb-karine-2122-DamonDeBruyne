import { axios } from '.';

export const getAllPostsByGroupId= async(groupsId)=>{
  const {data}=await axios.get(`posts/${groupsId ?? ''}`);
  return data;
};

export const savePost=async({
      id,
      user_id,
      groups_id,
      description,
      post_date,
})=>{
  const { data } = await axios({
		method: id ? 'put' : 'post',
		url: `posts/${id ?? ''}`,
		data: {
			user_id,
      groups_id,
      description,
      post_date,
		},
	});
	return data;
};

export const deletePost=async(id)=>{
  await axios.delete(`posts/${id}`);
};