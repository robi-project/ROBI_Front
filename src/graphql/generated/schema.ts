export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Alerte = {
  __typename?: 'Alerte';
  culture?: Maybe<Culture>;
  date: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  niveau_urgence: Scalars['String']['output'];
  tache?: Maybe<Tache>;
  type: Scalars['String']['output'];
};

export type Culture = {
  __typename?: 'Culture';
  alertes: Array<Alerte>;
  date_recolte: Scalars['DateTimeISO']['output'];
  date_semis: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  legume: Legume;
  planche: Planche;
  recoltes: Array<Recolte>;
  rendement_prevu: Scalars['Float']['output'];
  rendement_reel: Scalars['Float']['output'];
  rotation_precedente: Scalars['String']['output'];
  semence: Semence;
  taches: Array<Tache>;
};

export type Exploitation = {
  __typename?: 'Exploitation';
  adresse: Scalars['String']['output'];
  certification: Scalars['String']['output'];
  date_creation: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  nom: Scalars['String']['output'];
  parcelles: Array<Parcelle>;
  surface: Scalars['Float']['output'];
};

export type Fournisseur = {
  __typename?: 'Fournisseur';
  certification: Scalars['String']['output'];
  contact: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  nom: Scalars['String']['output'];
  semences: Array<Semence>;
};

export type Legume = {
  __typename?: 'Legume';
  besoins: Scalars['String']['output'];
  compagnonnage: Scalars['String']['output'];
  contraintes: Scalars['String']['output'];
  cultures: Array<Culture>;
  cycle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  nom: Scalars['String']['output'];
  semences: Array<Semence>;
  tache_types: Array<TacheType>;
  variete: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAlerte: Alerte;
  addCulture: Culture;
  addExploitation: Exploitation;
  addFournisseur: Fournisseur;
  addLegume: Legume;
  addParcelle: Parcelle;
  addPlanche: Planche;
  addRecolte: Recolte;
  addRobot: Robot;
  addSemence: Semence;
  addTache: Tache;
  addTacheType: TacheType;
  addUtilisateur: Utilisateur;
  deleteAlerte: Scalars['Boolean']['output'];
  deleteCulture: Scalars['Boolean']['output'];
  deleteExploitation: Scalars['Boolean']['output'];
  deleteFournisseur: Scalars['Boolean']['output'];
  deleteLegume: Scalars['Boolean']['output'];
  deleteParcelle: Scalars['Boolean']['output'];
  deletePlanche: Scalars['Boolean']['output'];
  deleteRecolte: Scalars['Boolean']['output'];
  deleteRobot: Scalars['Boolean']['output'];
  deleteSemence: Scalars['Boolean']['output'];
  deleteTache: Scalars['Boolean']['output'];
  deleteTacheType: Scalars['Boolean']['output'];
  deleteUtilisateur: Scalars['Boolean']['output'];
  updateAlerte?: Maybe<Alerte>;
  updateCulture?: Maybe<Culture>;
  updateExploitation?: Maybe<Exploitation>;
  updateFournisseur?: Maybe<Fournisseur>;
  updateLegume?: Maybe<Legume>;
  updateParcelle?: Maybe<Parcelle>;
  updatePlanche?: Maybe<Planche>;
  updateRecolte?: Maybe<Recolte>;
  updateRobot?: Maybe<Robot>;
  updateSemence?: Maybe<Semence>;
  updateTache?: Maybe<Tache>;
  updateTacheType?: Maybe<TacheType>;
  updateUtilisateur?: Maybe<Utilisateur>;
};


export type MutationAddAlerteArgs = {
  data: NewAlerteInput;
};


export type MutationAddCultureArgs = {
  data: NewCultureInput;
};


export type MutationAddExploitationArgs = {
  data: NewExploitationInput;
};


export type MutationAddFournisseurArgs = {
  data: NewFournisseurInput;
};


export type MutationAddLegumeArgs = {
  data: NewLegumeInput;
};


export type MutationAddParcelleArgs = {
  data: NewParcelleInput;
};


export type MutationAddPlancheArgs = {
  data: NewPlancheInput;
};


export type MutationAddRecolteArgs = {
  data: NewRecolteInput;
};


export type MutationAddRobotArgs = {
  data: NewRobotInput;
};


export type MutationAddSemenceArgs = {
  data: NewSemenceInput;
};


export type MutationAddTacheArgs = {
  data: NewTacheInput;
};


export type MutationAddTacheTypeArgs = {
  data: NewTacheTypeInput;
};


export type MutationAddUtilisateurArgs = {
  data: NewUtilisateurInput;
};


export type MutationDeleteAlerteArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCultureArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteExploitationArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteFournisseurArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteLegumeArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteParcelleArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePlancheArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteRecolteArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteRobotArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSemenceArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTacheArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTacheTypeArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUtilisateurArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateAlerteArgs = {
  data: UpdateAlerteInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateCultureArgs = {
  data: UpdateCultureInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateExploitationArgs = {
  data: UpdateExploitationInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateFournisseurArgs = {
  data: UpdateFournisseurInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateLegumeArgs = {
  data: UpdateLegumeInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateParcelleArgs = {
  data: UpdateParcelleInput;
  id: Scalars['String']['input'];
};


export type MutationUpdatePlancheArgs = {
  data: UpdatePlancheInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateRecolteArgs = {
  data: UpdateRecolteInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateRobotArgs = {
  data: UpdateRobotInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateSemenceArgs = {
  data: UpdateSemenceInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateTacheArgs = {
  data: UpdateTacheInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateTacheTypeArgs = {
  data: UpdateTacheTypeInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateUtilisateurArgs = {
  data: UpdateUtilisateurInput;
  id: Scalars['String']['input'];
};

export type NewAlerteInput = {
  cultureId?: InputMaybe<Scalars['String']['input']>;
  date: Scalars['DateTimeISO']['input'];
  description: Scalars['String']['input'];
  niveau_urgence: Scalars['String']['input'];
  tacheId?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type NewCultureInput = {
  date_recolte: Scalars['DateTimeISO']['input'];
  date_semis: Scalars['DateTimeISO']['input'];
  legumeId?: InputMaybe<Scalars['String']['input']>;
  plancheId?: InputMaybe<Scalars['String']['input']>;
  rendement_prevu: Scalars['Float']['input'];
  rendement_reel: Scalars['Float']['input'];
  rotation_precedente: Scalars['String']['input'];
  semenceId?: InputMaybe<Scalars['String']['input']>;
};

export type NewExploitationInput = {
  adresse: Scalars['String']['input'];
  certification: Scalars['String']['input'];
  date_creation: Scalars['DateTimeISO']['input'];
  nom: Scalars['String']['input'];
  surface: Scalars['Float']['input'];
};

export type NewFournisseurInput = {
  certification: Scalars['String']['input'];
  contact: Scalars['String']['input'];
  nom: Scalars['String']['input'];
};

export type NewLegumeInput = {
  besoins: Scalars['String']['input'];
  compagnonnage: Scalars['String']['input'];
  contraintes: Scalars['String']['input'];
  cycle: Scalars['String']['input'];
  nom: Scalars['String']['input'];
  variete: Scalars['String']['input'];
};

export type NewParcelleInput = {
  exploitationId?: InputMaybe<Scalars['String']['input']>;
  nom: Scalars['String']['input'];
  surface: Scalars['Float']['input'];
  type_terre: Scalars['String']['input'];
};

export type NewPlancheInput = {
  largeur: Scalars['Float']['input'];
  longueur: Scalars['Float']['input'];
  numero: Scalars['Int']['input'];
  parcelleId?: InputMaybe<Scalars['String']['input']>;
};

export type NewRecolteInput = {
  cultureId?: InputMaybe<Scalars['String']['input']>;
  date: Scalars['DateTimeISO']['input'];
  destination: Scalars['String']['input'];
  qualite: Scalars['String']['input'];
  quantite: Scalars['Float']['input'];
};

export type NewRobotInput = {
  commentaires: Scalars['String']['input'];
  date_achat: Scalars['DateTimeISO']['input'];
  etat: Scalars['String']['input'];
  nom: Scalars['String']['input'];
};

export type NewSemenceInput = {
  certificat: Scalars['String']['input'];
  date_achat: Scalars['DateTimeISO']['input'];
  facture: Scalars['String']['input'];
  fournisseurId?: InputMaybe<Scalars['String']['input']>;
  legumeId?: InputMaybe<Scalars['String']['input']>;
  numero_lot: Scalars['String']['input'];
};

export type NewTacheInput = {
  commentaire: Scalars['String']['input'];
  cultureId?: InputMaybe<Scalars['String']['input']>;
  date_prevue: Scalars['DateTimeISO']['input'];
  date_realisee?: InputMaybe<Scalars['DateTimeISO']['input']>;
  nom: Scalars['String']['input'];
  robotId?: InputMaybe<Scalars['String']['input']>;
  statut: Scalars['String']['input'];
  tacheTypeId?: InputMaybe<Scalars['String']['input']>;
  utilisateurId?: InputMaybe<Scalars['String']['input']>;
};

export type NewTacheTypeInput = {
  description: Scalars['String']['input'];
  duree_estimee: Scalars['Float']['input'];
  legumeId?: InputMaybe<Scalars['String']['input']>;
  nom: Scalars['String']['input'];
  parametres: Scalars['String']['input'];
};

export type NewUtilisateurInput = {
  actif: Scalars['Boolean']['input'];
  contact: Scalars['String']['input'];
  date_creation: Scalars['DateTimeISO']['input'];
  date_der_connex: Scalars['DateTimeISO']['input'];
  date_embauche: Scalars['DateTimeISO']['input'];
  email: Scalars['String']['input'];
  mot_de_passe: Scalars['String']['input'];
  nom: Scalars['String']['input'];
  prenom: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type Parcelle = {
  __typename?: 'Parcelle';
  exploitation: Exploitation;
  id: Scalars['ID']['output'];
  nom: Scalars['String']['output'];
  planches: Array<Planche>;
  surface: Scalars['Float']['output'];
  type_terre: Scalars['String']['output'];
};

export type Planche = {
  __typename?: 'Planche';
  cultures: Array<Culture>;
  id: Scalars['ID']['output'];
  largeur: Scalars['Float']['output'];
  longueur: Scalars['Float']['output'];
  numero: Scalars['Int']['output'];
  parcelle: Parcelle;
};

export type Query = {
  __typename?: 'Query';
  getAlerteById?: Maybe<Alerte>;
  getAllAlertes: Array<Alerte>;
  getAllCultures: Array<Culture>;
  getAllExploitations: Array<Exploitation>;
  getAllFournisseurs: Array<Fournisseur>;
  getAllLegumes: Array<Legume>;
  getAllParcelles: Array<Parcelle>;
  getAllPlanches: Array<Planche>;
  getAllRecoltes: Array<Recolte>;
  getAllRobots: Array<Robot>;
  getAllSemences: Array<Semence>;
  getAllTacheTypes: Array<TacheType>;
  getAllTaches: Array<Tache>;
  getAllUtilisateurs: Array<Utilisateur>;
  getCultureById?: Maybe<Culture>;
  getExploitationById?: Maybe<Exploitation>;
  getFournisseurById?: Maybe<Fournisseur>;
  getLegumeById?: Maybe<Legume>;
  getParcelleById?: Maybe<Parcelle>;
  getPlancheById?: Maybe<Planche>;
  getRecolteById?: Maybe<Recolte>;
  getRobotById?: Maybe<Robot>;
  getSemenceById?: Maybe<Semence>;
  getTacheById?: Maybe<Tache>;
  getTacheTypeById?: Maybe<TacheType>;
  getUtilisateurById?: Maybe<Utilisateur>;
};


export type QueryGetAlerteByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCultureByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetExploitationByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetFournisseurByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetLegumeByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetParcelleByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetPlancheByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetRecolteByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetRobotByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSemenceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetTacheByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetTacheTypeByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUtilisateurByIdArgs = {
  id: Scalars['String']['input'];
};

export type Recolte = {
  __typename?: 'Recolte';
  culture: Culture;
  date: Scalars['DateTimeISO']['output'];
  destination: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  qualite: Scalars['String']['output'];
  quantite: Scalars['Float']['output'];
};

export type Robot = {
  __typename?: 'Robot';
  commentaires: Scalars['String']['output'];
  date_achat: Scalars['DateTimeISO']['output'];
  etat: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  nom: Scalars['String']['output'];
  taches?: Maybe<Array<Tache>>;
};

export type Semence = {
  __typename?: 'Semence';
  certificat: Scalars['String']['output'];
  cultures: Array<Culture>;
  date_achat: Scalars['DateTimeISO']['output'];
  facture: Scalars['String']['output'];
  fournisseur: Fournisseur;
  id: Scalars['ID']['output'];
  legume: Legume;
  numero_lot: Scalars['String']['output'];
};

export type Tache = {
  __typename?: 'Tache';
  alertes?: Maybe<Array<Alerte>>;
  commentaire: Scalars['String']['output'];
  culture: Culture;
  date_prevue: Scalars['DateTimeISO']['output'];
  date_realisee?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  nom: Scalars['String']['output'];
  robot?: Maybe<Robot>;
  statut: Scalars['String']['output'];
  tache_type: TacheType;
  utilisateur?: Maybe<Utilisateur>;
};

export type TacheType = {
  __typename?: 'TacheType';
  description: Scalars['String']['output'];
  duree_estimee: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  legume: Legume;
  nom: Scalars['String']['output'];
  parametres: Scalars['String']['output'];
  taches: Array<Tache>;
};

export type UpdateAlerteInput = {
  cultureId?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  niveau_urgence?: InputMaybe<Scalars['String']['input']>;
  tacheId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCultureInput = {
  date_recolte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  date_semis?: InputMaybe<Scalars['DateTimeISO']['input']>;
  legumeId?: InputMaybe<Scalars['String']['input']>;
  plancheId?: InputMaybe<Scalars['String']['input']>;
  rendement_prevu?: InputMaybe<Scalars['Float']['input']>;
  rendement_reel?: InputMaybe<Scalars['Float']['input']>;
  rotation_precedente?: InputMaybe<Scalars['String']['input']>;
  semenceId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExploitationInput = {
  adresse?: InputMaybe<Scalars['String']['input']>;
  certification?: InputMaybe<Scalars['String']['input']>;
  date_creation?: InputMaybe<Scalars['DateTimeISO']['input']>;
  nom?: InputMaybe<Scalars['String']['input']>;
  surface?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateFournisseurInput = {
  certification?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  nom?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLegumeInput = {
  besoins?: InputMaybe<Scalars['String']['input']>;
  compagnonnage?: InputMaybe<Scalars['String']['input']>;
  contraintes?: InputMaybe<Scalars['String']['input']>;
  cycle?: InputMaybe<Scalars['String']['input']>;
  nom?: InputMaybe<Scalars['String']['input']>;
  variete?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateParcelleInput = {
  exploitationId?: InputMaybe<Scalars['String']['input']>;
  nom?: InputMaybe<Scalars['String']['input']>;
  surface?: InputMaybe<Scalars['Float']['input']>;
  type_terre?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePlancheInput = {
  largeur?: InputMaybe<Scalars['Float']['input']>;
  longueur?: InputMaybe<Scalars['Float']['input']>;
  numero?: InputMaybe<Scalars['Int']['input']>;
  parcelleId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRecolteInput = {
  cultureId?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  destination?: InputMaybe<Scalars['String']['input']>;
  qualite?: InputMaybe<Scalars['String']['input']>;
  quantite?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateRobotInput = {
  commentaires?: InputMaybe<Scalars['String']['input']>;
  date_achat?: InputMaybe<Scalars['DateTimeISO']['input']>;
  etat?: InputMaybe<Scalars['String']['input']>;
  nom?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSemenceInput = {
  certificat?: InputMaybe<Scalars['String']['input']>;
  date_achat?: InputMaybe<Scalars['DateTimeISO']['input']>;
  facture?: InputMaybe<Scalars['String']['input']>;
  fournisseurId?: InputMaybe<Scalars['String']['input']>;
  legumeId?: InputMaybe<Scalars['String']['input']>;
  numero_lot?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTacheInput = {
  commentaire?: InputMaybe<Scalars['String']['input']>;
  cultureId?: InputMaybe<Scalars['String']['input']>;
  date_prevue?: InputMaybe<Scalars['DateTimeISO']['input']>;
  date_realisee?: InputMaybe<Scalars['DateTimeISO']['input']>;
  nom?: InputMaybe<Scalars['String']['input']>;
  robotId?: InputMaybe<Scalars['String']['input']>;
  statut?: InputMaybe<Scalars['String']['input']>;
  tacheTypeId?: InputMaybe<Scalars['String']['input']>;
  utilisateurId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTacheTypeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  duree_estimee?: InputMaybe<Scalars['Float']['input']>;
  legumeId?: InputMaybe<Scalars['String']['input']>;
  nom?: InputMaybe<Scalars['String']['input']>;
  parametres?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUtilisateurInput = {
  actif?: InputMaybe<Scalars['Boolean']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  date_creation?: InputMaybe<Scalars['DateTimeISO']['input']>;
  date_der_connex?: InputMaybe<Scalars['DateTimeISO']['input']>;
  date_embauche?: InputMaybe<Scalars['DateTimeISO']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  mot_de_passe?: InputMaybe<Scalars['String']['input']>;
  nom?: InputMaybe<Scalars['String']['input']>;
  prenom?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type Utilisateur = {
  __typename?: 'Utilisateur';
  actif: Scalars['Boolean']['output'];
  contact: Scalars['String']['output'];
  date_creation: Scalars['DateTimeISO']['output'];
  date_der_connex: Scalars['DateTimeISO']['output'];
  date_embauche: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mot_de_passe: Scalars['String']['output'];
  nom: Scalars['String']['output'];
  prenom: Scalars['String']['output'];
  role: Scalars['String']['output'];
  taches?: Maybe<Array<Tache>>;
};
