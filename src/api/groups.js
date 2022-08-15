import { axios } from '.'; 

export const getAllGroups= async()=>{
  const {data}=await axios.get(`groups`);
  return data;
};

export const saveGroup=async({
  id,
  name
})=>{
  const { data } = await axios({
		method: id ? 'put' : 'post',
		url: `groups/${id ?? ''}`,
		data: {
			name
		},
	});
	return data;
};

export const deleteGroup=async(id)=>{
  await axios.delete(`groups/${id}`);
};