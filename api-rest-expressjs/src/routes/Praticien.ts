import { Router } from 'express';
// L'import du contrôleur est mis à jour
import { PraticienController } from '../controllers/Praticien'; 


/**
 * Configuration des routes pour les praticiens
 */
export class PraticienRoutes {
  public router: Router;
  private praticienController: PraticienController; // La propriété est mise à jour


  constructor() {
    this.router = Router();
    // Le contrôleur est instancié avec le nouveau nom
    this.praticienController = new PraticienController(); 
    this.initializeRoutes();
  }


  private initializeRoutes(): void {
    // POST /api/praticiens - Créer un praticien
    this.router.post('/', this.praticienController.createPraticien);
    // GET /api/praticiens - Récupérer tous les praticiens
    this.router.get('/', this.praticienController.getAllPraticiens);
    // GET /api/praticiens/:id - Récupérer un praticien par ID
    this.router.get('/:id', this.praticienController.getPraticienById);
  }
}