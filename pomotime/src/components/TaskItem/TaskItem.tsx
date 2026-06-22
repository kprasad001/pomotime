import './TaskItem.css'
import type { Task } from '../../types';

interface TaskItemProps {
    task: Task;
    removing: boolean;
    onToggle: (id: string) => void;
}

const TaskItem = ({ task, removing, onToggle }: TaskItemProps) => {
    return (
        <section className={`TaskItem ${removing ? 'TaskItem--removing' : ''}`}>
        <label className="ow-quest-check__row">
            <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            />
            <span className="ow-quest-check__copy">{task.title}</span>
        </label>
        </section>
    );
}

export default TaskItem;