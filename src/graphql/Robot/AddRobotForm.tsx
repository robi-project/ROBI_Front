import React, { useState } from "react";
import { useAddRobotMutation } from "./generated/AddRobot.generated";

const AddRobotForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [nom, setNom] = useState("");
  const [etat, setEtat] = useState("");
  const [addRobot, { data, loading, error }] = useAddRobotMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addRobot({
      variables: {
        data: {
          nom,
          etat
        }
      }
    });
    setNom("");
    setEtat("");
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom du robot</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={nom}
          onChange={e => setNom(e.target.value)}
          placeholder="Nom du robot"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">État du robot</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={etat}
          onChange={e => setEtat(e.target.value)}
          placeholder="État du robot"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Ajouter
      </button>
      {error && <p className="text-red-500">Erreur : {error.message}</p>}
      {data && <p className="text-green-600">Robot ajouté : {data.addRobot.nom}</p>}
    </form>
  );
};

export default AddRobotForm;
