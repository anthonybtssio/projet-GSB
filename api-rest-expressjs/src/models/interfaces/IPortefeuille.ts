import { Document, Types } from 'mongoose';

export interface IPortefeuille {
  _id?: string;
  visiteur: Types.ObjectId; // ID du Visiteur
  praticien: Types.ObjectId; // ID du Praticien
  date_debut_suivis: Date;
  date_fin_suivis?: Date;
}

export interface ICreatePortefeuille {
  visiteur: Types.ObjectId;
  praticien: Types.ObjectId;
  date_debut_suivis?: Date;
  date_fin_suivis?: Date;
}