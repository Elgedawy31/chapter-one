import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Task } from '../types';
import { loadTasks, saveTasks } from '../services';
import { createTask, getTaskStats } from '../utils';

interface UseTasksResult {
  tasks: Task[];
  isLoading: boolean;
  errorMessage: string;
  stats: {
    total: number;
    completed: number;
    active: number;
  };
  addTask: (title: string) => Promise<void>;
  toggleTask: (taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  clearError: () => void;
}

export function useTasks(): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function initializeTasks() {
      const storedTasks = await loadTasks();
      setTasks(storedTasks);
      setIsLoading(false);
    }

    void initializeTasks();
  }, []);

  const persistTasks = useCallback(async (nextTasks: Task[]) => {
    try {
      await saveTasks(nextTasks);
      setTasks(nextTasks);
      setErrorMessage('');
    } catch {
      setErrorMessage('Could not save tasks. Please try again.');
    }
  }, []);

  const addTask = useCallback(
    async (title: string) => {
      const trimmed = title.trim();
      if (!trimmed) {
        setErrorMessage('Please enter a task title.');
        return;
      }

      const nextTasks = [createTask(trimmed), ...tasks];
      await persistTasks(nextTasks);
    },
    [persistTasks, tasks],
  );

  const toggleTask = useCallback(
    async (taskId: string) => {
      const nextTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      );
      await persistTasks(nextTasks);
    },
    [persistTasks, tasks],
  );

  const deleteTask = useCallback(
    async (taskId: string) => {
      const nextTasks = tasks.filter((task) => task.id !== taskId);
      await persistTasks(nextTasks);
    },
    [persistTasks, tasks],
  );

  const stats = useMemo(() => getTaskStats(tasks), [tasks]);

  return {
    tasks,
    isLoading,
    errorMessage,
    stats,
    addTask,
    toggleTask,
    deleteTask,
    clearError: () => setErrorMessage(''),
  };
}
