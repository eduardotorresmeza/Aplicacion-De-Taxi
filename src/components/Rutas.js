import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Toast } from 'react-bootstrap';
import { FaPlusCircle, FaEdit, FaTrash } from 'react-icons/fa';

function Rutas() {
  const [rutas, setRutas] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    id_ruta: '',
    nombre: '',
    origen: '',
    destino: '',
    distancia: '',
    tiempo_estimado: '',
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success'); 

  // Obtener rutas desde la API
  useEffect(() => {
    axios
      .get('http://localhost:5000/rutas')
      .then((res) => setRutas(res.data))
      .catch((err) => console.error('Error al obtener rutas:', err));
  }, []);

 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (
      !formData.nombre ||
      !formData.origen ||
      !formData.destino ||
      !formData.distancia ||
      !formData.tiempo_estimado
    ) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (formData.id_ruta) {
    
      axios
        .put(`http://localhost:5000/rutas/${formData.id_ruta}`, formData)
        .then((res) => {
          setRutas((prevRutas) =>
            prevRutas.map((ruta) =>
              ruta.id_ruta === res.data.id_ruta ? res.data : ruta
            )
          );
          showNotification('Ruta actualizada con éxito!', 'success');
          setShow(false);
          resetForm();
        })
        .catch((err) => console.error('Error al actualizar la ruta:', err));
    } else {
      
      axios
        .post('http://localhost:5000/rutas', formData)
        .then((res) => {
          setRutas((prevRutas) => [...prevRutas, res.data]);
          showNotification('Ruta agregada con éxito!', 'success');
          setShow(false);
          resetForm();
        })
        .catch((err) => console.error('Error al agregar ruta:', err));
    }
  };

  
  const handleEdit = (ruta) => {
    setFormData({ ...ruta });
    setShow(true); 
  };

  
  const handleDelete = (id_ruta) => {
    axios
      .delete(`http://localhost:5000/rutas/${id_ruta}`)
      .then(() => {
        setRutas((prevRutas) =>
          prevRutas.filter((ruta) => ruta.id_ruta !== id_ruta)
        );
        showNotification('Ruta eliminada con éxito!', 'danger');
      })
      .catch((err) => console.error('Error al eliminar la ruta:', err));
  };

  
  const showNotification = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); 
  };

 
  const resetForm = () => {
    setFormData({
      id_ruta: '',
      nombre: '',
      origen: '',
      destino: '',
      distancia: '',
      tiempo_estimado: '',
    });
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4" style={{ color: '#FFCC00' }}>
        Rutas
      </h1>

      <Button
        variant="success"
        onClick={() => setShow(true)}
        className="mb-4"
        size="lg"
      >
        <FaPlusCircle className="mr-2" /> Agregar Ruta
      </Button>

      <Table striped bordered hover responsive className="shadow-lg rounded">
        <thead className="bg-warning text-dark">
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Distancia (km)</th>
            <th>Tiempo Estimado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rutas.map((ruta) => (
            <tr key={ruta.id_ruta}>
              <td>{ruta.id_ruta}</td>
              <td>{ruta.nombre}</td>
              <td>{ruta.origen}</td>
              <td>{ruta.destino}</td>
              <td>{ruta.distancia}</td>
              <td>{ruta.tiempo_estimado}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(ruta)}
                  className="mr-2"
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(ruta.id_ruta)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {   }
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>{formData.id_ruta ? 'Editar Ruta' : 'Nueva Ruta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de la ruta"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Origen</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el origen de la ruta"
                value={formData.origen}
                onChange={(e) =>
                  setFormData({ ...formData, origen: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Destino</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el destino de la ruta"
                value={formData.destino}
                onChange={(e) =>
                  setFormData({ ...formData, destino: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Distancia</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese la distancia en kilómetros"
                value={formData.distancia}
                onChange={(e) =>
                  setFormData({ ...formData, distancia: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tiempo Estimado</Form.Label>
              <Form.Control
                type="time"
                value={formData.tiempo_estimado}
                onChange={(e) =>
                  setFormData({ ...formData, tiempo_estimado: e.target.value })
                }
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        autohide
        className={`bg-${toastVariant} text-white position-fixed bottom-0 end-0 m-3`}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
}

export default Rutas;
