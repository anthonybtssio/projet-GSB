import mongoose, { Schema, Model, Document } from 'mongoose';
import { IPraticien } from './interfaces/IPraticien';


export type IPraticienDocument = IPraticien & Document;
/**
 * Schéma Mongoose pour Praticien
 */
const praticienSchema = new Schema<IPraticienDocument>(
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
    }
  },
  {
    versionKey: false
  }
);


export const PraticienModel: Model<IPraticienDocument> = mongoose.model<IPraticienDocument>('Praticien', praticienSchema);