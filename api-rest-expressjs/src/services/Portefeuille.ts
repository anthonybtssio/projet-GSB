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
      .populate('praticien') // Pour récupérer les détails (nom, prenom...) du praticien
      .exec();
  }
}