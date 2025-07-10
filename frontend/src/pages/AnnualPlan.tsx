import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { useNavigate } from 'react-router-dom';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 6 }, (_, i) => 2022 + i); // 2022 à 2027
const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];
const WEEKS = Array.from({ length: 52 }, (_, i) => i + 1);

const COLORS = {
  semis: 'bg-green-100 border-green-400',
  desherbage: 'bg-blue-100 border-blue-400',
  recolte: 'bg-orange-100 border-orange-400',
};

// Structure des zones et planches (identique à WeeklyPlan)
const ZONES = [
  {
    name: 'Zone A1',
    planches: [
      { name: 'Planche A1-P1' },
      { name: 'Planche A1-P2' },
      { name: 'Planche A1-P3' },
    ],
  },
  {
    name: 'Zone A2',
    planches: [
      { name: 'Planche A2-P1' },
      { name: 'Planche A2-P2' },
    ],
  },
  {
    name: 'Zone A3',
    planches: [
      { name: 'Planche A3-P1' },
      { name: 'Planche A3-P2' },
    ],
  },
];

// Extraire toutes les planches pour les périodes
const allPlanches = ZONES.flatMap(zone => zone.planches);

function getPeriodsForYear(year: number) {
  // Génère des périodes fictives différentes selon l'année pour chaque planche
  return allPlanches.map((planche, idx) => {
    const base = (year - 2022) * 2 + idx;
    return {
      semis: [2 + base, 10 + base],
      desherbage: [6 + base, 7 + base],
      recolte: [18 + base, 20 + base],
    };
  });
}

function getMondayOfWeek(year: number, week: number) {
  // ISO week: lundi = premier jour
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dow = simple.getDay();
  const monday = new Date(simple);
  monday.setDate(simple.getDate() + (dow === 0 ? -6 : 1) - dow);
  return monday;
}

const AnnualPlan: React.FC = () => {
  const [year, setYear] = useState(CURRENT_YEAR);
  const [periods, setPeriods] = useState(getPeriodsForYear(CURRENT_YEAR));
  const navigate = useNavigate();

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = Number(e.target.value);
    setYear(newYear);
    setPeriods(getPeriodsForYear(newYear));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Planification annuelle des cultures</h1>
            <p className="text-gray-500 text-sm">Planification des périodes de semis, désherbage et récolte par planche</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn-secondary flex items-center">📤 Exporter</button>
            <button className="btn-primary flex items-center">💾 Enregistrer</button>
          </div>
        </div>
        <p className="text-gray-600 mb-4">Définissez les périodes de semis, désherbage et récolte pour chaque planche</p>
        <div className="flex items-center space-x-4 mb-4">
          <label className="text-gray-700 font-medium">Année:</label>
          <select value={year} onChange={handleYearChange} className="input-field w-24">
            {YEARS.map(y => <option key={y}>{y}</option>)}
          </select>
          <button className="text-green-600 font-medium flex items-center hover:underline"><span className="text-lg mr-1">●</span>Ajouter une planche</button>
        </div>
        {/* Légende */}
        <div className="flex items-center space-x-6 mb-4">
          <div className="flex items-center"><span className="w-5 h-3 rounded bg-green-100 border border-green-400 mr-2"></span>Semis</div>
          <div className="flex items-center"><span className="w-5 h-3 rounded bg-blue-100 border border-blue-400 mr-2"></span>Désherbage</div>
          <div className="flex items-center"><span className="w-5 h-3 rounded bg-orange-100 border border-orange-400 mr-2"></span>Récolte</div>
        </div>
        {/* Tableau */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Zone / Planche</th>
                {MONTHS.map((month, i) => (
                  <th key={month} colSpan={i === 11 ? 5 : 4} className="px-1 py-2 text-center font-normal text-gray-500 border-b border-gray-100">{month}</th>
                ))}
              </tr>
              <tr>
                <th className="px-4 py-1"></th>
                {WEEKS.map(week => (
                  <th key={week} className="px-1 py-1 text-[12px] font-normal text-gray-400 border-b border-gray-50">
                    <button
                      className="transition-colors duration-150 rounded-md px-2 py-1 font-semibold text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-300"
                      style={{ minWidth: 28 }}
                      title={`Voir la semaine ${week}`}
                      onClick={() => {
                        const monday = getMondayOfWeek(year, week);
                        navigate(`/weekly-plan?date=${monday.toISOString().slice(0, 10)}`);
                      }}
                    >
                      {week}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ZONES.map((zone) => (
                <React.Fragment key={zone.name}>
                  {/* Planches de la zone */}
                  {zone.planches.map((planche, plancheIdx) => {
                    const globalIdx = ZONES.flatMap(z => z.planches).findIndex(p => p.name === planche.name);
                    return (
                      <tr key={planche.name} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="px-4 py-2 font-medium text-gray-700 whitespace-nowrap">{planche.name}</td>
                        {WEEKS.map(week => {
                          let color = '';
                          if (week >= periods[globalIdx].semis[0] && week <= periods[globalIdx].semis[1]) color = COLORS.semis;
                          if (week >= periods[globalIdx].desherbage[0] && week <= periods[globalIdx].desherbage[1]) color = COLORS.desherbage;
                          if (week >= periods[globalIdx].recolte[0] && week <= periods[globalIdx].recolte[1]) color = COLORS.recolte;
                          return (
                            <td key={week} className="px-0 py-1 text-center">
                              {color && <div className={`h-3 rounded ${color}`}></div>}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full border-t bg-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs text-gray-400">
          <span>© 2024 ROBI - Robots Autonomes pour le Maraîchage</span>
          <button className="btn-primary">+ Nouvelle culture</button>
        </div>
      </footer>
    </div>
  );
};

export default AnnualPlan; 