import './App.css';
import UserList from './components/UserList';
import { SnackbarProvider } from 'notistack';

function App() {

  return (
    <SnackbarProvider maxSnack={3}>
      <UserList />
    </SnackbarProvider>
  )
}

export default App
