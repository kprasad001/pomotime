import { useState } from 'react';
import './TaskForm.css';

interface TaskFormProps {
  onAdd: (title: string) => void;
}

const TaskForm = ({ onAdd }: TaskFormProps) => {
    const [title, setTitle] = useState('');

    const handleSubmit = () => {
        const trimmed = title.trim();
        if (!trimmed) return;
        onAdd(trimmed);
        setTitle('');
    };

  return (
        <div className="TaskForm">
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Add a task..."
        />
        <button onClick={handleSubmit}>Add</button>
        </div>
    );
}

export default TaskForm;