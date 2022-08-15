
import './App.css';
import { AuthProvider } from './contexts/AuthProvider';
import { GroupsProvider } from './contexts/GroupsProvider';
//import {PostsProvider} from './contexts/PostsProvider';
import { Switch, Redirect, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import GroupPage from './pages/GroupPage';
import PostPage from './pages/PostPage'
import Login from './pages/Login';
import { PostsProvider } from './contexts/PostsProvider';

function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <GroupsProvider>
          <Switch>

            <Route path='/' exact>
              <Redirect to='/groups'/>
            </Route>

            <PrivateRoute path="/groups" exact>
              <GroupPage/>
            </PrivateRoute>

            <PrivateRoute path="/posts" exact>
              <PostPage/>
            </PrivateRoute>

            <Route path="/login">
              <Login />
            </Route>

          </Switch>
        </GroupsProvider>
      </PostsProvider>
    </AuthProvider> 
  );
}

export default App;
