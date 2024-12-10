import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Toast } from 'react-bootstrap';
import { FaCar, FaPlusCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';

function Taxis() {
  const [taxis, setTaxis] = useState([]);
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaxi, setCurrentTaxi] = useState(null);
  const [formData, setFormData] = useState({ placa: '', marca: '', estado: 'Libre' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

 
  useEffect(() => {
    fetchTaxis();
  }, []);

  const fetchTaxis = async () => {
    try {
      const response = await axios.get('http://localhost:5000/taxis');
      setTaxis(response.data);
    } catch (error) {
      console.error('Error al obtener taxis:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.placa || !formData.marca) {
      showNotification('Todos los campos son obligatorios.', 'danger');
      return;
    }

    try {
      if (isEditing) {
        const response = await axios.put(`http://localhost:5000/taxis/${currentTaxi.id_taxi}`, formData);
        const updatedTaxi = { ...currentTaxi, ...response.data, ...formData };
        setTaxis(taxis.map((taxi) => (taxi.id_taxi === currentTaxi.id_taxi ? updatedTaxi : taxi)));
        showNotification('Taxi actualizado con éxito.', 'success');
      } else {
        const response = await axios.post('http://localhost:5000/taxis', formData);
        setTaxis([...taxis, response.data]);
        showNotification('Taxi agregado con éxito.', 'success');
      }
      setShow(false);
      resetForm();
    } catch (error) {
      console.error('Error al guardar taxi:', error);
      showNotification('Error al guardar el taxi.', 'danger');
    }
  };

  const handleEdit = (taxi) => {
    setIsEditing(true);
    setCurrentTaxi(taxi);
    setFormData({ placa: taxi.placa, marca: taxi.marca, estado: taxi.estado });
    setShow(true);
  };

  const handleDelete = async (id_taxi) => {
    try {
      await axios.delete(`http://localhost:5000/taxis/${id_taxi}`);
      setTaxis(taxis.filter((taxi) => taxi.id_taxi !== id_taxi));
      showNotification('Taxi eliminado con éxito.', 'danger');
    } catch (error) {
      console.error('Error al eliminar taxi:', error);
      showNotification('Error al eliminar el taxi.', 'danger');
    }
  };

  const showNotification = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const resetForm = () => {
    setFormData({ placa: '', marca: '', estado: 'Libre' });
    setIsEditing(false);
    setCurrentTaxi(null);
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4" style={{ color: '#FFCC00' }}>
        <FaCar /> Taxis
      </h1>

      <Button
        variant="success"
        onClick={() => {
          resetForm();
          setShow(true);
        }}
        className="mb-4"
        size="lg"
      >
        <FaPlusCircle className="mr-2" /> Agregar Taxi
      </Button>

      <Table striped bordered hover responsive className="shadow-lg rounded">
        <thead className="bg-warning text-dark">
          <tr>
            <th>Codigo</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {taxis.map((taxi) => (
            <tr key={taxi.id_taxi}>
              <td>{taxi.id_taxi}</td>
              <td>{taxi.placa}</td>
              <td>{taxi.marca}</td>
              <td>
                <span className={taxi.estado === 'Libre' ? 'text-success' : 'text-danger'}>
                  {taxi.estado}
                </span>
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(taxi)} className="mr-2">
                  <FaEdit />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(taxi.id_taxi)}>
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>{isEditing ? 'Editar Taxi' : 'Nuevo Taxi'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Placa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la placa"
                value={formData.placa}
                onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la marca"
                value={formData.marca}
                onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              >
                <option value="Libre">Libre</option>
                <option value="Ocupado">Ocupado</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEditing ? 'Actualizar' : 'Guardar'}
          </Button>
        </Modal.Footer>
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

export default Taxis;
