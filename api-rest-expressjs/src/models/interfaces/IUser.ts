/**
 * Interface représentant un utilisateur
 */
export interface IUser {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  dateCreation?: Date;
}


/**
 * Interface pour la création d'un utilisateur
 */
export interface ICreateUser {
  nom: string;
  prenom: string;
  email: string;
}
