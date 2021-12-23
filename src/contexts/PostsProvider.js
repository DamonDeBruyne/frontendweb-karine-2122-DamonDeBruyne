import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from 'react';
import axios from 'axios';
import config from '../config.json';
import { GroupsProvider } from './GroupsProvider';

export const PostsContext = createContext();
export const useGroups =()=>useContext(PostsContext);

export const PostsProvider=({
  children
})=>{

  const [currentPost, setCurrentPost] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const group = GroupsProvider.currentGroup;

    const refreshPosts =useCallback(async () =>{
     
      try{
        setError();
        setLoading(true);
        const{
          data
        } = await axios.get(`${config.base_url}posts?groupId=${group.id}`);
        setPosts(data.data);
        return data.data;
      }catch(error){
        setError(error);
      }finally{
        setLoading(false);
      }
    },[group]);

    useEffect(()=>{
      if(posts?.length === 0) {
        refreshPosts();
      }
    },[refreshPosts,posts]);

    const createOrUpdatePost = useCallback(async ({
      id,
      description,
      group_id
    }) => {
      setError();
      setLoading(true);
      let data;
      let method = id ? 'put' : 'post';
      if (method ==='post') {
         data = {
          description,
          group_id
        };
      } else {
        data={
          description
        };
      }

      let url = `${config.base_url}posts/${id ?? ''}`;
      try {
        const {
          changedpost
        } = await axios({
          method,
          url,
          data,
        });
        await refreshPosts();
        return changedpost;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false)
      }
    }, [refreshPosts]);

    const deletePost = useCallback(async (id) => {
      setLoading(true);
      setError();
      try {
        const {
          data
        } = await axios({
          method: 'delete',
          url: `${config.base_url}posts/${id}`,
        });
        refreshPosts();
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false)
      }
    }, [refreshPosts]);

    const value = useMemo(() => ({
      currentPost,
      setCurrentPost,
      posts,
      error,
      loading,
      deletePost,
      createOrUpdatePost,
    }), [posts, error, loading, setCurrentPost, deletePost, currentPost, createOrUpdatePost])
  
    return ( 
      <PostsContext.Provider value={value}>
        {children}
      </PostsContext.Provider>
    );
};