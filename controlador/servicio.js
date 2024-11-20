const Servicio = require('../modelos/servicio');

exports.getAllServicios = async (req, res) => {
  try {
    const servicios = await Servicio.findAll();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener servicios', error });
  }
};

exports.getServicioById = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    if (servicio) {
      res.json(servicio);
    } else {
      res.status(404).json({ message: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener servicio', error });
  }
};

exports.createServicio = async (req, res) => {
  try {
    const servicio = await Servicio.create(req.body);
    res.status(201).json(servicio);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear servicio', error });
  }
};

exports.updateServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    if (servicio) {
      await servicio.update(req.body);
      res.json(servicio);
    } else {
      res.status(404).json({ message: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar servicio', error });
  }
};

exports.deleteServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    if (servicio) {
      await servicio.destroy();
      res.json({ message: 'Servicio eliminado' });
    } else {
      res.status(404).json({ message: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar servicio', error });
  }
};
