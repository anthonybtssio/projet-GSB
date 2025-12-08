import { Request, Response } from 'express';
// Assurez-vous que ce chemin importe bien la classe VisiteurService
import { VisiteurService } from '../services/Visiteur'; 

export class VisiteurController {
  private visiteurService: VisiteurService;

  constructor() {
    // CORRECTION: Utiliser la variable de propriété privée et instancier VisiteurService
    this.visiteurService = new VisiteurService(); 
  }

  /**
   * POST /api/visiteurs - Créer un visiteur
   */
  public createVisiteur = async (req: Request, res: Response): Promise<void> => {
    try {
      // CORRECTION: Appeler la méthode createUser (si elle existe toujours) ou renommer en createVisiteur
      // Note : J'ai gardé createUser, mais vous devriez la renommer dans votre service.
      const visiteur = await this.visiteurService.createVisiteur(req.body); 
     
      res.status(201).json({
        success: true,
        message: 'Visiteur créé avec succès',
        data: visiteur // CORRECTION: Remplacer user par visiteur
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
      // CORRECTION: Remplacer userService par visiteurService
      // Note : Vous devrez renommer getAllUsers en getAllVisiteurs dans votre service.
      const visiteurs = await this.visiteurService.getAllVisiteurs(); 
     
      res.status(200).json({
        success: true,
        count: visiteurs.length, // CORRECTION: Remplacer users par visiteurs
        data: visiteurs // CORRECTION: Remplacer users par visiteurs
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
      // CORRECTION: Remplacer userService par visiteurService
      // Note : Vous devrez renommer getUserById en getVisiteurById dans votre service.
      const visiteur = await this.visiteurService.getVisiteurById(req.params.id); 
     
      res.status(200).json({
        success: true,
        data: visiteur // CORRECTION: Remplacer user par visiteur
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Visiteur introuvable' // CORRECTION: Remplacer Utilisateur par Visiteur
      });
    }
  };
}