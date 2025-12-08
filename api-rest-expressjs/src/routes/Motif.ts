import { Router } from 'express';
import { MotifController } from '../controllers/Motif';


/**
 * Configuration des routes pour les motifs
 */
export class MotifRoutes {
  public router: Router;
  private motifController: MotifController;


  constructor() {
    this.router = Router();
    this.motifController = new MotifController();
    this.initializeRoutes();
  }


  private initializeRoutes(): void {
    // POST /api/motifs - Créer un motif
    this.router.post('/', this.motifController.createMotif);
    // GET /api/motifs - Récupérer tous les motifs
    this.router.get('/', this.motifController.getAllMotifs);
    // GET /api/motifs/:id - Récupérer un motif par ID
    this.router.get('/:id', this.motifController.getMotifById);
  }
}