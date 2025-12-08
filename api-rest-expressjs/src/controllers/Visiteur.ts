// anthonybtssio/projet-gsb/projet-GSB-32f54fcdedb92e9201a1b0fa5693f1ed15252035/api-rest-expressjs/src/controllers/Visiteur.ts
import { Request, Response } from 'express';
import { VisiteurService } from '../services/Visiteur'; 

export class VisiteurController {
  private visiteurService: VisiteurService;

  constructor() {
    this.visiteurService = new VisiteurService(); 
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

    // ------------------------------------------------------------------
    // --- NOUVELLE MÉTHODE (US 1 : Ajouter un praticien) ---
    // Route : POST /api/visiteurs/portefeuille/:visiteurId
    // ------------------------------------------------------------------
    public ajouterPraticien = async (req: Request, res: Response): Promise<void> => {
        const visiteurId = req.params.visiteurId; // ID Visiteur dans l'URL
        const { praticienId } = req.body; // ID Praticien dans le corps
        
        if (!praticienId) {
            return res.status(400).json({
                success: false,
                message: 'Le champ praticienId est manquant dans le corps de la requête.',
            });
        }

        try {
            await this.visiteurService.ajouterPraticienAuPortefeuille(
                visiteurId,
                praticienId
            );

            // Récupérer le portefeuille pour afficher le résultat mis à jour
            const praticiens = await this.visiteurService.getPortefeuillePraticiens(visiteurId);

            res.status(200).json({
                success: true,
                message: `Praticien ${praticienId} ajouté (ou déjà présent) au portefeuille du visiteur ${visiteurId}`,
                portefeuilleActuel: praticiens,
            });
        } catch (error: any) {
            const status = error.message.includes('introuvable') || error.message.includes('invalide') ? 404 : 400;
            res.status(status).json({
                success: false,
                message: error.message || 'Erreur lors de l\'ajout du praticien au portefeuille',
            });
        }
    };

    // ------------------------------------------------------------------
    // --- NOUVELLE MÉTHODE (US 2 : Visualiser le portefeuille) ---
    // Route : GET /api/visiteurs/portefeuille/:visiteurId
    // ------------------------------------------------------------------
    public getPortefeuille = async (req: Request, res: Response): Promise<void> => {
        const visiteurId = req.params.visiteurId;
        try {
            const praticiens = await this.visiteurService.getPortefeuillePraticiens(
                visiteurId
            );

            res.status(200).json({
                success: true,
                count: praticiens.length,
                data: praticiens,
            });
        } catch (error: any) {
            const status = error.message.includes('introuvable') || error.message.includes('invalide') ? 404 : 500;
            res.status(status).json({
                success: false,
                message: error.message || 'Erreur lors de la récupération du portefeuille',
            });
        }
    };
}