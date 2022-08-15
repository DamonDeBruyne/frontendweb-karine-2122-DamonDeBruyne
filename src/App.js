
import './App.css';
import { AuthProvider } from './contexts/AuthProvider';
import { GroupsProvider } from './contexts/GroupsProvider';
import {PostsProvider} from './contexts/PostsProvider';
import { Switch, Redirect, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import GroupPage from './pages/GroupPage';
import PostPage from './pages/PostPage'
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
    <GroupsProvider>
      <PostsProvider>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/groups'/>
          </Route>
          <PrivateRoute path="/groups" exact>
				    <GroupPage />
			    </PrivateRoute>
          <PrivateRoute path="/posts/:id" exact>
				    <PostPage />
			    </PrivateRoute>
          <Route path="/login">
				    <Login />
			    </Route>
        </Switch>
      </PostsProvider>
    </GroupsProvider>
    </AuthProvider>
    
  );
}

export default App;
