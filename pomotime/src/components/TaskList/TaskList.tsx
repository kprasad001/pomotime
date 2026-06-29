import { useState, useEffect, useRef } from 'react';
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
	const [showAddTask, setShowAddTask] = useState<boolean>(false)

	useEffect(() => {
		saveTasks(STORAGE_KEY, tasks);
	}, [tasks]);

	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (
			showAddTask &&
			formRef.current &&
			!formRef.current.contains(e.target as Node)
			) {
			setShowAddTask(false);
			}
		};

		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [showAddTask]);

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

	function handleShowAddButton() {
		setShowAddTask(true)
	};

	return (
		<section className="TaskList">
			<fieldset className="ow-quest-check">
				<legend className="ow-quest-check__legend">Daily Tasks for Ari</legend>

				<div className="ow-quest-check__items"> {/* scrollable area */}
					{tasks.map((task) => (
						<TaskItem
							key={task.id}
							task={task}
							removing={removingIds.has(task.id)}
							onToggle={toggleTask}
							
						/>
					))}
				</div>

				<div className='add-section' ref={formRef}> 
					{!showAddTask && <button className='plus' onClick={handleShowAddButton}>+</button>}
					{showAddTask && <button className='plus' onClick={handleShowAddButton} style={{visibility: 'hidden'}}>+</button>}
					{showAddTask && <TaskForm onAdd={addTask} />}
				</div>
			</fieldset>
		</section>
	);
}

export default TaskList;