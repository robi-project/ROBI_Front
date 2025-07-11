import React, { useState } from "react";
import { useAddRobotMutation } from "./generated/AddRobot.generated";

const AddRobotForm = () => {
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nom}
        onChange={e => setNom(e.target.value)}
        placeholder="Nom du robot"
        required
      />
      <input
        value={etat}
        onChange={e => setEtat(e.target.value)}
        placeholder="État du robot"
        required
      />
      <button type="submit" disabled={loading}>
        Ajouter
      </button>
      {error && <p>Erreur : {error.message}</p>}
      {data && <p>Robot ajouté : {data.addRobot.nom}</p>}
    </form>
  );
};

export default AddRobotForm;
