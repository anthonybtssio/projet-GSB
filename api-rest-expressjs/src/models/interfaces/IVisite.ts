/**
 * Interface représentant la structure d'une Visite
 */
export interface IVisite {
  nom: string;
  prenom: string;
  email: string;
  dateCreation?: Date;
}

/**
 * Interface pour les données nécessaires à la création d'une visite
 */
export interface ICreateVisite {
  nom: string;
  prenom: string;
  email: string;
}