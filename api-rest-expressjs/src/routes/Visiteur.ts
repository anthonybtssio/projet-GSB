import { Router } from 'express';
import { VisiteurController } from '../controllers/Visiteur'; 

/**
 * Configuration des routes pour les visiteurs
 */
export class VisiteurRoutes {
  public router: Router;
  private visiteurController: VisiteurController;

  constructor() {
    this.router = Router();
    // On initialise le contrôleur en premier
    this.visiteurController = new VisiteurController(); 
    // Puis on initialise les routes
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // --- Routes de base ---
    // POST /api/visiteurs - Créer un visiteur
    this.router.post('/', this.visiteurController.createVisiteur);
    // GET /api/visiteurs - Récupérer tous les visiteurs
    this.router.get('/', this.visiteurController.getAllVisiteurs);
    // GET /api/visiteurs/:id - Récupérer un visiteur par ID
    this.router.get('/:id', this.visiteurController.getVisiteurById);

    // --- Routes du Portefeuille et des Suivis ---
    
    // POST /api/visiteurs/:id/affectations - Ajouter un praticien (Follow)
    this.router.post('/:id/affectations', this.visiteurController.affecterPraticien);
    
    // GET /api/visiteurs/:id/portefeuille - Voir le portefeuille
    this.router.get('/:id/portefeuille', this.visiteurController.getPortefeuilleVisiteur);

    // PATCH /api/visiteurs/:id/suivis/:praticienId/arreter - Arrêter le suivi (Mettre une date de fin)
    this.router.patch('/:id/suivis/:praticienId/arreter', this.visiteurController.arreterSuivisPraticien);

    // DELETE /api/visiteurs/:id/portefeuille/:praticienId - Supprimer totalement du portefeuille
    this.router.delete('/:id/portefeuille/:praticienId', this.visiteurController.retirerPraticien);
  }
}