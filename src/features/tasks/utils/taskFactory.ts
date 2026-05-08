import { createId } from '../../../shared/utils';
import type { Task } from '../types';

export function createTask(title: string): Task {
  return {
    id: createId(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}
