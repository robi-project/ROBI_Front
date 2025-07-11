import React, { useState } from 'react';
import { PlusIcon, PencilSquareIcon, TrashIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Navigation from '../components/Navigation';

interface Seed {
  id: string;
  category: 'Légume' | 'Fruit';
  espece: string;
  variete: string;
  fournisseur: string;
  fournisseurColor: string;
  facture: string;
  stock: number;
  dateAchat: string;
}

const fournisseurs = [
  { name: 'Voltz', color: 'bg-blue-600' },
  { name: 'Essem Bio', color: 'bg-green-500' },
  { name: 'Truffaut', color: 'bg-red-500' },
];

const seeds: Seed[] = [
  { id: '1', category: 'Légume', espece: 'Courgette', variete: 'DUNJA F1', fournisseur: 'Voltz', fournisseurColor: 'bg-blue-600', facture: 'VOL-2023-0456', stock: 1.5, dateAchat: '15/03/2023' },
  { id: '2', category: 'Légume', espece: 'Courgette', variete: 'ZELIA F1', fournisseur: 'Essem Bio', fournisseurColor: 'bg-green-500', facture: 'ESB-2023-1278', stock: 0.8, dateAchat: '22/02/2023' },
  { id: '3', category: 'Légume', espece: 'Tomate', variete: 'Brenda F1', fournisseur: 'Voltz', fournisseurColor: 'bg-blue-600', facture: 'VOL-2023-0789', stock: 0.25, dateAchat: '10/01/2023' },
  { id: '4', category: 'Légume', espece: 'Tomate', variete: 'Tyfrane F1', fournisseur: 'Truffaut', fournisseurColor: 'bg-red-500', facture: 'TRU-2023-3456', stock: 0.5, dateAchat: '05/02/2023' },
  { id: '5', category: 'Légume', espece: 'Pomme de Terre', variete: 'NICOLA', fournisseur: 'Essem Bio', fournisseurColor: 'bg-green-500', facture: 'ESB-2023-2345', stock: 25, dateAchat: '18/02/2023' },
  { id: '6', category: 'Légume', espece: 'Pomme de Terre', variete: 'Valery', fournisseur: 'Voltz', fournisseurColor: 'bg-blue-600', facture: 'VOL-2023-1023', stock: 18.5, dateAchat: '25/02/2023' },
  { id: '7', category: 'Fruit', espece: 'Fraise', variete: 'Gariguette', fournisseur: 'Truffaut', fournisseurColor: 'bg-red-500', facture: 'TRU-2023-4567', stock: 0.1, dateAchat: '12/03/2023' },
  { id: '8', category: 'Fruit', espece: 'Melon', variete: 'Charentais', fournisseur: 'Essem Bio', fournisseurColor: 'bg-green-500', facture: 'ESB-2023-3456', stock: 0.5, dateAchat: '20/03/2023' },
];

const SeedManagement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes les catégories');
  const [selectedFournisseur, setSelectedFournisseur] = useState<string>('Tous les fournisseurs');
  const [search, setSearch] = useState('');

  const filteredSeeds = seeds.filter(seed => {
    const matchCategory = selectedCategory === 'Toutes les catégories' || seed.category === selectedCategory;
    const matchFournisseur = selectedFournisseur === 'Tous les fournisseurs' || seed.fournisseur === selectedFournisseur;
    const matchSearch =
      seed.espece.toLowerCase().includes(search.toLowerCase()) ||
      seed.variete.toLowerCase().includes(search.toLowerCase()) ||
      seed.fournisseur.toLowerCase().includes(search.toLowerCase()) ||
      seed.facture.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchFournisseur && matchSearch;
  });

  const groupedSeeds = {
    Légume: filteredSeeds.filter(s => s.category === 'Légume'),
    Fruit: filteredSeeds.filter(s => s.category === 'Fruit'),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des semis</h1>
            <p className="text-gray-500 text-sm">Inventaire des stocks par espèce, variété et fournisseur</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn-secondary flex items-center"><ArrowDownTrayIcon className="w-4 h-4 mr-1" />Exporter</button>
            <button className="btn-primary flex items-center"><PlusIcon className="w-4 h-4 mr-1" />Ajouter un semis</button>
          </div>
        </div>
        {/* Filtres */}
        <div className="flex items-center space-x-4 mb-6">
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="input-field w-56">
            <option>Toutes les catégories</option>
            <option>Légume</option>
            <option>Fruit</option>
          </select>
          <select value={selectedFournisseur} onChange={e => setSelectedFournisseur(e.target.value)} className="input-field w-56">
            <option>Tous les fournisseurs</option>
            {fournisseurs.map(f => <option key={f.name}>{f.name}</option>)}
          </select>
          <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="input-field w-72" />
        </div>
        {/* Tableaux */}
        {(['Légume', 'Fruit'] as const).map(category => (
          <div key={category} className="mb-8">
            <div className="flex items-center mb-2">
              <span className="text-xl font-semibold">
                {category === 'Légume' ? '🥕' : '🍎'} {category}
              </span>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Espèce</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Variété</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fournisseur</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">N° Facture</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Stock (kg)</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date achat</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedSeeds[category].length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center text-gray-400 py-6">Aucun semis</td>
                    </tr>
                  ) : (
                    groupedSeeds[category].map(seed => (
                      <tr key={seed.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{seed.espece}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{seed.variete}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${seed.fournisseurColor}`}></span>{seed.fournisseur}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{seed.facture}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">{seed.stock}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{seed.dateAchat}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-center">
                          <button className="text-gray-400 hover:text-primary-600 mr-2"><PencilSquareIcon className="w-5 h-5" /></button>
                          <button className="text-gray-400 hover:text-red-600"><TrashIcon className="w-5 h-5" /></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeedManagement; 