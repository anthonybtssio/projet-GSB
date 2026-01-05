import mongoose, { Schema, Model, Document } from 'mongoose';
import { IVisiteur } from './interfaces/IVisiteur'; // Vérifiez le 's' à interfaces

export type IVisiteurDocument = IVisiteur & Document;

/**
 * Schéma Mongoose pour Visiteur
 */
const visiteurSchema = new Schema<IVisiteurDocument>(
  {
    nom: { type: String, required: [true, 'Le nom est obligatoire'], trim: true },
    prenom: { type: String, required: [true, 'Le prénom est obligatoire'], trim: true },
    email: { type: String, required: [true, "L'email est obligatoire"], unique: true, lowercase: true },
    dateCreation: { type: Date, default: Date.now },
    // Champ pour le portefeuille global
    portefeuillePraticiens: [{ type: Schema.Types.ObjectId, ref: 'Praticien' }],
    // Champ pour les suivis avec dates
    praticiensSuivis: [{
      praticienId: { type: Schema.Types.ObjectId, ref: 'Praticien' },
      dateDebut: { type: Date, default: Date.now },
      dateFin: { type: Date } 
    }]
  },
  { versionKey: false }
);

export const VisiteurModel: Model<IVisiteurDocument> = mongoose.model<IVisiteurDocument>('Visiteur', visiteurSchema);