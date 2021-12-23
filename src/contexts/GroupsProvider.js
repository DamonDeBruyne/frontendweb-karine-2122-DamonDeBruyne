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

export const GroupsContext = createContext();
export const useGroups =()=>useContext(GroupsContext);

export const GroupsProvider=({
  children
})=>{

  const [currentGroup, setCurrentGroup] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);

    const refreshGroups =useCallback(async () =>{
      try{
        setError();
        setLoading(true);
        const{
          data
        } = await axios.get(`${config.base_url}groups`);
        setGroups(data.data);
        return data.data;
      }catch(error){
        setError(error);
      }finally{
        setLoading(false);
      }
    },[]);

    useEffect(()=>{
      if(groups?.length === 0) {
        refreshGroups();
      }
    },[refreshGroups,groups]);

    const createOrUpdateGroup = useCallback(async ({
      id,
      name,
    }) => {
      setError();
      setLoading(true);
      let data = {
        name,
      };
      let method = id ? 'put' : 'post';
      let url = `${config.base_url}groups/${id ?? ''}`;
      try {
        const {
          changedGroup
        } = await axios({
          method,
          url,
          data,
        });
        await refreshGroups();
        return changedGroup;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false)
      }
    }, [refreshGroups]);

    const deleteGroup = useCallback(async (id) => {
      setLoading(true);
      setError();
      try {
        const {
          data
        } = await axios({
          method: 'delete',
          url: `${config.base_url}groups/${id}`,
        });
        refreshGroups();
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false)
      }
    }, [refreshGroups]);

    const value = useMemo(() => ({
      currentGroup,
      setCurrentGroup,
      groups,
      error,
      loading,
      deleteGroup,
      createOrUpdateGroup,
    }), [groups, error, loading, setCurrentGroup, deleteGroup, currentGroup, createOrUpdateGroup])
  
    return ( 
      <GroupsContext.Provider value={value}>
        {children}
      </GroupsContext.Provider>
    );
};