import AsyncStorage from '@react-native-async-storage/async-storage';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  TASK_STORAGE_KEY,
  loadTasks,
  saveTasks,
} from '../src/features/tasks/services/taskStorage';

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
  },
}));

const mockedStorage = vi.mocked(AsyncStorage);

describe('taskStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads tasks from storage', async () => {
    mockedStorage.getItem.mockResolvedValueOnce(
      JSON.stringify([{ id: '1', title: 'Task', completed: false, createdAt: '2026' }]),
    );

    const tasks = await loadTasks();

    expect(tasks).toHaveLength(1);
    expect(tasks[0]?.title).toBe('Task');
  });

  it('returns empty array when parsing fails', async () => {
    mockedStorage.getItem.mockResolvedValueOnce('{invalid json');

    await expect(loadTasks()).resolves.toEqual([]);
  });

  it('saves tasks', async () => {
    const tasks = [{ id: '1', title: 'Task', completed: false, createdAt: '2026' }];

    await saveTasks(tasks);

    expect(mockedStorage.setItem).toHaveBeenCalledWith(
      TASK_STORAGE_KEY,
      JSON.stringify(tasks),
    );
  });
});
