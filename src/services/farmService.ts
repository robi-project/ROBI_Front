import { api, getPaginated } from './api';
import type { Farm, Robot, Task, Report } from '../types';

export interface CreateFarmData {
  name: string;
  location: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  size: number;
  cropTypes: string[];
}

export interface UpdateFarmData {
  name?: string;
  location?: {
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  size?: number;
  cropTypes?: string[];
}

export const farmService = {
  // Obtenir toutes les fermes
  getAll: async (page: number = 1, limit: number = 10) => {
    return getPaginated<Farm>('/farms', page, limit);
  },

  // Obtenir une ferme par ID
  getById: async (id: string): Promise<Farm> => {
    const response = await api.get<Farm>(`/farms/${id}`);
    return response.data;
  },

  // Créer une nouvelle ferme
  create: async (data: CreateFarmData): Promise<Farm> => {
    const response = await api.post<Farm>('/farms', data);
    return response.data;
  },

  // Mettre à jour une ferme
  update: async (id: string, data: UpdateFarmData): Promise<Farm> => {
    const response = await api.put<Farm>(`/farms/${id}`, data);
    return response.data;
  },

  // Supprimer une ferme
  delete: async (id: string): Promise<void> => {
    await api.delete(`/farms/${id}`);
  },

  // Obtenir les robots d'une ferme
  getRobots: async (farmId: string, page: number = 1, limit: number = 10) => {
    return getPaginated<Robot>(`/farms/${farmId}/robots`, page, limit);
  },

  // Obtenir les tâches d'une ferme
  getTasks: async (farmId: string, page: number = 1, limit: number = 10) => {
    return getPaginated<Task>(`/farms/${farmId}/tasks`, page, limit);
  },

  // Obtenir les rapports d'une ferme
  getReports: async (farmId: string, page: number = 1, limit: number = 10) => {
    return getPaginated<Report>(`/farms/${farmId}/reports`, page, limit);
  },

  // Obtenir les statistiques d'une ferme
  getStats: async (farmId: string, period: 'day' | 'week' | 'month' = 'week') => {
    const response = await api.get(`/farms/${farmId}/stats`, { period });
    return response.data;
  },

  // Obtenir la carte d'une ferme
  getMap: async (farmId: string) => {
    const response = await api.get(`/farms/${farmId}/map`);
    return response.data;
  },

  // Planifier une tâche pour une ferme
  scheduleTask: async (farmId: string, taskData: {
    type: 'weeding' | 'harvesting' | 'monitoring' | 'planting';
    priority: 'low' | 'medium' | 'high';
    scheduledAt: Date;
    description: string;
    area: {
      coordinates: Array<{lat: number, lng: number}>;
      size: number;
    };
  }): Promise<Task> => {
    const response = await api.post<Task>(`/farms/${farmId}/tasks`, taskData);
    return response.data;
  },

  // Obtenir les alertes d'une ferme
  getAlerts: async (farmId: string, page: number = 1, limit: number = 20) => {
    return getPaginated(`/farms/${farmId}/alerts`, page, limit);
  },

  // Marquer une alerte comme lue
  markAlertAsRead: async (farmId: string, alertId: string): Promise<void> => {
    await api.patch(`/farms/${farmId}/alerts/${alertId}`, { read: true });
  },

  // Obtenir les paramètres d'une ferme
  getSettings: async (farmId: string) => {
    const response = await api.get(`/farms/${farmId}/settings`);
    return response.data;
  },

  // Mettre à jour les paramètres d'une ferme
  updateSettings: async (farmId: string, settings: any): Promise<void> => {
    await api.put(`/farms/${farmId}/settings`, settings);
  },
}; 