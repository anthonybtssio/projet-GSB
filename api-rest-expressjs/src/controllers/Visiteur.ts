import { Request, Response } from 'express';
import { VisiteurService } from '../services/Visiteur';

/**
 * Contrôleur pour gérer les requêtes liées aux Visiteurs
 */
export class VisiteurController {
  private visiteurService: VisiteurService;

  constructor() {
    this.visiteurService = new VisiteurService();
  }

  /**
   * POST /api/visiteurs - Créer un nouveau visiteur
   */
  public createVisiteur = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteur = await this.visiteurService.createVisiteur(req.body);
      res.status(201).json({
        success: true,
        message: 'Visiteur créé avec succès',
        data: visiteur
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erreur lors de la création du visiteur'
      });
    }
  };

  /**
   * GET /api/visiteurs - Récupérer tous les visiteurs
   */
  public getAllVisiteurs = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteurs = await this.visiteurService.getAllVisiteurs();
      res.status(200).json({
        success: true,
        count: visiteurs.length,
        data: visiteurs
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Erreur lors de la récupération des visiteurs'
      });
    }
  };

  /**
   * GET /api/visiteurs/:id - Récupérer un visiteur spécifique
   */
  public getVisiteurById = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteur = await this.visiteurService.getVisiteurById(req.params.id);
      res.status(200).json({
        success: true,
        data: visiteur
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Visiteur introuvable'
      });
    }
  };

  /**
   * POST /api/visiteurs/:id/affectations - Ajouter un praticien
   */
  public affecterPraticien = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteurId = req.params.id;
      const { praticienId } = req.body;

      if (!praticienId) {
        throw new Error("L'ID du praticien est requis");
      }

      const visiteur = await this.visiteurService.followPraticien(visiteurId, praticienId);

      res.status(201).json({
        success: true,
        message: 'Praticien ajouté au portefeuille avec succès',
        data: visiteur
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Erreur lors de l'affectation"
      });
    }
  };

  /**
   * GET /api/visiteurs/:id/portefeuille - Voir les suivis
   */
  public getPortefeuilleVisiteur = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteur = await this.visiteurService.getVisiteurById(req.params.id);
      
      res.status(200).json({
        success: true,
        count: visiteur?.praticiensSuivis?.length || 0,
        data: visiteur?.praticiensSuivis || []
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Erreur lors de la récupération du portefeuille"
      });
    }
  };
  
  /**
   * PATCH /api/visiteurs/:id/suivis/:praticienId/arreter
   * Définit la date de fin de suivi (Story : ne plus suivre)
   */
  public arreterSuivisPraticien = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, praticienId } = req.params;
      
      // Appel de la méthode "arreterSuivis" du service
      const visiteur = await this.visiteurService.arreterSuivis(id, praticienId);
      
      res.status(200).json({
        success: true,
        message: "Le suivi du praticien a été arrêté avec succès",
        data: visiteur
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Erreur lors de l'arrêt du suivi"
      });
    }
  };

  /**
   * DELETE /api/visiteurs/:id/portefeuille/:praticienId
   * Retire totalement le praticien du portefeuille
   */
  public retirerPraticien = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, praticienId } = req.params; 
      const visiteur = await this.visiteurService.supprimerDuPortefeuille(id, praticienId);
      
      res.status(200).json({
        success: true,
        message: "Le praticien a été retiré de votre portefeuille avec succès",
        data: visiteur
      });
    } catch (error: any) {
      res.status(400).json({ 
        success: false,
        message: error.message || "Erreur lors de la suppression"
      });
    }
  };
} // <--- Assurez-vous que cette accolade ferme bien TOUTE la classe