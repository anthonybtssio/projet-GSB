import { PortefeuilleModel, IPortefeuilleDocument } from '../models/Portefeuille';
import { ICreatePortefeuille } from '../models/interfaces/IPortefeuille';

export class PortefeuilleService {

  // Créer un lien
  public async ajouterPraticien(data: ICreatePortefeuille): Promise<IPortefeuilleDocument> {
    const portefeuille = new PortefeuilleModel(data);
    await portefeuille.save();
    return portefeuille;
  }

  // Récupérer les praticiens d'un visiteur
  public async getPraticiensByVisiteurId(visiteurId: string): Promise<IPortefeuilleDocument[]> {
    return await PortefeuilleModel.find({ visiteur: visiteurId })
      .populate('praticien')
      .exec();
  }

  /**
   * SUPPRIMER UN LIEN PRÉCIS
   * Retire le lien entre un visiteur et UN praticien spécifique
   */
  public async retirerPraticien(visiteurId: string, praticienId: string): Promise<IPortefeuilleDocument | null> {
    // On cherche l'entrée qui contient à la fois cet ID visiteur ET cet ID praticien
    return await PortefeuilleModel.findOneAndDelete({ 
      visiteur: visiteurId, 
      praticien: praticienId 
    }).exec();
  }
}