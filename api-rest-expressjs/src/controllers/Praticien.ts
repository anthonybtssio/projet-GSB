import { Request, Response } from 'express';
// L'import du service est mis à jour (doit exister sous ce nom)
import { PraticienService } from '../services/Praticien'; 
import { request } from 'http';


export class PraticienController {
  private praticienService: PraticienService; // Propriété privée en minuscule


  constructor() {
    // Initialisation correcte
    this.praticienService = new PraticienService(); 
  }


  /**
   * POST /api/praticiens - Créer un praticien
   */
  public createPraticien = async (req: Request, res: Response): Promise<void> => { 
    console.log(req.body)
    try {
      // Appelle la méthode createPraticien du service
      const praticien = await this.praticienService.createPraticien(req.body); 
     
      res.status(201).json({
        success: true,
        message: 'Praticien créé avec succès', // Message mis à jour
        data: praticien
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erreur lors de la création du praticien'
      });
    }
  };

  /**
   * GET /api/praticiens - Récupérer tous les praticiens
   */
  public getAllPraticiens = async (req: Request, res: Response): Promise<void> => {
    try {
      // Appelle la méthode getAllPraticiens du service
      const praticiens = await this.praticienService.getAllPraticiens(); 
     
      res.status(200).json({
        success: true,
        count: praticiens.length,
        data: praticiens
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Erreur lors de la récupération des praticiens'
      });
    }
  };

  /**
   * GET /api/praticiens/:id - Récupérer un praticien par ID
   */
  public getPraticienById = async (req: Request, res: Response): Promise<void> => {
    try {
      // Appelle la méthode getPraticienById du service
      const praticien = await this.praticienService.getPraticienById(req.params.id); 
     
      res.status(200).json({
        success: true,
        data: praticien
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Praticien introuvable' // Message mis à jour
      });
    }
  };
}