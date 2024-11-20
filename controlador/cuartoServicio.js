const CuartoServicio = require('../modelos/cuartoServicio');

exports.getAllCuartoServicios = async (req, res) => {
  try {
    const cuartoServicios = await CuartoServicio.findAll();
    res.json(cuartoServicios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener servicios de cuartos', error });
  }
};

exports.getCuartoServicioById = async (req, res) => {
  try {
    const cuartoServicio = await CuartoServicio.findByPk(req.params.id);
    if (cuartoServicio) {
      res.json(cuartoServicio);
    } else {
      res.status(404).json({ message: 'Servicio de cuarto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener servicio de cuarto', error });
  }
};

exports.createCuartoServicio = async (req, res) => {
  try {
    const cuartoServicio = await CuartoServicio.create(req.body);
    res.status(201).json(cuartoServicio);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear servicio de cuarto', error });
  }
};

exports.updateCuartoServicio = async (req, res) => {
  try {
    const cuartoServicio = await CuartoServicio.findByPk(req.params.id);
    if (cuartoServicio) {
      await cuartoServicio.update(req.body);
      res.json(cuartoServicio);
    } else {
      res.status(404).json({ message: 'Servicio de cuarto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar servicio de cuarto', error });
  }
};

exports.deleteCuartoServicio = async (req, res) => {
  try {
    const cuartoServicio = await CuartoServicio.findByPk(req.params.id);
    if (cuartoServicio) {
      await cuartoServicio.destroy();
      res.json({ message: 'Servicio de cuarto eliminado' });
    } else {
      res.status(404).json({ message: 'Servicio de cuarto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar servicio de cuarto', error });
  }
};
