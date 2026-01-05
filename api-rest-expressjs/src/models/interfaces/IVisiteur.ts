/**
 * Interface représentant un visiteur
 */
export interface IVisiteur {
  _id?: string;
  nom: Types.ObjectId;
  prenom: Types.ObjectId;
  email: string;
  date_embauche?: Date;
  telephone : string; 
  matricule : string;
  dateFin?: Date; // La fameuse date de fin
}


/**
 * Interface pour la création d'un visiteur
 */
export interface ICreateVisiteur {
  nom: Types.ObjectId;
  prenom: Types.ObjectId;
  email: string;
  date_embauche?: Date;
  telephone : string; 
  matricule : string;
  dateFin?: Date; // La fameuse date de fin

}