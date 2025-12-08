// anthonybtssio/projet-gsb/projet-GSB-32f54fcdedb92e9201a1b0fa5693f1ed15252035/api-rest-expressjs/src/routes/Visiteur.ts
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
    this.visiteurController = new VisiteurController(); 
    this.initializeRoutes();
  }


  private initializeRoutes(): void {
    // Routes existantes pour les visiteurs
    this.router.post('/', this.visiteurController.createVisiteur);
    this.router.get('/', this.visiteurController.getAllVisiteurs);
    this.router.get('/:id', this.visiteurController.getVisiteurById);
    
    // ----------------------------------------------------------------------------------
    // --- NOUVELLE ROUTE (US 1 : Ajouter un praticien) ---
    // Correspond à : POST /api/visiteurs/portefeuille/:visiteurId
    // ----------------------------------------------------------------------------------
    this.router.post(
      '/portefeuille/:visiteurId',
      this.visiteurController.ajouterPraticien
    );
    
    // ----------------------------------------------------------------------------------
    // --- NOUVELLE ROUTE (US 2 : Visualiser le portefeuille) ---
    // Correspond à : GET /api/visiteurs/portefeuille/:visiteurId
    // ----------------------------------------------------------------------------------
    this.router.get(
      '/portefeuille/:visiteurId',
      this.visiteurController.getPortefeuille
    );
  }
}