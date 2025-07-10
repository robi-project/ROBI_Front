import { api, getPaginated } from './api';
import type { Robot, Task, MonitoringData } from '../types';

export interface CreateRobotData {
  name: string;
  type: 'weeding' | 'harvesting' | 'monitoring' | 'planting';
  farmId: string;
}

export interface UpdateRobotData {
  name?: string;
  status?: 'active' | 'maintenance' | 'offline' | 'charging';
  location?: {
    lat: number;
    lng: number;
  };
}

export const robotService = {
  // Obtenir tous les robots
  getAll: async (farmId?: string, page: number = 1, limit: number = 10) => {
    const params = farmId ? { farmId } : {};
    return getPaginated<Robot>('/robots', page, limit, params);
  },

  // Obtenir un robot par ID
  getById: async (id: string): Promise<Robot> => {
    const response = await api.get<Robot>(`/robots/${id}`);
    return response.data;
  },

  // Créer un nouveau robot
  create: async (data: CreateRobotData): Promise<Robot> => {
    const response = await api.post<Robot>('/robots', data);
    return response.data;
  },

  // Mettre à jour un robot
  update: async (id: string, data: UpdateRobotData): Promise<Robot> => {
    const response = await api.put<Robot>(`/robots/${id}`, data);
    return response.data;
  },

  // Supprimer un robot
  delete: async (id: string): Promise<void> => {
    await api.delete(`/robots/${id}`);
  },

  // Obtenir les tâches d'un robot
  getTasks: async (robotId: string, page: number = 1, limit: number = 10) => {
    return getPaginated<Task>(`/robots/${robotId}/tasks`, page, limit);
  },

  // Assigner une tâche à un robot
  assignTask: async (robotId: string, taskId: string): Promise<Task> => {
    const response = await api.post<Task>(`/robots/${robotId}/tasks`, { taskId });
    return response.data;
  },

  // Obtenir les données de monitoring d'un robot
  getMonitoringData: async (
    robotId: string, 
    startDate?: Date, 
    endDate?: Date,
    page: number = 1,
    limit: number = 50
  ) => {
    const params: any = {};
    if (startDate) params.startDate = startDate.toISOString();
    if (endDate) params.endDate = endDate.toISOString();
    
    return getPaginated<MonitoringData>(`/robots/${robotId}/monitoring`, page, limit, params);
  },

  // Obtenir les statistiques d'un robot
  getStats: async (robotId: string, period: 'day' | 'week' | 'month' = 'week') => {
    const response = await api.get(`/robots/${robotId}/stats`, { period });
    return response.data;
  },

  // Contrôler un robot (démarrer/arrêter)
  control: async (robotId: string, action: 'start' | 'stop' | 'pause' | 'resume'): Promise<Robot> => {
    const response = await api.post<Robot>(`/robots/${robotId}/control`, { action });
    return response.data;
  },

  // Planifier la maintenance d'un robot
  scheduleMaintenance: async (robotId: string, scheduledDate: Date, description: string): Promise<void> => {
    await api.post(`/robots/${robotId}/maintenance`, { scheduledDate, description });
  },

  // Obtenir l'historique d'un robot
  getHistory: async (robotId: string, page: number = 1, limit: number = 20) => {
    return getPaginated(`/robots/${robotId}/history`, page, limit);
  },

  // Obtenir la localisation en temps réel d'un robot
  getLocation: async (robotId: string): Promise<{ lat: number; lng: number }> => {
    const response = await api.get<{ lat: number; lng: number }>(`/robots/${robotId}/location`);
    return response.data;
  },

  // Obtenir le niveau de batterie d'un robot
  getBatteryLevel: async (robotId: string): Promise<number> => {
    const response = await api.get<{ batteryLevel: number }>(`/robots/${robotId}/battery`);
    return response.data.batteryLevel;
  },
}; 