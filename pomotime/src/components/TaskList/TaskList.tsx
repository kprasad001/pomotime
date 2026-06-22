import { useState, useEffect } from 'react';
import './TaskList.css'
import type { Task } from '../../types';
import TaskItem from '../TaskItem/TaskItem';
import TaskForm from '../TaskForm/TaskForm';
import { loadTasks, saveTasks } from '../../utils/storage';

const STORAGE_KEY = 'pomodoro-tasks';
const FADE_DURATION = 400; // ms — must match the CSS transition duration

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(() =>
    loadTasks<Task[]>(STORAGE_KEY, [])
  );
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    saveTasks(STORAGE_KEY, tasks);
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      pomodorosSpent: 0,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setRemovingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

    // Mark as removing so the CSS fade kicks in, then actually remove
    setRemovingIds((prev) => new Set(prev).add(id));
    setTimeout(() => removeTask(id), FADE_DURATION);
  };

  return (
    <section className="TaskList">
      <fieldset className="ow-quest-check">
        <legend className="ow-quest-check__legend">Daily Tasks for Ari</legend>

        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            removing={removingIds.has(task.id)}
            onToggle={toggleTask}
            onRemove={(id) => {
              setRemovingIds((prev) => new Set(prev).add(id));
              setTimeout(() => removeTask(id), FADE_DURATION);
            }}
          />
        ))}

        <TaskForm onAdd={addTask} />
      </fieldset>
    </section>
  );
}

export default TaskList;