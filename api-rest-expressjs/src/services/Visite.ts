import { VisiteModel, IVisiteDocument } from '../models/Visite';

export class VisiteurService {
  
  /**
   * getAllVisiteurs : Uniquement _id, nom, prénom, email, tel
   * Exclut les listes "Visites" et "Portefeuille"
   */
  public async getAllVisiteurs(): Promise<IVisiteDocument[]> {
    try {
      // .select() permet de ne retourner que les champs mentionnés
      return await VisiteModel.find()
        .select('_id nom prenom email tel') 
        .sort({ nom: 1 })
        .exec();
    } catch (error) {
      throw new Error('Erreur lors de la récupération des visiteurs');
    }
  }

  /**
   * getVisiteurById : Uniquement _id, nom, prénom, email, tel
   * Exclut la date d'embauche et les listes enfants
   */
  public async getVisiteurById(id: string): Promise<IVisiteDocument | null> {
    try {
      const visiteur = await VisiteModel.findById(id)
        .select('_id nom prenom email tel')
        .exec();
      
      if (!visiteur) throw new Error(`Visiteur ${id} introuvable`);
      return visiteur;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * getPortefeuilleByVisiteurId
   * Retourne la liste des liens "portefeuille" avec population des praticiens
   */
  public async getPortefeuille(visiteurId: string) {
    try {
      const visiteur = await VisiteModel.findById(visiteurId)
        .select('portefeuille') // On ne prend que le champ portefeuille
        .populate({
          path: 'portefeuille.praticien',
          select: '-__v' // On peut exclure des champs techniques du praticien ici
        })
        .exec();
      
      if (!visiteur) throw new Error("Visiteur introuvable");
      return visiteur.portefeuille;
    } catch (error) {
      throw new Error("Erreur lors de la récupération du portefeuille");
    }
  }

  /**
   * deletePraticienFromPortefeuille
   * Supprime uniquement le lien (l'entrée dans le tableau)
   */
  public async removePraticien(visiteurId: string, praticienId: string) {
    try {
      return await VisiteModel.findByIdAndUpdate(
        visiteurId,
        { $pull: { portefeuille: { praticien: praticienId } } },
        { new: true }
      ).select('portefeuille');
    } catch (error) {
      throw new Error("Erreur lors de la suppression du praticien du portefeuille");
    }
  }
}