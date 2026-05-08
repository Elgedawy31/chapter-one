import type { Task } from '../types';

export interface TasksSummary {
  total: number;
  completed: number;
  active: number;
}

export function getTaskStats(tasks: Task[]): TasksSummary {
  const completed = tasks.filter((task) => task.completed).length;

  return {
    total: tasks.length,
    completed,
    active: tasks.length - completed,
  };
}
