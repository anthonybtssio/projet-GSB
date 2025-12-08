// anthonybtssio/projet-gsb/projet-GSB-32f54fcdedb92e9201a1b0fa5693f1ed15252035/api-rest-expressjs/src/services/Visiteur.ts
import { VisiteurModel, IVisiteurDocument } from '../models/Visiteur'; 
import { ICreateVisiteur } from '../models/interfaces/IVisiteur'; 
// Importez PraticienModel et IPraticienDocument pour les références et le typage
import { PraticienModel, IPraticienDocument } from '../models/Praticiens'; 


/**
 * Service pour gérer la logique métier des Visiteurs
 */
export class VisiteurService { 

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

    // -----------------------------------------------------------------------
    // --- DÉBUT US 1 : Ajouter un praticien au portefeuille (Méthode add) ---
    // -----------------------------------------------------------------------
    public async ajouterPraticienAuPortefeuille(
        visiteurId: string,
        praticienId: string
    ): Promise<IVisiteurDocument> {
        try {
            // 1. Vérifier l'existence du Praticien
            const praticien = await PraticienModel.findById(praticienId);
            if (!praticien) {
                throw new Error(`Praticien avec l'ID ${praticienId} introuvable`);
            }

            // 2. Ajouter l'ID du Praticien au tableau du Visiteur (en utilisant $addToSet)
            const updatedVisiteur = await VisiteurModel.findByIdAndUpdate(
                visiteurId,
                { $addToSet: { portefeuillePraticiens: praticienId } }, // $addToSet pour éviter les doublons
                { new: true } // Retourne le document mis à jour
            ).exec();

            if (!updatedVisiteur) {
                throw new Error(`Visiteur avec l'ID ${visiteurId} introuvable`);
            }

            return updatedVisiteur;
        } catch (error: any) {
            if (error.name === 'CastError' || error.message.includes('Cast to ObjectId failed')) {
                throw new Error('ID Visiteur ou Praticien invalide');
            }
            throw error;
        }
    }
    // -----------------------------------------------------------------------
    // --- DÉBUT US 2 : Voir le portefeuille (Méthode pour l'affichage) ---
    // -----------------------------------------------------------------------
    public async getPortefeuillePraticiens(
        visiteurId: string
    ): Promise<IPraticienDocument[]> {
        try {
            // Récupérer le Visiteur et Remplacer les IDs par les documents Praticien complets (.populate)
            const visiteur = await VisiteurModel.findById(visiteurId)
                .populate<{ portefeuillePraticiens: IPraticienDocument[] }>(
                    'portefeuillePraticiens'
                )
                .exec();

            if (!visiteur) {
                throw new Error(`Visiteur avec l'ID ${visiteurId} introuvable`);
            }

            // Retourner le tableau des praticiens populés
            return visiteur.portefeuillePraticiens;
        } catch (error: any) {
            if (error.name === 'CastError') {
                throw new Error(`ID invalide: ${visiteurId}`);
            }
            throw error;
        }
    }
}