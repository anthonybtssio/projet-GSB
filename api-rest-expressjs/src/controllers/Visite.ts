// ... dans votre UserController / VisiteurController

// GET /api/visiteurs/:id/portefeuille
public getPortefeuille = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await this.visiteurService.getPortefeuille(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// DELETE /api/visiteurs/:id/portefeuille/:praticienId
public removePraticien = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, praticienId } = req.params;
    await this.visiteurService.removePraticien(id, praticienId);
    res.status(200).json({ 
      success: true, 
      message: "Praticien retiré du portefeuille avec succès (le praticien n'a pas été supprimé de la base)" 
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};