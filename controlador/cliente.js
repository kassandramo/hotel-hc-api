const Cliente = require('../modelos/cliente');

exports.getClientes= async (req, res) =>  {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes' });
      }
  };

  exports.getClientesById = async (req, res) =>  {

  }
  exports.altaCliente= async (req, res) =>  {
    try {
        const { nombre_cliente, email_cliente, telefono_cliente } = req.body;
        const cliente = await Cliente.create({ nombre_cliente, email_cliente, telefono_cliente });
        res.status(201).json(cliente);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear el cliente' });
      }
  }
  exports.actualizarCliente= async (req, res) =>  {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    
        await cliente.update(req.body);
        res.json(cliente);
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el cliente' });
      }
  }

  exports.eliminar = async (req, res) => {
    try {
      const cliente = await Cliente.findByPk(req.params.id);
      if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
  
      await cliente.destroy();
      res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
  };
