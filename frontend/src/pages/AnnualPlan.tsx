import React, { useState } from 'react';
import Navigation from '../components/Navigation';

const YEARS = [2024, 2023, 2022];
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

const parcelles = Array.from({ length: 10 }, (_, i) => `Parcelle ${i + 1}`);

// Exemple de données fictives pour les périodes
const periods = [
  // Pour chaque parcelle, on définit des périodes de semis, désherbage, récolte (en semaines)
  { semis: [2, 10], desherbage: [6, 7], recolte: [18, 20] },
  { semis: [3, 8], desherbage: [12, 13], recolte: [22, 25] },
  { semis: [5, 15], desherbage: [16, 17], recolte: [30, 33] },
  { semis: [8, 12], desherbage: [20, 21], recolte: [35, 38] },
  { semis: [1, 6], desherbage: [10, 11], recolte: [40, 43] },
  { semis: [7, 14], desherbage: [18, 19], recolte: [45, 48] },
  { semis: [12, 18], desherbage: [22, 23], recolte: [36, 39] },
  { semis: [4, 9], desherbage: [14, 15], recolte: [28, 31] },
  { semis: [6, 13], desherbage: [17, 18], recolte: [32, 35] },
  { semis: [2, 8], desherbage: [11, 12], recolte: [20, 23] },
];

const AnnualPlan: React.FC = () => {
  const [year, setYear] = useState(2024);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Planification annuelle des cultures</h1>
            <div className="flex space-x-2">
              <button className="btn-secondary flex items-center"><span className="mr-1">📤</span>Exporter</button>
              <button className="btn-primary flex items-center"><span className="mr-1">💾</span>Enregistrer</button>
            </div>
          </div>
          <p className="text-gray-600 mb-4">Définissez les périodes de semis, désherbage et récolte pour chaque parcelle</p>
          <div className="flex items-center space-x-4 mb-4">
            <label className="text-gray-700 font-medium">Année:</label>
            <select value={year} onChange={e => setYear(Number(e.target.value))} className="input-field w-24">
              {YEARS.map(y => <option key={y}>{y}</option>)}
            </select>
            <button className="text-green-600 font-medium flex items-center hover:underline"><span className="text-lg mr-1">●</span>Ajouter une parcelle</button>
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
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Parcelle</th>
                  {MONTHS.map((month, i) => (
                    <th key={month} colSpan={i === 11 ? 5 : 4} className="px-1 py-2 text-center font-normal text-gray-500 border-b border-gray-100">{month}</th>
                  ))}
                </tr>
                <tr>
                  <th className="px-4 py-1"></th>
                  {WEEKS.map(week => (
                    <th key={week} className="px-0 py-1 text-[10px] font-normal text-gray-400 border-b border-gray-50">{week}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parcelles.map((parcelle, idx) => (
                  <tr key={parcelle} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700 whitespace-nowrap">{parcelle}</td>
                    {WEEKS.map(week => {
                      // On affiche une barre colorée si la semaine est dans une période
                      let color = '';
                      if (week >= periods[idx].semis[0] && week <= periods[idx].semis[1]) color = COLORS.semis;
                      if (week >= periods[idx].desherbage[0] && week <= periods[idx].desherbage[1]) color = COLORS.desherbage;
                      if (week >= periods[idx].recolte[0] && week <= periods[idx].recolte[1]) color = COLORS.recolte;
                      return (
                        <td key={week} className="px-0 py-1 text-center">
                          {color && <div className={`h-3 rounded ${color}`}></div>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
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