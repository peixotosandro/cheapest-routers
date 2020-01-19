import * as Yup from 'yup';
import cheapestRoute from '../utils/CheapestRoute';

class RoutesController {
  async show(req, res) {
    let start = null;
    let end = null;
    try {
      const route = req.params.route.split('-');
      start = route[0].trim().toUpperCase();
      end = route[1].trim().toUpperCase();
    } catch (e) {
      return res.status(400).json({
        error: `Error for the asked route '${req.params.route}'. The correct format is DEPARTURE-ARRIVAL e.g.: GRU-ORL`,
      });
    }

    const { error, route, price } = cheapestRoute.getCheapestRoute(start, end);
    if (error) {
      return res.status(400).json({ error });
    }
    return res.json({ route, price });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      start: Yup.string().required(),
      end: Yup.string().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' });
    }

    const { start, end, price } = req.body;
    const { error } = cheapestRoute.addNewRoute(start, end, price);
    if (error) {
      return res.status(400).json({ error });
    }
    return res.json({ start, end, price });
  }
}

export default new RoutesController();
