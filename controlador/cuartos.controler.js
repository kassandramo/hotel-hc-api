const cuarto = require('../modelos/cuarto.model');

exports.getCuartos = async (req, res) => {
    try {
        const cuartos = await cuarto.findAll();
        res.status(200).json(cuartos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un cuarto por ID
exports.getCuartosById = async (req, res) => {
    try {
      const cuarto = await Cuarto.findByPk(req.params.id);
      if (!cuarto) return res.status(404).json({ error: 'Cuarto no encontrado' });
      res.json(cuarto);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el cuarto' });
    }
  };
  
  // Crear un nuevo cuarto
 exports.altaCuarto = async (req, res) => {
    try {
      const nuevoCuarto = await Cuarto.create(req.body);
      res.json(nuevoCuarto);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el cuarto' });
    }
  };
  
  // Actualizar un cuarto existente
  exports.actualizarCuarto = async (req, res) => {
    try {
      const cuarto = await Cuarto.findByPk(req.params.id);
      if (!cuarto) return res.status(404).json({ error: 'Cuarto no encontrado' });
  
      await cuarto.update(req.body);
      res.json(cuarto);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el cuarto' });
    }
  };
  
  // Eliminar un cuarto
  exports.eliminar = async (req, res) => {
    try {
      const cuarto = await Cuarto.findByPk(req.params.id);
      if (!cuarto) return res.status(404).json({ error: 'Cuarto no encontrado' });
  
      await cuarto.destroy();
      res.json({ message: 'Cuarto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el cuarto' });
    }
  };