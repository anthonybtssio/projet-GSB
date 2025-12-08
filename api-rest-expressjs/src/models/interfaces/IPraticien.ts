/**
 * Interface représentant un visiteur
 */
export interface IPraticien {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  adresse : string;
telephone : string; 
ville : string; 
cp : string; 
coef_notoriete?: number;
}


/**
 * Interface pour la création d'un visiteur
 */
export interface ICreatePraticien {
   nom: string;
  prenom: string;
  email: string;
  adresse : string;
telephone : string; 
ville : string; 
cp : string; 
coef_notoriete?: number;

}