// anthonybtssio/projet-gsb/projet-GSB-32f54fcdedb92e9201a1b0fa5693f1ed15252035/api-rest-expressjs/src/models/interfaces/IVisiteur.ts
import { Types } from 'mongoose'; // <-- AJOUTER L'IMPORT Types

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
  // --- DÉBUT AJOUT ---
  portefeuillePraticiens?: Types.ObjectId[]; // Tableau de références vers Praticien
  // --- FIN AJOUT ---
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