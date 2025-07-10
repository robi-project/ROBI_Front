import React, { useState, useEffect } from 'react';
import { 
  MapIcon, 
  CogIcon, 
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import type { Farm, Robot, Task } from '../types';
import { farmService } from '../services/farmService';
import { robotService } from '../services/robotService';

const Dashboard: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [robots, setRobots] = useState<Robot[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les données du tableau de bord
        const [farmsResponse, robotsResponse, tasksResponse] = await Promise.all([
          farmService.getAll(1, 5),
          robotService.getAll(undefined, 1, 10),
          // Ici vous devrez créer un service pour les tâches
          Promise.resolve({ data: [], pagination: { total: 0 } })
        ]);

        setFarms(farmsResponse.data);
        setRobots(robotsResponse.data);
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error('Erreur lors du chargement du tableau de bord:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-100';
      case 'offline':
        return 'text-red-600 bg-red-100';
      case 'charging':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'maintenance':
        return 'Maintenance';
      case 'offline':
        return 'Hors ligne';
      case 'charging':
        return 'En charge';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-2 text-gray-600">
            Vue d'ensemble de vos fermes et robots autonomes
          </p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MapIcon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Fermes</p>
                <p className="text-2xl font-semibold text-gray-900">{farms.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CogIcon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Robots</p>
                <p className="text-2xl font-semibold text-gray-900">{robots.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Tâches actives</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {tasks.filter(task => task.status === 'in_progress').length}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Robots actifs</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {robots.filter(robot => robot.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section des robots */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* État des robots */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">État des robots</h2>
            <div className="space-y-4">
              {robots.slice(0, 5).map((robot) => (
                <div key={robot.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary-600 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">{robot.name}</p>
                      <p className="text-sm text-gray-500">{robot.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(robot.status)}`}>
                      {getStatusText(robot.status)}
                    </span>
                    <div className="text-sm text-gray-500">
                      {robot.batteryLevel}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tâches récentes */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tâches récentes</h2>
            <div className="space-y-4">
              {tasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{task.description}</p>
                      <p className="text-sm text-gray-500">{task.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    task.status === 'completed' ? 'text-green-600 bg-green-100' :
                    task.status === 'in_progress' ? 'text-blue-600 bg-blue-100' :
                    'text-gray-600 bg-gray-100'
                  }`}>
                    {task.status === 'completed' ? 'Terminé' :
                     task.status === 'in_progress' ? 'En cours' :
                     task.status === 'pending' ? 'En attente' : task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alertes */}
        <div className="mt-8">
          <div className="card">
            <div className="flex items-center mb-4">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Alertes</h2>
            </div>
            <div className="text-center py-8">
              <p className="text-gray-500">Aucune alerte en cours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 