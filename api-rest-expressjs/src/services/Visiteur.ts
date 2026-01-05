import { VisiteurModel, IVisiteurDocument } from '../models/Visiteur'; 
import { ICreateVisiteur } from '../models/interfaces/IVisiteur'; 

/**
 * Service pour gérer la logique métier des Visiteurs
 */
export class VisiteurService {

    /**
     * Créer un nouveau visiteur
     */
    public async createVisiteur(visiteurData: ICreateVisiteur): Promise<IVisiteurDocument> {
        try {
            const existingVisiteur = await VisiteurModel.findOne({ email: visiteurData.email });
            if (existingVisiteur) {
                throw new Error(`Un visiteur avec l'email ${visiteurData.email} existe déjà`);
            }
            const visiteur = new VisiteurModel(visiteurData);
            await visiteur.save();
            return visiteur;
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map((err: any) => err.message);
                throw new Error(`Validation échouée: ${messages.join(', ')}`);
            }
            throw error;
        }
    }

    /**
     * Action : ARRETER LE SUIVI (Réponse à votre story)
     * Cherche le suivi actif (sans dateFin) et définit la date de fin.
     */
    public async arreterSuivis(visiteurId: string, praticienId: string): Promise<IVisiteurDocument | null> {
        try {
            const visiteur = await VisiteurModel.findOneAndUpdate(
                { 
                    _id: visiteurId, 
                    "praticiensSuivis.praticienId": praticienId,
                    "praticiensSuivis.dateFin": { $exists: false } // On cible le suivi en cours
                },
                { 
                    $set: { "praticiensSuivis.$.dateFin": new Date() } // Met à jour la date de fin
                },
                { new: true }
            ).populate('praticiensSuivis.praticienId');

            if (!visiteur) {
                throw new Error(`Aucun suivi actif trouvé pour le praticien ${praticienId}`);
            }
            return visiteur;
        } catch (error: any) {
            if (error.name === 'CastError') throw new Error(`ID invalide`);
            throw error;
        }
    }

    /**
     * Action : SUPPRIMER DU PORTEFEUILLE
     * Retire totalement le praticien du secteur du visiteur.
     */
    public async supprimerDuPortefeuille(visiteurId: string, praticienId: string): Promise<IVisiteurDocument | null> {
        try {
            const visiteur = await VisiteurModel.findByIdAndUpdate(
                visiteurId,
                { $pull: { portefeuillePraticiens: praticienId } }, // Retire de la liste globale
                { new: true }
            );

            if (!visiteur) throw new Error(`Visiteur introuvable`);
            return visiteur;
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Ajouter un praticien au portefeuille et démarrer un suivi (FOLLOW)
     */
    public async followPraticien(visiteurId: string, praticienId: string): Promise<IVisiteurDocument | null> {
        try {
            const visiteur = await VisiteurModel.findByIdAndUpdate(
                visiteurId,
                { 
                    $addToSet: { portefeuillePraticiens: praticienId }, // Ajoute au portefeuille global
                    $push: { praticiensSuivis: { praticienId: praticienId, dateDebut: new Date() } } // Nouveau suivi
                },
                { new: true }
            ).populate('praticiensSuivis.praticienId');

            return visiteur;
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Récupérer tous les visiteurs
     */
    public async getAllVisiteurs(): Promise<IVisiteurDocument[]> {
        try {
            return await VisiteurModel.find().sort({ dateCreation: -1 }).exec();
        } catch (error) {
            throw new Error('Erreur lors de la récupération des visiteurs');
        }
    }

    /**
     * Récupérer un visiteur par son ID
     */
    public async getVisiteurById(id: string): Promise<IVisiteurDocument | null> {
        try {
            const visiteur = await VisiteurModel.findById(id)
                .populate('praticiensSuivis.praticienId')
                .populate('portefeuillePraticiens')
                .exec();
            
            if (!visiteur) throw new Error(`Visiteur introuvable`);
            return visiteur;
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Supprimer un visiteur (Compte utilisateur)
     */
    public async deleteVisiteur(id: string): Promise<IVisiteurDocument | null> {
        try {
            return await VisiteurModel.findByIdAndDelete(id);
        } catch (error: any) {
            throw error;
        }
    }
}