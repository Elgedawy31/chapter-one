import { describe, expect, it } from 'vitest';

import { getTaskStats } from '../src/features/tasks/utils/taskFilters';

const tasks = [
  { id: '1', title: 'a', completed: false, createdAt: '2026-01-01' },
  { id: '2', title: 'b', completed: true, createdAt: '2026-01-01' },
  { id: '3', title: 'c', completed: true, createdAt: '2026-01-01' },
];

describe('getTaskStats', () => {
  it('returns totals correctly', () => {
    expect(getTaskStats(tasks)).toEqual({ total: 3, completed: 2, active: 1 });
  });

  it('handles empty tasks', () => {
    expect(getTaskStats([])).toEqual({ total: 0, completed: 0, active: 0 });
  });
});
