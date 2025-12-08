import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Database } from './config/database';
import { VisiteurRoutes } from './routes/Visiteur';
import { MotifRoutes } from './routes/Motif';
import { PraticienRoutes } from './routes/Praticien'; // Assurez-vous que le nom du fichier de route est correct

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
    // Parse le JSON dans les requêtes
    this.app.use(express.json());
    
    // Parse les données URL-encoded
    this.app.use(express.urlencoded({ extended: true }));
    
    // Active CORS pour toutes les origines
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

    // Route de santé pour vérifier que l'API fonctionne
    this.app.get('/health', (req: Request, res: Response) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
    });

    //Routes visiteurs
    const visiteursRoutes = new VisiteurRoutes();
    this.app.use('/api/visiteurs', visiteursRoutes.router);

    // Routes motifs
    const motifRoutes = new MotifRoutes();
    this.app.use('/api/motifs', motifRoutes.router);

    // Routes praticiens (CORRIGÉ : Ces lignes sont maintenant DANS initializeRoutes)
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