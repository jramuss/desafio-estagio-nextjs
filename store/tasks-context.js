"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import * as api from "../lib/api";

const TasksContext = createContext(null);

const initialState = {
  tasks: [],
  users: [],
  status: "loading", // loading | success | error
  error: null,
  actionError: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, status: "loading", error: null };
    case "LOAD_SUCCESS":
      return { ...state, status: "success", tasks: action.tasks, users: action.users };
    case "LOAD_ERROR":
      return { ...state, status: "error", error: action.message };
    case "ADD":
      return { ...state, tasks: [action.task, ...state.tasks] };
    case "SET_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, completed: action.completed } : t
        ),
      };
    case "REMOVE":
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.id) };
    case "RESTORE": {
      const tasks = [...state.tasks];
      tasks.splice(action.index, 0, action.task);
      return { ...state, tasks };
    }
    case "ACTION_ERROR":
      return { ...state, actionError: action.message };
    case "CLEAR_ACTION_ERROR":
      return { ...state, actionError: null };
    default:
      return state;
  }
}

export function TasksProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadData = useCallback(async () => {
    dispatch({ type: "LOAD_START" });
    try {
      const [tasks, users] = await Promise.all([api.getTodos(), api.getUsers()]);
      dispatch({ type: "LOAD_SUCCESS", tasks, users });
    } catch (error) {
      dispatch({ type: "LOAD_ERROR", message: error.message });
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // A API simula o POST e sempre devolve id 201. Por isso geramos um id local
  // único, evitando colisão quando o usuário cadastra várias tarefas.
  const addTask = useCallback(
    async ({ title, userId }) => {
      dispatch({ type: "CLEAR_ACTION_ERROR" });
      try {
        await api.createTodo({ title, completed: false, userId });
        const nextId = Math.max(200, ...state.tasks.map((t) => t.id)) + 1;
        dispatch({
          type: "ADD",
          task: { id: nextId, title, completed: false, userId, local: true },
        });
        return true;
      } catch (error) {
        dispatch({ type: "ACTION_ERROR", message: `Não foi possível criar a tarefa. ${error.message}` });
        return false;
      }
    },
    [state.tasks]
  );

  // Atualização otimista: muda a tela primeiro e desfaz se a API falhar.
  // Tarefas criadas localmente não existem na API (retornaria 404/500), então
  // só o estado local é alterado.
  const toggleTask = useCallback(async (task) => {
    const completed = !task.completed;
    dispatch({ type: "CLEAR_ACTION_ERROR" });
    dispatch({ type: "SET_COMPLETED", id: task.id, completed });
    if (task.local) return;
    try {
      await api.updateTodo(task.id, { completed });
    } catch (error) {
      dispatch({ type: "SET_COMPLETED", id: task.id, completed: task.completed });
      dispatch({ type: "ACTION_ERROR", message: `Não foi possível alterar o status. ${error.message}` });
    }
  }, []);

  const removeTask = useCallback(
    async (task) => {
      const index = state.tasks.findIndex((t) => t.id === task.id);
      dispatch({ type: "CLEAR_ACTION_ERROR" });
      dispatch({ type: "REMOVE", id: task.id });
      if (task.local) return;
      try {
        await api.deleteTodo(task.id);
      } catch (error) {
        dispatch({ type: "RESTORE", task, index });
        dispatch({ type: "ACTION_ERROR", message: `Não foi possível excluir a tarefa. ${error.message}` });
      }
    },
    [state.tasks]
  );

  const clearActionError = useCallback(() => dispatch({ type: "CLEAR_ACTION_ERROR" }), []);

  const value = {
    ...state,
    reload: loadData,
    addTask,
    toggleTask,
    removeTask,
    clearActionError,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks deve ser usado dentro de <TasksProvider>");
  }
  return context;
}
