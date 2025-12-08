
import { UserModel, IUserDocument } from '../models/User';
import { ICreateUser } from '../models/interfaces/IUser';
/**
 * Service pour gérer la logique métier des utilisateurs
 */
export class UserService {
  /**
   * Créer un nouvel utilisateur
   */
  public async createUser(userData: ICreateUser): Promise<IUserDocument> {
    try {
      // Vérifier si l'email existe déjà
      const existingUser = await UserModel.findOne({ email: userData.email });
     
      if (existingUser) {
        throw new Error(`Un utilisateur avec l'email ${userData.email} existe déjà`);
      }
      // Créer et sauvegarder l'utilisateur
      const user = new UserModel(userData);
      await user.save();
      return user;
    } catch (error: any) {
      // Gestion des erreurs de validation Mongoose
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        throw new Error(`Validation échouée: ${messages.join(', ')}`);
      }
      throw error;
    }
  }


  /**
   * Récupérer tous les utilisateurs
   */
  public async getAllUsers(): Promise<IUserDocument[]> {
    try {
      const users = await UserModel.find()
        .sort({ dateCreation: -1 })
        .exec();
      return users;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des utilisateurs');
    }
  }


  /**
   * Récupérer un utilisateur par son ID
   */
  public async getUserById(id: string): Promise<IUserDocument | null> {
    try {
      const user = await UserModel.findById(id).exec();
     
      if (!user) {
        throw new Error(`Utilisateur avec l'ID ${id} introuvable`);
      }
      return user;
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID invalide: ${id}`);
      }
      throw error;
    }
  }
}
