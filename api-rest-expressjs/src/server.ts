import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Database } from './config/database';
import { VisiteurRoutes } from './routes/Visiteur';
import { MotifRoutes } from './routes/Motif';
import { PraticienRoutes } from './routes/Praticien'; // Attention : Vérifie que le fichier s'appelle bien Praticien.ts (singulier) ou Praticiens.ts (pluriel)

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

    // Routes visiteurs (inclut maintenant le portefeuille)
    const visiteursRoutes = new VisiteurRoutes();
    this.app.use('/api/visiteurs', visiteursRoutes.router);

    // Routes motifs
    const motifRoutes = new MotifRoutes();
    this.app.use('/api/motifs', motifRoutes.router);

    // Routes praticiens
    // CORRECTION ICI : Ce bloc doit être DANS la méthode, pas après l'accolade fermante
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