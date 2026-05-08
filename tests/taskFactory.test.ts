import { describe, expect, it } from 'vitest';

import { createTask } from '../src/features/tasks/utils/taskFactory';

describe('createTask', () => {
  it('creates a task with required fields', () => {
    const task = createTask('Write docs');

    expect(task.title).toBe('Write docs');
    expect(task.completed).toBe(false);
    expect(task.id).toBeTypeOf('string');
    expect(task.createdAt).toBeTypeOf('string');
  });
});
