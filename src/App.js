
import './App.css';
import {BrowserRouter as Router,
  Switch,
  Route,
  Redirect} from 'react-router-dom';


import HomePage from './pages/HomePage';
import GroupForm from './pages/GroupForm';
import PostForm from './pages/PostForm';
import PostPage from './pages/PostPage';

import { GroupsProvider } from './contexts/GroupsProvider';
import { PostsProvider } from './contexts/PostsProvider';


function App() {
  return (
    <GroupsProvider>
      <PostsProvider>
      <Router>
        <Switch>
            <Route path="/" exact>
              <Redirect to="/groups" />
            </Route>
            <Route path="/groups" exact>
              <HomePage/>
            </Route>
            <Route path="/groups/add" exact>
              <GroupForm/>
            </Route>
            <Route path="/groups/edit/:id" exact>
              <GroupForm/>
            </Route>
            <Route path="/posts" exact>
              <PostPage/>
              </Route>
            <Route path="/posts/add" exact>
              <PostForm/>
              </Route>
            <Route path="/posts/edit/:id" exact>
              <PostForm/>
            </Route> 
        </Switch>
      </Router>
      </PostsProvider>
    </GroupsProvider>
   
  );
}

export default App;
