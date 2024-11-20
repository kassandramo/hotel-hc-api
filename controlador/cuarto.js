const Cuarto = require('../modelos/cuarto');
const Servicio = require('../modelos/servicios');
const TipoCuarto = require('../modelos/tipoCuarto');
const ImagenCuarto = require('../modelos/imagenCuarto');
const CuartoServicio = require('../modelos/cuartoServicio');

exports.getAllCuartos = async (req, res) => {
  try {
    const cuartos = await Cuarto.findAll();
    res.json(cuartos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cuartos', error });
  }
};

exports.getCuartoById = async (req, res) => {
  try {
    const id = req.params.id;

    // Consultar el cuarto con su tipo, servicios e imágenes
    const cuarto = await Cuarto.findByPk(id, {
      include: [
        { model: TipoCuarto, attributes: ['nombre', 'descripcion'] },
        { 
          model: Servicio, 
          through: { attributes: [] }, // Ignorar la tabla intermedia `CuartoServicio`
          attributes: ['nombre', 'descripcion']
        },
        { 
          model: ImagenCuarto, 
          attributes: ['id_imagen', 'url', 'thumbnail', 'title']
        }
      ]
    });

    if (!cuarto) {
      return res.status(404).json({ message: 'Cuarto no encontrado' });
    }

    // Formatear la respuesta
    const response = {
      id: cuarto.id_cuarto,
      title: cuarto.TipoCuarto.nombre,
      description: cuarto.descripcion,
      mainImage: cuarto.ImagenCuarto[0]?.url || '',
      images: cuarto.ImagenCuarto.map(img => ({
        id: img.id_imagen,
        url: img.url,
        thumbnail: img.thumbnail,
        title: img.title
      }))
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el cuarto', error });
  }
};

exports.createCuarto = async (req, res) => {
  try {
    const cuarto = await Cuarto.create(req.body);
    res.status(201).json(cuarto);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cuarto', error });
  }
};

exports.updateCuarto = async (req, res) => {
  try {
    const cuarto = await Cuarto.findByPk(req.params.id);
    if (cuarto) {
      await cuarto.update(req.body);
      res.json(cuarto);
    } else {
      res.status(404).json({ message: 'Cuarto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar cuarto', error });
  }
};

exports.deleteCuarto = async (req, res) => {
  try {
    const cuarto = await Cuarto.findByPk(req.params.id);
    if (cuarto) {
      await cuarto.destroy();
      res.json({ message: 'Cuarto eliminado' });
    } else {
      res.status(404).json({ message: 'Cuarto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar cuarto', error });
  }
};
