// Types pour l'utilisateur
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'farmer' | 'admin' | 'technician';
  farmId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Types pour la ferme
export interface Farm {
  id: string;
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
  size: number; // en hectares
  cropTypes: string[];
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Types pour les robots
export interface Robot {
  id: string;
  name: string;
  type: 'weeding' | 'harvesting' | 'monitoring' | 'planting';
  status: 'active' | 'maintenance' | 'offline' | 'charging';
  batteryLevel: number; // 0-100
  location: {
    lat: number;
    lng: number;
  };
  farmId: string;
  lastActivity: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Types pour les tâches
export interface Task {
  id: string;
  type: 'weeding' | 'harvesting' | 'monitoring' | 'planting';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high';
  farmId: string;
  robotId?: string;
  scheduledAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  description: string;
  area: {
    coordinates: Array<{lat: number, lng: number}>;
    size: number; // en m²
  };
  createdAt: Date;
  updatedAt: Date;
}

// Types pour les données de monitoring
export interface MonitoringData {
  id: string;
  robotId: string;
  farmId: string;
  timestamp: Date;
  data: {
    soilMoisture?: number;
    temperature?: number;
    humidity?: number;
    plantHealth?: number;
    weedDensity?: number;
    images?: string[];
  };
  location: {
    lat: number;
    lng: number;
  };
}

// Types pour les rapports
export interface Report {
  id: string;
  farmId: string;
  type: 'daily' | 'weekly' | 'monthly';
  period: {
    start: Date;
    end: Date;
  };
  data: {
    tasksCompleted: number;
    areaCovered: number;
    efficiency: number;
    issues: string[];
    recommendations: string[];
  };
  createdAt: Date;
}

// Types pour l'authentification
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Types pour l'API
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} 