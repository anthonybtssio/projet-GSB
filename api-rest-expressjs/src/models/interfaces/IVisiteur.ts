/**
 * Interface représentant un visiteur
 */
export interface IVisiteur {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  date_embauche?: Date;
  telephone : string; 
  matricule : string;
}


/**
 * Interface pour la création d'un visiteur
 */
export interface ICreateVisiteur {
  nom: string;
  prenom: string;
  email: string;
  date_embauche?: Date;
  telephone : string; 
  matricule : string;

}