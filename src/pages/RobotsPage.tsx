import React, { useState } from 'react';
import { PlayIcon, PauseIcon, HomeIcon, WrenchScrewdriverIcon, ExclamationTriangleIcon, CalendarIcon, PlusIcon, DeviceTabletIcon, Battery50Icon, Battery100Icon, Battery0Icon } from '@heroicons/react/24/outline';

// Types
interface Robot {
  id: string;
  name: string;
  type: string;
  battery: number;
  status: 'Actif' | 'En mission' | 'En charge' | 'Maintenance';
}

interface Alert {
  type: 'batterie' | 'maintenance';
  message: string;
}

// Données fictives
const robots: Robot[] = [
  { id: 'ROBI-001', name: 'Robot de désherbage', type: 'Désherbage', battery: 85, status: 'En mission' },
  { id: 'ROBI-002', name: 'Robot de plantation', type: 'Plantation', battery: 45, status: 'En charge' },
  { id: 'ROBI-003', name: 'Robot de récolte', type: 'Récolte', battery: 92, status: 'Actif' },
  { id: 'ROBI-004', name: "Robot d'arrosage", type: 'Arrosage', battery: 15, status: 'Maintenance' },
];

const alerts: Alert[] = [
  { type: 'batterie', message: 'ROBI-004 - 15% restant' },
  { type: 'maintenance', message: 'ROBI-001 - Demain 9h00' },
];

const stats = [
  { label: 'Robots Actifs', value: 8, icon: <DeviceTabletIcon className="w-6 h-6 text-gray-500" /> },
  { label: 'En Mission', value: 5, icon: <PlayIcon className="w-6 h-6 text-gray-500" /> },
  { label: 'En Charge', value: 2, icon: <Battery50Icon className="w-6 h-6 text-gray-500" /> },
  { label: 'Maintenance', value: 1, icon: <WrenchScrewdriverIcon className="w-6 h-6 text-gray-500" /> },
];

const getStatusColor = (status: Robot['status']) => {
  switch (status) {
    case 'Actif': return 'bg-green-100 text-green-800 border-green-300';
    case 'En mission': return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'En charge': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Maintenance': return 'bg-gray-100 text-gray-800 border-gray-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getBatteryIcon = (battery: number) => {
  if (battery > 80) return <Battery100Icon className="w-5 h-5 text-green-500 inline" />;
  if (battery > 30) return <Battery50Icon className="w-5 h-5 text-yellow-500 inline" />;
  return <Battery0Icon className="w-5 h-5 text-red-500 inline" />;
};

const RobotsPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('Tous les statuts');

  // Filtrage des robots selon le statut sélectionné
  const filteredRobots = selectedStatus === 'Tous les statuts'
    ? robots
    : robots.filter(r => r.status === selectedStatus);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Robots</h1>
              <p className="text-gray-500 text-sm">Supervisez et contrôlez votre flotte de robots autonomes</p>
            </div>
            <button className="btn-primary flex items-center"><PlusIcon className="w-5 h-5 mr-2" />Ajouter Robot</button>
          </div>
          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-gray-200 flex flex-col items-center py-4">
                <div className="mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Flotte de robots */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 mb-4">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-800 text-lg">Flotte de Robots</h2>
                  <div>
                    <select
                      className="input-field w-48" // largeur augmentée
                      value={selectedStatus}
                      onChange={e => setSelectedStatus(e.target.value)}
                    >
                      <option>Tous les statuts</option>
                      <option>Actif</option>
                      <option>En mission</option>
                      <option>En charge</option>
                      <option>Maintenance</option>
                    </select>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {filteredRobots.map((robot) => (
                    <div key={robot.id} className="flex items-center px-6 py-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mr-4">
                        <DeviceTabletIcon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{robot.id}</div>
                        <div className="text-gray-500 text-xs">{robot.name}</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-xs text-gray-500 mb-1">Batterie</div>
                        <div className="flex items-center font-semibold">
                          {getBatteryIcon(robot.battery)}
                          <span className="ml-1">{robot.battery}%</span>
                        </div>
                        <div className={`mt-1 px-2 py-0.5 rounded-full border text-xs font-semibold ${getStatusColor(robot.status)}`}>Statut {robot.status}</div>
                      </div>
                    </div>
                  ))}
                  {filteredRobots.length === 0 && (
                    <div className="px-6 py-8 text-gray-400 text-center">Aucun robot pour ce statut.</div>
                  )}
                </div>
              </div>
            </div>
            {/* Actions rapides, alertes, performances */}
            <div className="flex flex-col space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Actions Rapides</h3>
                <div className="flex flex-col space-y-2">
                  <button className="btn-secondary flex items-center"><PlayIcon className="w-4 h-4 mr-2" />Démarrer mission</button>
                  <button className="btn-secondary flex items-center"><PauseIcon className="w-4 h-4 mr-2" />Arrêter tous robots</button>
                  <button className="btn-secondary flex items-center"><HomeIcon className="w-4 h-4 mr-2" />Retour à la base</button>
                  <button className="btn-secondary flex items-center"><WrenchScrewdriverIcon className="w-4 h-4 mr-2" />Mode maintenance</button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Alertes</h3>
                <div className="flex flex-col space-y-2">
                  {alerts.map((alert, idx) => (
                    <div key={idx} className="flex items-center text-sm px-2 py-1 rounded bg-gray-50 border border-gray-200">
                      {alert.type === 'batterie' ? (
                        <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500 mr-2" />
                      ) : (
                        <CalendarIcon className="w-4 h-4 text-blue-500 mr-2" />
                      )}
                      {alert.type === 'batterie' ? 'Batterie faible' : 'Maintenance programmée'}
                      <span className="ml-2 text-gray-500">{alert.message}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Performances</h3>
                <div className="mb-2 text-xs text-gray-500 flex justify-between"><span>Temps d'activité</span><span>94%</span></div>
                <div className="w-full h-2 bg-gray-100 rounded-full mb-3"><div className="h-2 bg-green-400 rounded-full" style={{ width: '94%' }}></div></div>
                <div className="mb-2 text-xs text-gray-500 flex justify-between"><span>Efficacité moyenne</span><span>87%</span></div>
                <div className="w-full h-2 bg-gray-100 rounded-full"><div className="h-2 bg-blue-400 rounded-full" style={{ width: '87%' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RobotsPage; 