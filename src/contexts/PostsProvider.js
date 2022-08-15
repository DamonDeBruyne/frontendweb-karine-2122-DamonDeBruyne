import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from 'react';
import * as postsApi from "../api/posts";
import { useSession } from './AuthProvider';

export const PostsContext = createContext();
export const usePosts =()=>useContext(PostsContext);

export const PostsProvider=({
  children
})=>{
  const { ready: authReady } = useSession();
  const [currentPost, setCurrentPost] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const refreshPosts =useCallback(async () =>{
     
      try{
        setError();
        setLoading(true);
        const data = await postsApi.getAllPosts();
        setPosts(data);
      }catch(error){
        setError(error);
      }finally{
        setLoading(false);
      }
    },[]);

    useEffect(()=>{
      if(authReady && posts?.length === 0) {
        refreshPosts();
      }
    },[authReady,refreshPosts,posts]);

    const createOrUpdatePost = useCallback(async ({
      id,
      user_id,
      description,
      group_id
    }) => {
      setError();
      setLoading(true);
      try {
        const changedPost = await postsApi.savePost({
          id,
          user_id,
          description,
          group_id
        })
        await refreshPosts();
        return changedPost;
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
        await postsApi.deletePost(id);
        refreshPosts();
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