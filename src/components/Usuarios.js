import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Toast } from 'react-bootstrap';
import { FaUserPlus, FaUserEdit, FaTrashAlt } from 'react-icons/fa';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Flag for editing mode
  const [currentUser, setCurrentUser] = useState(null); // Current user being edited
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '' });

  // Notificaciones
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  useEffect(() => {
    fetchUsuarios(); // Cargar usuarios al iniciar el componente
  }, []);

  const fetchUsuarios = () => {
    axios
      .get('http://localhost:5000/usuarios')
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error('Error al cargar usuarios:', err));
  };

  const handleSubmit = () => {
    if (isEditing) {
      // Update the user
      axios
        .put(`http://localhost:5000/usuarios/${currentUser.id_usuario}`, formData)
        .then(() => {
          fetchUsuarios(); // Recargar la lista de usuarios después de actualizar
          setShow(false);
          setIsEditing(false);
          setCurrentUser(null);
          setFormData({ nombre: '', email: '', telefono: '' });
          showToastNotification('Usuario actualizado correctamente.', 'success');
        })
        .catch((err) => {
          console.error('Error al actualizar usuario:', err);
          showToastNotification('Error al actualizar el usuario.', 'danger');
        });
    } else {
      // Create a new user
      axios
        .post('http://localhost:5000/usuarios', formData)
        .then(() => {
          fetchUsuarios(); // Recargar la lista de usuarios después de crear
          setShow(false);
          setFormData({ nombre: '', email: '', telefono: '' });
          showToastNotification('Usuario creado correctamente.', 'success');
        })
        .catch((err) => {
          console.error('Error al crear usuario:', err);
          showToastNotification('Error al crear el usuario.', 'danger');
        });
    }
  };

  const handleEdit = (usuario) => {
    setIsEditing(true);
    setCurrentUser(usuario);
    setFormData({ nombre: usuario.nombre, email: usuario.email, telefono: usuario.telefono });
    setShow(true);
  };

  const handleDelete = (id_usuario) => {
    axios
      .delete(`http://localhost:5000/usuarios/${id_usuario}`)
      .then(() => {
        fetchUsuarios(); // Recargar la lista de usuarios después de eliminar
        showToastNotification('Usuario eliminado correctamente.', 'success');
      })
      .catch((err) => {
        console.error('Error al eliminar usuario:', err);
        showToastNotification('Error al eliminar el usuario.', 'danger');
      });
  };

  const showToastNotification = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4" style={{ color: '#FFCC00' }}>
        <FaUserEdit /> Usuarios
      </h1>

      <Button
        variant="success"
        onClick={() => {
          setShow(true);
          setIsEditing(false);
          setFormData({ nombre: '', email: '', telefono: '' });
        }}
        className="mb-4"
        size="lg"
      >
        <FaUserPlus className="mr-2" /> Agregar Usuario
      </Button>

      <Table striped bordered hover responsive className="shadow-lg rounded">
        <thead className="bg-warning text-dark">
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.telefono}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(usuario)} className="mr-2">
                  <FaUserEdit />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(usuario.id_usuario)}>
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>{isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese teléfono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              />
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
        delay={3000}
        autohide
        className={`bg-${toastVariant} text-white position-fixed bottom-0 end-0 m-3`}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
}

export default Usuarios;
