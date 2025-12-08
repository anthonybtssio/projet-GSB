import mongoose, { Schema, Model, Document } from 'mongoose';
import { IMotif } from './interfaces/IMotif';

export type IMotifDocument = IMotif & Document;
/**
 * Schéma Mongoose pour Motif
 */
const motifSchema = new Schema<IMotifDocument>(
  {
    nom: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      trim: true,
      minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
    }
    
   
  },
  {
    versionKey: false
  }
);


export const MotifModel: Model<IMotifDocument> = mongoose.model<IMotifDocument>('Motif', motifSchema);