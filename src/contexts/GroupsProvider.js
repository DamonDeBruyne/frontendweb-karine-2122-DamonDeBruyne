import {
  useSession,
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from 'react';
import * as groupsApi from '../api/groups';


export const GroupsContext = createContext();
export const useGroups =()=>useContext(GroupsContext);

export const GroupsProvider=({
  children
})=>{
  const { ready: authReady } = useSession();
    const [currentGroup, setCurrentGroup] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);

    const refreshGroups =useCallback(async () =>{
      try{
        setError();
        setLoading(true);
       const data = await groupsApi.getAllGroups();
        setGroups(data.data);
        return data.data;
      }catch(error){
        setError(error);
      }finally{
        setLoading(false);
      }
    },[]);

    useEffect(()=>{
      if(authReady &&groups?.length === 0) {
        refreshGroups();
      }
    },[authReady ,refreshGroups,groups]);

    const createOrUpdateGroup = useCallback(async ({
      id,
      name,
    }) => {
      setError();
      setLoading(true);
      try {
        const changedGroup = await groupsApi.saveGroup({
          id,
          name
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
       await groupsApi.deleteGroup(id);
        refreshGroups();
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