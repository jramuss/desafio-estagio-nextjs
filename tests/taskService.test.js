import { afterEach, describe, expect, it, vi } from 'vitest';
import { taskService } from '../features/tasks/services/taskService';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('taskService', () => {
  it('lista tarefas com limite informado', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => [{ id: 1, title: 'Tarefa' }],
    }));

    const result = await taskService.getTasks(20);

    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos?_limit=20',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      }),
    );
    expect(result).toEqual([{ id: 1, title: 'Tarefa' }]);
  });

  it('transforma resposta HTTP não autorizada em erro', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    }));

    await expect(taskService.getUsers()).rejects.toThrow(
      'Erro na requisição (404): Not Found',
    );
  });

  it('não tenta ler JSON em DELETE sem conteúdo', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 204,
      statusText: 'No Content',
    }));

    await expect(taskService.deleteTask(1)).resolves.toBeNull();
  });
});
