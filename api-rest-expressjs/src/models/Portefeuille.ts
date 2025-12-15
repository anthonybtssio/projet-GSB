import mongoose, { Schema, Model, Document } from 'mongoose';
import { IPortefeuille } from './interfaces/IPortefeuille';

export type IPortefeuilleDocument = IPortefeuille & Document;

const portefeuilleSchema = new Schema<IPortefeuilleDocument>(
  {
    visiteur: {
      type: Schema.Types.ObjectId,
      ref: 'Visiteur',
      required: true
    },
    praticien: {
      type: Schema.Types.ObjectId,
      ref: 'Praticien',
      required: true
    },
    date_debut_suivis: {
      type: Date,
      required: true,
      default: Date.now
    },
    date_fin_suivis: {
      type: Date
    }
  },
  { versionKey: false }
);

export const PortefeuilleModel: Model<IPortefeuilleDocument> = mongoose.model<IPortefeuilleDocument>('Portefeuille', portefeuilleSchema);