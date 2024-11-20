// controlador/reservacion.controler.js
const Reservacion = require("../modelos/reservacion.model");
const Cuarto = require("../modelos/cuarto.model");
const { Op,Sequelize } = require("sequelize");

// Obtener todas las reservaciones
exports.getReservaciones = async (req, res) => {
  try {
    const reservaciones = await Reservacion.findAll();
    res.status(200).json(reservaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una reservación por ID
exports.getReservacionById = async (req, res) => {
  try {
    const reservacion = await Reservacion.findByPk(req.params.id);
    if (reservacion) {
      res.status(200).json(reservacion);
    } else {
      res.status(404).json({ message: "Reservación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para verificar la disponibilidad y crear la reservación
exports.crearReservacion = async (req, res) => {
  const {
    id_cuarto,
    nombre_cliente,
    email_cliente,
    telefono_cliente,
    ingreso,
    salida,
    cantidad_huespedes,
    notas,
    comentarios_especiales,
    codigo_promocional,
  } = req.body;

  try {
    // Paso 1: Buscar el cuarto
    const cuarto = await Cuarto.findByPk(id_cuarto);
    if (!cuarto) {
      return res.status(404).json({ error: "Cuarto no encontrado" });
    }

    // Paso 2: Verificar si hay reservaciones solapadas con el rango de fechas seleccionado
    const reservacionesSolapadas = await Reservacion.count({
      where: {
        id_cuarto: id_cuarto,
        activo: 1, // Considerar solo las reservaciones activas
        [Op.or]: [
          {
            // Si la fecha de ingreso está entre las fechas de la nueva reservación
            ingreso: {
              [Op.lt]: salida, // Menor que la nueva fecha de salida
            },
            salida: {
              [Op.gt]: ingreso, // Mayor que la nueva fecha de ingreso
            },
          },
        ],
      },
    });

    // Paso 3: Validar si hay cuartos disponibles
    if (reservacionesSolapadas >= cuarto.cantidad_disponibles) {
      return res.status(400).json({
        error: "No hay cuartos disponibles para el periodo seleccionado",
      });
    }

    // Paso 4: Crear la reservación
    const nuevaReservacion = await Reservacion.create({
      id_cuarto,
      nombre_cliente,
      email_cliente,
      telefono_cliente,
      ingreso,
      salida,
      cantidad_huespedes,
      notas,
      comentarios_especiales,
      codigo_promocional,
      activo: 1,
    });

    // Respuesta exitosa
    res.status(201).json({
      message: "Reservación creada exitosamente",
      reservacion: nuevaReservacion,
    });
  } catch (error) {
    console.error("Error al crear reservación:", error);
    res.status(500).json({ error: "Error al crear reservación" });
  }
};

// Actualizar una reservación
exports.actualizarReservacion = async (req, res) => {
  const {
    id_reservacion,
    nombre_cliente,
    email_cliente,
    telefono_cliente,
    cantidad_huespedes,
    comentarios_especiales,
    ingreso,
    salida,
    id_cuarto,
  } = req.body;

  console.log("id_reservacion: ", id_reservacion);

  try {
    // Busca la reservación actual para obtener los valores actuales
    const reservacion = await Reservacion.findByPk(id_reservacion);
    if (!reservacion) {
      return res.status(404).json({ message: "Reservación no encontrada." });
    }

    // Si también hay un nuevo cuarto y nuevas fechas, verifica disponibilidad
    if (
      ingreso !== undefined &&
      salida !== undefined &&
      id_cuarto !== undefined
    ) {
      // Verificar si la nueva fecha de ingreso coincide con alguna fecha de salida
      const coincidenciaSalida = await Reservacion.findOne({
        where: {
          id_cuarto: id_cuarto,
          activo: 1,
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn('DATE_FORMAT', Sequelize.col('salida'), '%Y-%m-%d'),
              ingreso
            ),
          ],
        },
      });

      console.log("Fecha de ingreso: ", ingreso); // Verifica que la fecha sea correcta
      console.log("Fecha de salida de coincidencia: ", coincidenciaSalida);

      if (!coincidenciaSalida) {
        return res
          .status(400)
          .json({
            message:
              "No hay habitaciones disponibles para esa fecha de ingreso.",
          });
      }

      // Verificar si hay suficientes cuartos disponibles en el nuevo rango de fechas
      const habitacionesOcupadas = await Reservacion.count({
        where: {
          id_cuarto: id_cuarto,
          activo: 1,
          id_reservacion: { [Op.ne]: id_reservacion }, // Excluir la reservación actual
          [Op.or]: [
            {
              // Reservaciones cuyo ingreso o salida esté dentro del nuevo rango
              ingreso: { [Op.between]: [ingreso, salida] },
              salida: { [Op.between]: [ingreso, salida] },
            },
            {
              // Reservaciones que ocupan todo el nuevo rango de fechas
              [Op.and]: [
                { ingreso: { [Op.lte]: ingreso } },
                { salida: { [Op.gte]: salida } },
              ],
            },
          ],
        },
      });

      // Verifica la cantidad disponible de cuartos
      const cuarto = await Cuarto.findByPk(id_cuarto);
      if (habitacionesOcupadas >= cuarto.cantidad_disponibles) {
        return res.status(400).json({
          message:
            "No hay habitaciones disponibles para las nuevas fechas seleccionadas.",
        });
      }
    }

    // Actualizar los datos de la reservación
    await Reservacion.update(
      {
        nombre_cliente: nombre_cliente || reservacion.nombre_cliente,
        email_cliente: email_cliente || reservacion.email_cliente,
        telefono_cliente: telefono_cliente || reservacion.telefono_cliente,
        cantidad_huespedes:
          cantidad_huespedes || reservacion.cantidad_huespedes,
        comentarios_especiales:
          comentarios_especiales || reservacion.comentarios_especiales,
        ingreso: ingreso || reservacion.ingreso,
        salida: salida || reservacion.salida,
        id_cuarto: id_cuarto || reservacion.id_cuarto,
      },
      {
        where: { id_reservacion },
      }
    );

    res.json({ message: "Reservación actualizada con éxito." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar la reservación.", error });
  }
};

// Eliminar una reservación
exports.deleteReservacion = async (req, res) => {
  try {
    const reservacion = await Reservacion.findByPk(req.params.id);
    if (reservacion) {
      await reservacion.destroy();
      res.status(200).json({ message: "Reservación eliminada" });
    } else {
      res.status(404).json({ message: "Reservación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
