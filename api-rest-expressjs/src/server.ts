import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit'; // <--- 1. IMPORT AJOUTÉ
import { Database } from './config/database';
import { VisiteurRoutes } from './routes/Visiteur';
import { MotifRoutes } from './routes/Motif';
import { PraticienRoutes } from './routes/Praticien'; 

// Chargement des variables d'environnement
dotenv.config();

/**
 * Gère la configuration et le démarrage du serveur Express
 */
class App {
  public app: Application;
  private port: number;
  private database: Database;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000', 10);
    this.database = Database.getInstance();
    
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeDatabase();
  }

  /**
   * Configure les middlewares Express
   */
  private initializeMiddlewares(): void {
    // --- DÉBUT SÉCURITÉ (Rate Limiting) ---
    
    // Indispensable pour récupérer la vraie IP à travers le proxy du Cloud/CodeSpace
    this.app.set('trust proxy', 1); 

    // Configuration du limiteur : 100 requêtes max toutes les 15 minutes par IP
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, 
      max: 100, 
      standardHeaders: true, 
      legacyHeaders: false,
      message: 'Trop de requêtes effectuées depuis cette IP, veuillez réessayer plus tard.'
    });

    // Application du limiteur à toutes les routes
    this.app.use(limiter);
    
    // --- FIN SÉCURITÉ ---

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  /**
   * Configure les routes de l'application
   */
  private initializeRoutes(): void {
    // Route de test
    this.app.get('/', (req: Request, res: Response) => {
      res.json({
        message: 'API REST Express.js + TypeScript + MongoDB',
        version: '1.0.0',
        endpoints: {
          health: '/health'
        }
      });
    });

    // Route de santé
    this.app.get('/health', (req: Request, res: Response) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
    });

    // --- Routes Métiers ---

    // Routes visiteurs
    const visiteursRoutes = new VisiteurRoutes();
    this.app.use('/api/visiteurs', visiteursRoutes.router);

    // Routes motifs
    const motifRoutes = new MotifRoutes();
    this.app.use('/api/motifs', motifRoutes.router);

    // Routes praticiens
    const praticienRoutes = new PraticienRoutes();
    this.app.use('/api/praticiens', praticienRoutes.router);
  }

  /**
   * Initialise la connexion à la base de données
   */
  private async initializeDatabase(): Promise<void> {
    await this.database.connect();
  }

  /**
   * Démarre le serveur Express
   */
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log('================================');
      console.log(`Serveur démarré sur le port ${this.port}`);
      console.log(`Environnement: ${process.env.NODE_ENV}`);
      console.log('================================');
    });
  }
}

// Création et démarrage de l'application
const app = new App();
app.listen();

process.on('SIGINT', async () => {
  console.log('\n Arrêt du serveur...');
  await Database.getInstance().disconnect();
  process.exit(0);
});