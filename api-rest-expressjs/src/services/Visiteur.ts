// Assurez-vous que ces fichiers existent et utilisent le terme Visiteur
import { VisiteurModel, IVisiteurDocument } from '../models/Visiteur'; 
import { ICreateVisiteur } from '../models/interfaces/IVisiteur'; 


/**
 * Service pour gérer la logique métier des Visiteurs
 */
export class VisiteurService { // Renommage de la classe

    /**
     * Créer un nouveau visiteur
     */
    public async createVisiteur(visiteurData: ICreateVisiteur): Promise<IVisiteurDocument> {
        try {
            // Vérifier si l'email existe déjà
            const existingVisiteur = await VisiteurModel.findOne({ email: visiteurData.email });
            
            if (existingVisiteur) {
                throw new Error(`Un visiteur avec l'email ${visiteurData.email} existe déjà`);
            }
            // Créer et sauvegarder le visiteur
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
     * Supprimer un visiteur par son ID
     */
    public async deleteVisiteur(id: string): Promise<IVisiteurDocument | null> {
        try {
            const visiteur = await VisiteurModel.findByIdAndDelete(id);

            if (!visiteur) {
                throw new Error(`Visiteur avec l'ID ${id} introuvable pour la suppression`);
            }
            return visiteur;

        } catch (error: any) {
            if (error.name === 'CastError') {
                throw new Error(`ID invalide: ${id}`);
            }
            throw error;
        }
    }

    /**
     * Récupérer tous les visiteurs
     */
    public async getAllVisiteurs(): Promise<IVisiteurDocument[]> {
        try {
            const visiteurs = await VisiteurModel.find()
                .sort({ dateCreation: -1 })
                .exec();
            return visiteurs;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des visiteurs');
        }
    }

    /**
     * Récupérer un visiteur par son ID
     */
    public async getVisiteurById(id: string): Promise<IVisiteurDocument | null> {
        try {
            const visiteur = await VisiteurModel.findById(id).exec();
            
            if (!visiteur) {
                throw new Error(`Visiteur avec l'ID ${id} introuvable`);
            }
            return visiteur;
        } catch (error: any) {
            if (error.name === 'CastError') {
                throw new Error(`ID invalide: ${id}`);
            }
            throw error;
        }
    }
}