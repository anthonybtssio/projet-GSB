import { MotifModel, IMotifDocument } from '../models/Motif';
import { ICreateMotif } from '../models/interfaces/IMotif';

/**
 * Service pour gérer la logique métier des motifs
 */
export class MotifService {
  /**
   * Créer un nouvel motif
   */
  public async createMotif(motifData: ICreateMotif): Promise<IMotifDocument> {
    try {
    
      
      // Créer et sauvegarder le motif
      const motif = new MotifModel(motifData);
      await motif.save();
      return motif;
    } catch (error: any) {
      // Gestion des erreurs de validation Mongoose
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        throw new Error(`Validation échouée: ${messages.join(', ')}`);
      }
      throw error;
    }
  }

  /**
   * Supprimer un motif
   */
  public async deleteMotif(id: string): Promise<IMotifDocument | null> {
    try {
      // Correction ici : ajout de l'ID et de .exec()
      const motif = await MotifModel.findByIdAndDelete(id).exec();
      
      if (!motif) {
        throw new Error(`Motif avec l'ID ${id} introuvable pour la suppression`);
      }
      return motif;
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID invalide: ${id}`);
      }
      throw error;
    }
  }

  /**
   * Récupérer tous les motifs
   */
  public async getAllMotifs(): Promise<IMotifDocument[]> {
    try {
      const motifs = await MotifModel.find()
        .sort({ dateCreation: -1 })
        .exec();
      return motifs;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des motifs');
    }
  }

  /**
   * Récupérer un motif par son ID
   */
  public async getMotifById(id: string): Promise<IMotifDocument | null> {
    try {
      const motif = await MotifModel.findById(id).exec();
      
      if (!motif) {
        throw new Error(`Motif avec l'ID ${id} introuvable`);
      }
      return motif;
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID invalide: ${id}`);
      }
      throw error;
    }
  }
}