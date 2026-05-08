import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Task } from '../types';

export const TASK_STORAGE_KEY = '@chapter-one/tasks';

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.completed === 'boolean' &&
    typeof item.createdAt === 'string'
  );
}

export async function loadTasks(): Promise<Task[]> {
  try {
    const rawValue = await AsyncStorage.getItem(TASK_STORAGE_KEY);
    if (rawValue == null) {
      return [];
    }

    const parsed: unknown = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isTask);
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
}
