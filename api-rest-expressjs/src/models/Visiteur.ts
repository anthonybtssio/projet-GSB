// anthonybtssio/projet-gsb/projet-GSB-32f54fcdedb92e9201a1b0fa5693f1ed15252035/api-rest-expressjs/src/models/Visiteur.ts
import mongoose, { Schema, Model, Document, Types } from 'mongoose'; // <-- AJOUT de Types
import { IVisiteur } from './interface/IVisiteur';


export type IVisiteurDocument = IVisiteur & Document;
/**
 * Schéma Mongoose pour Visiteur
 */
const visiteurSchema = new Schema<IVisiteurDocument>(
  {
    nom: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      trim: true,
      minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
    },
    prenom: {
      type: String,
      required: [true, 'Le prénom est obligatoire'],
      trim: true,
      minlength: [2, 'Le prénom doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères']
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide']
    },
    dateCreation: {
      type: Date,
      default: Date.now
    },
    // --- DÉBUT AJOUT ---
    portefeuillePraticiens: [ // Tableau de références
      {
        type: Types.ObjectId,
        ref: 'Praticien', // Référence au modèle 'Praticien'
      },
    ],
    // --- FIN AJOUT ---
  },
  {
    versionKey: false
  }
);


export const VisiteurModel: Model<IVisiteurDocument> = mongoose.model<IVisiteurDocument>('Visiteur', visiteurSchema);