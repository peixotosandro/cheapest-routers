import cheapestRoute from '../utils/CheapestRoute';

class RoutesController {
  async index(req, res) {
    let start = null;
    let end = null;
    try {
      const route = req.params.route.split('-');
      start = route[0].trim().toUpperCase();
      end = route[1].trim().toUpperCase();
    } catch (e) {
      return res.json({
        success: false,
        message: `Error for the asked route '${req.params.route}'. The correct format is DEPARTURE-ARRIVAL e.g.: GRU-ORL`,
      });
    }

    return res.json(cheapestRoute.getCheapestRoute(start, end));
  }
}

export default new RoutesController();
