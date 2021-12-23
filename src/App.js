
import './App.css';
import {Switch, Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import { Redirect } from 'react-router/cjs/react-router.min';
//import PostPage from './pages/PostPage';
import { GroupsProvider } from './contexts/GroupsProvider';
import { PostsProvider } from './contexts/PostsProvider';


function App() {
  return (
    <GroupsProvider>
      <PostsProvider>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/groups" />
        </Route>
        <Route path="/groups" exact>
          <HomePage/>
         </Route>
        {/* <Route path="/posts" exact>
          <PostPage/>
        </Route> */}
      </Switch>
      </PostsProvider>
    </GroupsProvider>
   
  );
}

export default App;
