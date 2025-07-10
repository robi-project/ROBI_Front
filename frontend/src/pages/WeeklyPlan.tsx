import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { ChevronDownIcon, ChevronRightIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const DATES = [3, 4, 5, 6, 7, 8, 9];

// Couleurs par type de tâche
const TASK_COLORS: Record<string, string> = {
  'Préparation': 'bg-blue-50 border-blue-300 text-blue-900',
  'Désherbage': 'bg-green-50 border-green-300 text-green-900',
  'Arrosage': 'bg-blue-100 border-blue-400 text-blue-900',
  'Plantation': 'bg-purple-50 border-purple-300 text-purple-900',
  'Récolte': 'bg-yellow-50 border-yellow-300 text-yellow-900',
};

const ZONES = [
  {
    name: 'Zone A1',
    alert: 'maintenance',
    planches: [
      {
        name: 'Planche A1-P1',
        tasks: [
          { day: 0, label: 'Robot-01', type: 'Arrosage', robot: true },
          { day: 1, label: 'Robot-02', type: 'Préparation', robot: true },
        ],
      },
      {
        name: 'Planche A1-P2',
        tasks: [
          { day: 0, label: 'Marc D.', type: 'Désherbage', robot: false },
          { day: 1, label: 'Robot-03', type: 'Arrosage', robot: true },
          { day: 3, label: 'Julie L.', type: 'Récolte', robot: false },
        ],
      },
      { name: 'Planche A1-P3', tasks: [] },
    ],
  },
  {
    name: 'Zone A2',
    alert: null,
    planches: [
      {
        name: 'Planche A2-P1',
        tasks: [
          { day: 2, label: 'Robot-01', type: 'Arrosage', robot: true },
          { day: 3, label: 'Robot-01', type: 'Arrosage', robot: true },
        ],
      },
      {
        name: 'Planche A2-P2',
        tasks: [
          { day: 1, label: 'Paul M.', type: 'Désherbage', robot: false },
          { day: 4, label: 'Robot-01', type: 'Arrosage', robot: true },
        ],
      },
    ],
  },
  {
    name: 'Zone A3',
    alert: 'critique',
    planches: [
      {
        name: 'Planche A3-P1',
        tasks: [],
      },
      {
        name: 'Planche A3-P2',
        tasks: [
          { day: 6, label: 'Sophie R.', type: 'Récolte', robot: false },
        ],
      },
    ],
  },
];

const WeeklyPlan: React.FC = () => {
  const [openZones, setOpenZones] = useState<Record<string, boolean>>({});

  const toggleZone = (zoneName: string) => {
    setOpenZones((prev) => ({ ...prev, [zoneName]: !prev[zoneName] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Planification par planches et zones</h1>
            <button className="btn-primary flex items-center"><span className="mr-1">+</span>Nouvelle tâche</button>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <button className="btn-secondary">Semaine du 3 - 9 Février 2025</button>
            <select className="input-field">
              <option>Toutes les zones</option>
              {ZONES.map(z => <option key={z.name}>{z.name}</option>)}
            </select>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 w-48">Planches/Zones</th>
                  {DAYS.map((day, i) => (
                    <th key={day} className="px-4 py-2 text-center font-normal text-gray-500">{day} {DATES[i]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ZONES.map((zone) => (
                  <React.Fragment key={zone.name}>
                    {/* Zone header (accordion) */}
                    <tr className="bg-gray-50 border-t border-gray-100">
                      <td colSpan={8} className="px-4 py-2 font-semibold text-gray-800 cursor-pointer flex items-center" onClick={() => toggleZone(zone.name)}>
                        {openZones[zone.name] ? <ChevronDownIcon className="w-4 h-4 mr-2" /> : <ChevronRightIcon className="w-4 h-4 mr-2" />}
                        <span className="mr-2">📍</span> {zone.name}
                        {zone.alert === 'maintenance' && <Cog6ToothIcon className="w-4 h-4 text-yellow-500 ml-2" title="Alerte maintenance" />}
                        {zone.alert === 'critique' && <span className="ml-2 text-red-600 font-bold" title="Alerte critique">▲</span>}
                      </td>
                    </tr>
                    {/* Planches (accordion content) */}
                    {openZones[zone.name] !== false && zone.planches.map((planche) => (
                      <tr key={planche.name} className="border-b border-gray-100">
                        <td className="px-4 py-2 text-gray-700 whitespace-nowrap font-medium bg-gray-50">{planche.name}</td>
                        {DAYS.map((_, dayIdx) => {
                          const task = planche.tasks.find(t => t.day === dayIdx);
                          return (
                            <td key={dayIdx} className="px-2 py-2 text-center align-top">
                              {task && (
                                <div className={`border rounded-lg px-2 py-1 mb-1 flex flex-col items-start ${TASK_COLORS[task.type] || 'bg-gray-100 border-gray-300'}`}>
                                  <div className="flex items-center space-x-1 text-xs font-semibold">
                                    {task.robot ? (
                                      <span className="inline-flex items-center"><Cog6ToothIcon className="w-4 h-4 mr-1 inline" />{task.label}</span>
                                    ) : (
                                      <span className="inline-flex items-center"><UserIcon className="w-4 h-4 mr-1 inline" />{task.label}</span>
                                    )}
                                  </div>
                                  <span className="text-xs font-medium mt-1">{task.type}</span>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {/* Légende */}
          <div className="flex items-center space-x-6 mt-6 text-xs text-gray-500">
            <div className="flex items-center"><span className="w-4 h-4 rounded bg-gray-300 border border-gray-400 mr-2 inline-block"></span>Tâche assignée</div>
            <div className="flex items-center"><Cog6ToothIcon className="w-4 h-4 mr-1 inline text-gray-700" />Robot</div>
            <div className="flex items-center"><UserIcon className="w-4 h-4 mr-1 inline text-gray-700" />Employé saisonnier</div>
            <div className="flex items-center"><Cog6ToothIcon className="w-4 h-4 mr-1 inline text-yellow-500" />Alerte maintenance</div>
            <div className="flex items-center"><span className="ml-1 text-red-600 font-bold">▲</span>Alerte critique</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WeeklyPlan; 