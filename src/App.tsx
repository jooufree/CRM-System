import TodoListPage from './pages/TodoListPage';
import { BrowserRouter, Routes, Route } from 'react-router';
import MyProfile from './pages/MyProfile';
import AppLayout from './AppLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<TodoListPage />} />
          <Route path='my-profile' element={<MyProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
