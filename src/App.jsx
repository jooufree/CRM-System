import { useState, useEffect } from 'react';
import InputArea from './components/InputArea';
import NavList from './components/NavList';
import { BrowserRouter, Routes, Route } from 'react-router';
import ListElements from './components/ListElements';
import { fetchTasks } from './http';

function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [inWorkTasks, setInWorkTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  useEffect(() => {
    async function fetchUserTasks() {
      try {
        const allUserTasks = await fetchTasks('all');
        const inWorkUserTasks = await fetchTasks('inWork');
        const completedUserTasks = await fetchTasks('completed');

        setAllTasks(allUserTasks);
        setInWorkTasks(inWorkUserTasks);
        setCompletedTasks(completedUserTasks);
      } catch (error) {}
    }
    fetchUserTasks();
  }, []);

  return (
    <BrowserRouter>
      <main>
        <InputArea />
        <NavList />
        <Routes>
          <Route path='/' element={<ListElements tasks={allTasks} />} />
          <Route
            path='/process'
            element={<ListElements tasks={inWorkTasks} />}
          />
          <Route
            path='/done'
            element={<ListElements tasks={completedTasks} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
