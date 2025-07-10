import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { ChevronDownIcon, ChevronRightIcon, UserIcon, Cog6ToothIcon, ChevronLeftIcon, ChevronRightIcon as ArrowRightIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'react-router-dom';

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

// Couleurs par type de tâche
const TASK_COLORS: Record<string, string> = {
  'Préparation': 'bg-blue-50 border-blue-300 text-blue-900',
  'Désherbage': 'bg-green-50 border-green-300 text-green-900',
  'Arrosage': 'bg-blue-100 border-blue-400 text-blue-900',
  'Plantation': 'bg-purple-50 border-purple-300 text-purple-900',
  'Récolte': 'bg-yellow-50 border-yellow-300 text-yellow-900',
};

// Exemple de structure de tâches avec date
const ZONES = [
  {
    name: 'Zone A1',
    alert: 'maintenance',
    planches: [
      {
        name: 'Planche A1-P1',
        tasks: [
          { date: '2025-02-03', label: 'Robot-01', type: 'Arrosage', robot: true },
          { date: '2025-02-04', label: 'Robot-02', type: 'Préparation', robot: true },
        ],
      },
      {
        name: 'Planche A1-P2',
        tasks: [
          { date: '2025-02-03', label: 'Marc D.', type: 'Désherbage', robot: false },
          { date: '2025-02-04', label: 'Robot-03', type: 'Arrosage', robot: true },
          { date: '2025-02-06', label: 'Julie L.', type: 'Récolte', robot: false },
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
          { date: '2025-02-05', label: 'Robot-01', type: 'Arrosage', robot: true },
          { date: '2025-02-06', label: 'Robot-01', type: 'Arrosage', robot: true },
        ],
      },
      {
        name: 'Planche A2-P2',
        tasks: [
          { date: '2025-02-04', label: 'Paul M.', type: 'Désherbage', robot: false },
          { date: '2025-02-07', label: 'Robot-01', type: 'Arrosage', robot: true },
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
          { date: '2025-02-09', label: 'Sophie R.', type: 'Récolte', robot: false },
        ],
      },
    ],
  },
];

function getWeekDates(startDate: Date) {
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatHeader(date: Date) {
  return `${date.getDate()} ${date.toLocaleString('fr-FR', { month: 'short' })}`;
}

function getWeekNumber(date: Date) {
  // ISO week number (lundi = premier jour)
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return weekNum;
}

function getWeekLabel(dates: Date[]) {
  const first = dates[0];
  const last = dates[6];
  return `du ${first.getDate()} ${first.toLocaleString('fr-FR', { month: 'long' })} ${first.getFullYear()} au ${last.getDate()} ${last.toLocaleString('fr-FR', { month: 'long' })} ${last.getFullYear()}`;
}

const WeeklyPlan: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');
  // Semaine du 3 février 2025 par défaut, ou date passée en paramètre
  const initialDate = dateParam ? new Date(dateParam) : new Date('2025-02-03');
  const [weekStart, setWeekStart] = useState(initialDate);
  const [openZones, setOpenZones] = useState<Record<string, boolean>>({});
  const [selectedZone, setSelectedZone] = useState<string>('Toutes les zones');

  const weekDates = getWeekDates(weekStart);

  // Filtrer les zones selon la sélection
  const filteredZones = selectedZone === 'Toutes les zones' 
    ? ZONES 
    : ZONES.filter(zone => zone.name === selectedZone);

  // Vérifier si toutes les zones sont ouvertes
  const allZonesOpen = filteredZones.every(zone => openZones[zone.name]);

  const prevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
  };
  const nextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  };

  const toggleZone = (zoneName: string) => {
    setOpenZones((prev) => ({ ...prev, [zoneName]: !prev[zoneName] }));
  };

  const toggleAllZones = () => {
    if (allZonesOpen) {
      // Fermer toutes les zones
      const allClosed = filteredZones.reduce((acc, zone) => {
        acc[zone.name] = false;
        return acc;
      }, {} as Record<string, boolean>);
      setOpenZones(allClosed);
    } else {
      // Ouvrir toutes les zones
      const allOpen = filteredZones.reduce((acc, zone) => {
        acc[zone.name] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setOpenZones(allOpen);
    }
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
            <button onClick={prevWeek} className="btn-secondary flex items-center px-2 py-2"><ChevronLeftIcon className="w-5 h-5" /></button>
            <span className="font-medium text-gray-700 text-lg">{getWeekLabel(weekDates)}</span>
            <button onClick={nextWeek} className="btn-secondary flex items-center px-2 py-2"><ArrowRightIcon className="w-5 h-5" /></button>
            <select 
              value={selectedZone} 
              onChange={(e) => setSelectedZone(e.target.value)}
              className="input-field"
            >
              <option>Toutes les zones</option>
              {ZONES.map(z => <option key={z.name}>{z.name}</option>)}
            </select>
            <span className="ml-4 px-4 py-2 rounded-full bg-green-100 text-green-800 font-semibold text-sm border border-green-300 min-w-[120px] text-center">
              Semaine {getWeekNumber(weekDates[0])}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 w-48">
                    <div className="flex items-center">
                      Planches/Zones
                      <button 
                        onClick={toggleAllZones}
                        className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors duration-150"
                        title={allZonesOpen ? "Tout plier" : "Tout déplier"}
                      >
                        {allZonesOpen ? (
                          <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                        ) : (
                          <ChevronRightIcon className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </th>
                  {weekDates.map((date, i) => (
                    <th key={i} className="px-4 py-2 text-center font-normal text-gray-500">{DAYS[i]} {formatHeader(date)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredZones.map((zone) => (
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
                    {openZones[zone.name] && zone.planches.map((planche) => (
                      <tr key={planche.name} className="border-b border-gray-100">
                        <td className="px-4 py-2 text-gray-700 whitespace-nowrap font-medium bg-gray-50">{planche.name}</td>
                        {weekDates.map((date, dayIdx) => {
                          const task = planche.tasks.find(t => t.date === formatDate(date));
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