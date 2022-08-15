
import './App.css';
import { AuthProvider } from './contexts/AuthProvider';
import { GroupsProvider } from './contexts/GroupsProvider';
import {PostsProvider} from './contexts/PostsProvider';

function App() {
  return (
    <AuthProvider>
    <GroupsProvider>
      <PostsProvider>

      </PostsProvider>
    </GroupsProvider>
    </AuthProvider>
    
  );
}

export default App;
