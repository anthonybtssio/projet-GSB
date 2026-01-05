import { Router } from 'express';
import { VisiteController } from '../controllers/Visite';


/**
 * Configuration des routes pour les visites
 */
export class VisiteRoutes {
  public router: Router;
  private visiteController: VisiteController;


  constructor() {
    this.router = Router();
    this.visiteController = new VisiteController();
    this.initializeRoutes();
  }


  private initializeRoutes(): void {
    // POST /api/visites - Créer une visite
    this.router.post('/', this.visiteController.createVisite);
    
    // GET /api/visites - Récupérer toutes les visites
    this.router.get('/', this.visiteController.getAllVisites);
    
    // GET /api/visites/:id - Récupérer une visite par ID
    this.router.get('/:id', this.visiteController.getVisiteById);
  }
}