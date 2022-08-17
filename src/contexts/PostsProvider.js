import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from 'react';
import * as postsApi from "../api/posts";
import * as badWordsApi from "../api/badWords";
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
      if(authReady) {
        refreshPosts();

      }
    },[authReady,refreshPosts]);

    const validateText = useCallback(async(text)=>{
      setError();
      setLoading(true);
      try {
        const data = await badWordsApi.validateText({text
        })
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false)
      }
    },[]);

    const createOrUpdatePost = useCallback(async ({
      id,
      description,
      group_id,
      user_id
    }) => {
      setError();
      setLoading(true);
      try {
        //controle text op bad words
        const response = await validateText(description);
        console.log(response);
        const {bad_words_total,censored_content,content} = response;
        const replacedcontent = censored_content.replace(/{/g,'*');
        console.log(bad_words_total,censored_content,replacedcontent,content)
        const changedPost = await postsApi.savePost({
          id,
          description:bad_words_total>0?replacedcontent:content,
          group_id,
          user_id
        })
        await refreshPosts();
        return changedPost;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false)
      }
    }, [refreshPosts,validateText]);

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