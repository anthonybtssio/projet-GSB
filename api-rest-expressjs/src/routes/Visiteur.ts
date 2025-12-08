import { Router } from 'express';
// L'import du contrôleur est mis à jour
import { VisiteurController } from '../controllers/Visiteur'; 


/**
 * Configuration des routes pour les visiteurs
 */
export class VisiteurRoutes {
  public router: Router;
  private visiteurController: VisiteurController; // La propriété est mise à jour


  constructor() {
    this.router = Router();
    // Le contrôleur est instancié avec le nouveau nom
    this.visiteurController = new VisiteurController(); 
    this.initializeRoutes();
  }


  private initializeRoutes(): void {
    // POST /api/visiteurs - Créer un visiteur
    this.router.post('/', this.visiteurController.createVisiteur);
    // GET /api/visiteurs - Récupérer tous les visiteurs
    this.router.get('/', this.visiteurController.getAllVisiteurs);
    // GET /api/visiteurs/:id - Récupérer un visiteur par ID
    this.router.get('/:id', this.visiteurController.getVisiteurById);
  }
}