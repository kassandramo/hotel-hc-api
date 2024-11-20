const TipoCuarto = require('../modelos/tipoCuarto');

exports.getAllTipoCuartos = async (req, res) => {
  try {
    const tiposCuartos = await TipoCuarto.findAll();
    res.json(tiposCuartos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tipos de cuartos', error });
  }
};

exports.getTipoCuartoById = async (req, res) => {
  try {
    const tipoCuarto = await TipoCuarto.findByPk(req.params.id);
    if (tipoCuarto) {
      res.json(tipoCuarto);
    } else {
      res.status(404).json({ message: 'Tipo de cuarto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tipo de cuarto', error });
  }
};

exports.createTipoCuarto = async (req, res) => {
  try {
    const tipoCuarto = await TipoCuarto.create(req.body);
    res.status(201).json(tipoCuarto);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tipo de cuarto', error });
  }
};

exports.updateTipoCuarto = async (req, res) => {
  try {
    const tipoCuarto = await TipoCuarto.findByPk(req.params.id);
    if (tipoCuarto) {
      await tipoCuarto.update(req.body);
      res.json(tipoCuarto);
    } else {
      res.status(404).json({ message: 'Tipo de cuarto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar tipo de cuarto', error });
  }
};

exports.deleteTipoCuarto = async (req, res) => {
  try {
    const tipoCuarto = await TipoCuarto.findByPk(req.params.id);
    if (tipoCuarto) {
      await tipoCuarto.destroy();
      res.json({ message: 'Tipo de cuarto eliminado' });
    } else {
      res.status(404).json({ message: 'Tipo de cuarto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar tipo de cuarto', error });
  }
};
