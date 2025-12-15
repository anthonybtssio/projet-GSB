import { Request, Response } from 'express';
// Assurez-vous que ce chemin importe bien la classe VisiteurService
import { VisiteurService } from '../services/Visiteur';
// --- AJOUT : Import du service Portefeuille ---
import { PortefeuilleService } from '../services/Portefeuille';

export class VisiteurController {
  private visiteurService: VisiteurService;
  private portefeuilleService: PortefeuilleService; // --- AJOUT : Propriété pour le service ---

  constructor() {
    // Instanciation des services
    this.visiteurService = new VisiteurService();
    this.portefeuilleService = new PortefeuilleService(); // --- AJOUT : Instanciation ---
  }

  /**
   * POST /api/visiteurs - Créer un visiteur
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
   * GET /api/visiteurs/:id - Récupérer un visiteur par ID
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

  // =========================================================================
  // --- AJOUT : MÉTHODES POUR LE PORTEFEUILLE (Relation Visiteur-Praticien) ---
  // =========================================================================

  /**
   * POST /api/visiteurs/:id/affectations
   * Méthode "ADD" : Affecter un praticien à ce visiteur
   */
  public affecterPraticien = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteurId = req.params.id; // L'ID du visiteur est dans l'URL
      const { praticienId, date_debut_suivis } = req.body; // L'ID praticien et la date sont dans le corps JSON

      // Appel au service Portefeuille
      const result = await this.portefeuilleService.ajouterPraticien({
        visiteur: visiteurId,
        praticien: praticienId,
        date_debut_suivis: date_debut_suivis
      });

      res.status(201).json({
        success: true,
        message: 'Praticien affecté au visiteur avec succès',
        data: result
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Erreur lors de l'affectation du praticien"
      });
    }
  };

  /**
   * GET /api/visiteurs/:id/affectations
   * Méthode "GET" : Voir tous les praticiens suivis par ce visiteur
   */
  public getPortefeuilleVisiteur = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteurId = req.params.id;
      
      // Appel au service Portefeuille pour récupérer la liste
      const result = await this.portefeuilleService.getPraticiensByVisiteurId(visiteurId);

      res.status(200).json({
        success: true,
        count: result.length,
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Erreur lors de la récupération du portefeuille"
      });
    }
  };
}