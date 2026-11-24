'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { taskService } from '../services/taskService';

export function useTaskManager() {
  // Técnico: estados independentes mantêm dados, carregamento, submissão e feedback da interface.
  // Humano: cada estado representa uma situação visível ao usuário, como "carregando" ou "salvando".
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const feedbackTimerRef = useRef(null);

  // Técnico: useCallback estabiliza a função e evita reiniciar efeitos que dependem dela.
  // Humano: garante uma mesma "forma" de mostrar avisos durante a vida da tela.
  const showFeedback = useCallback((type, message) => {
    setFeedback({ type, message });
    if (feedbackTimerRef.current) {
      window.clearTimeout(feedbackTimerRef.current);
    }
    // Técnico: remove o aviso somente se ele ainda representa a mesma mensagem, evitando fechar um aviso novo.
    // Humano: não deixa mensagens antigas desaparecerem em cima de mensagens recentes.
    feedbackTimerRef.current = window.setTimeout(() => {
      setFeedback((current) => (current?.message === message ? null : current));
    }, 4000);
  }, []);

  // Técnico: limpa o temporizador ao desmontar o hook.
  // Humano: evita que um aviso apareça depois que o usuário já deixou a tela.
  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) {
        window.clearTimeout(feedbackTimerRef.current);
      }
    };
  }, []);

  // Técnico: Promise.all paraleliza tarefas e usuários, reduzindo a latência inicial em relação a chamadas sequenciais.
  // Humano: a tela espera os dados principais chegarem juntos para não mostrar listas incompletas.
  const loadInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const [tasksData, usersData] = await Promise.all([
        taskService.getTasks(20),
        taskService.getUsers(),
      ]);
      setTasks(tasksData);
      setUsers(usersData);
    } catch (err) {
      showFeedback('error', err.message || 'Não foi possível carregar as tarefas.');
    } finally {
      setLoading(false);
    }
  }, [showFeedback]);

  // Técnico: o efeito executa o carregamento após a montagem e depende de uma função memoizada.
  // Humano: é o momento em que o TaskFlow busca seu conteúdo pela primeira vez.
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Técnico: useMemo cria um índice id -> nome para resolver responsáveis em O(1) durante a renderização.
  // Humano: transforma uma longa procura por nomes em uma consulta rápida.
  const userMap = useMemo(() => {
    const map = {};
    users.forEach((u) => {
      map[u.id] = u.name;
    });
    return map;
  }, [users]);

  // Técnico: os indicadores derivam diretamente da coleção de tarefas carregada.
  // Humano: os cartões de resumo sempre refletem a situação real das tarefas.
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, rate };
  }, [tasks]);

  // Técnico: filtros são combinados por AND e a busca normaliza caixa e espaços externos.
  // Humano: pesquisar, selecionar status e responsável restringe os resultados ao mesmo tempo.
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(search.trim().toLowerCase());
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'completed' && task.completed) ||
        (statusFilter === 'pending' && !task.completed);
      const matchesUser = userFilter === 'all' || String(task.userId) === String(userFilter);

      return matchesSearch && matchesStatus && matchesUser;
    });
  }, [tasks, search, statusFilter, userFilter]);

  const createTask = async ({ title, userId }) => {
    setSubmitting(true);
    try {
      const created = await taskService.createTask({
        title: title.trim(),
        userId: Number(userId),
        completed: false,
      });

      const newTask = {
        ...created,
        id:
          typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
            ? crypto.randomUUID()
            : `task-${Date.now()}`,
      };

      setTasks((prev) => [newTask, ...prev]);
      showFeedback('success', 'Tarefa criada com sucesso.');
      return true;
    } catch (err) {
      showFeedback('error', err.message || 'Erro ao criar tarefa.');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const updateTask = async (id, updates) => {
    setSubmitting(true);
    try {
      await taskService.updateTask(id, updates);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
      );
      setEditingTask(null);
      showFeedback('success', 'Tarefa atualizada com sucesso.');
      return true;
    } catch (err) {
      showFeedback('error', err.message || 'Erro ao atualizar tarefa.');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const toggleTask = async (task) => {
    const nextCompleted = !task.completed;
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, completed: nextCompleted } : t))
    );

    try {
      await taskService.updateTask(task.id, { completed: nextCompleted });
    } catch (err) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, completed: task.completed } : t))
      );
      showFeedback('error', 'Não foi possível alterar o status da tarefa.');
    }
  };

  const deleteTask = async (id) => {
    // Técnico: a cópia completa preserva todas as tarefas caso a API rejeite a exclusão.
    // Humano: funciona como desfazer automático da interface quando a internet falha.
    const previous = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await taskService.deleteTask(id);
      if (editingTask?.id === id) {
        setEditingTask(null);
      }
      showFeedback('success', 'Tarefa removida.');
    } catch (err) {
      setTasks(previous);
      showFeedback('error', 'Erro ao remover tarefa.');
    }
  };

  return {
    tasks: filteredTasks,
    users,
    userMap,
    stats,
    loading,
    submitting,
    feedback,
    setFeedback,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    userFilter,
    setUserFilter,
    editingTask,
    setEditingTask,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
    reload: loadInitialData,
  };
}
