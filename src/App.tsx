import TodoListPage from './pages/TodoListPage';
import { BrowserRouter, Routes, Route } from 'react-router';
import UserProfilePage from './pages/UserProfilePage';
import AppLayout from './AppLayout';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<TodoListPage />} />
          <Route path='my-profile' element={<UserProfilePage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
