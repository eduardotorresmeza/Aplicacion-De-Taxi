import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Toast } from 'react-bootstrap';
import { FaTaxi, FaPlusCircle, FaEdit, FaTrash } from 'react-icons/fa';

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ id_categoria: '', nombre: '' });
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState('success');

  
  useEffect(() => {
    axios.get('http://localhost:5000/categorias')
      .then((res) => {
        setCategorias(res.data);
      })
      .catch((error) => console.error('Error al obtener las categorías:', error));
  }, []);

 
  const handleSubmit = () => {
    if (!formData.nombre) {
      setToastMessage('El nombre de la categoría es obligatorio.');
      setToastVariant('danger');
      setShowToast(true);
      return;
    }

    if (formData.id_categoria) {
      
      axios.put(`http://localhost:5000/categorias/${formData.id_categoria}`, formData)
        .then((res) => {
        
          setCategorias(prevCategorias => 
            prevCategorias.map(categoria => 
              categoria.id_categoria === res.data.id_categoria ? res.data : categoria
            )
          );
          setShow(false); 
          setToastMessage('Categoría actualizada correctamente');
          setToastVariant('success');
          setShowToast(true);
        })
        .catch(error => {
          console.error('Error al actualizar la categoría:', error);
          setToastMessage('Error al actualizar la categoría');
          setToastVariant('danger');
          setShowToast(true);
        });
    } else {
   
      axios.post('http://localhost:5000/categorias', formData)
        .then((res) => {
          setCategorias(prevCategorias => [...prevCategorias, res.data]); // Agregar la nueva categoría a la lista
          setShow(false); 
          setToastMessage('Categoría agregada correctamente');
          setToastVariant('success');
          setShowToast(true);
        })
        .catch(error => {
          console.error('Error al agregar la categoría:', error);
          setToastMessage('Error al agregar la categoría');
          setToastVariant('danger');
          setShowToast(true);
        });
    }
  };

  
  const handleEdit = (categoria) => {
    setFormData({ id_categoria: categoria.id_categoria, nombre: categoria.nombre });
    setShow(true); 
  };

 
  const handleDelete = (id_categoria) => {
    axios.delete(`http://localhost:5000/categorias/${id_categoria}`)
      .then(() => {
       
        setCategorias(prevCategorias => 
          prevCategorias.filter(categoria => categoria.id_categoria !== id_categoria)
        );
        setToastMessage('Categoría eliminada correctamente');
        setToastVariant('danger');
        setShowToast(true);
      })
      .catch(error => {
        console.error('Error al eliminar la categoría:', error);
        setToastMessage('Error al eliminar la categoría');
        setToastVariant('danger');
        setShowToast(true);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4" style={{ color: '#FFCC00' }}>
        <FaTaxi /> Categorías
      </h1>

      <Button
        variant="success"
        onClick={() => {
          setFormData({ id_categoria: '', nombre: '' }); 
          setShow(true);
        }}
        className="mb-4"
        size="lg"
      >
        <FaPlusCircle className="mr-2" /> Agregar Categoría
      </Button>

      <Table striped bordered hover responsive className="shadow-lg rounded">
        <thead className="bg-warning text-dark">
          <tr>
            <th>Orden</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id_categoria}>
              <td>{categoria.id_categoria}</td>
              <td>{categoria.nombre}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(categoria)}
                  className="mr-2"
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(categoria.id_categoria)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>{formData.id_categoria ? 'Editar Categoría' : 'Nueva Categoría'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de la categoría"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {formData.id_categoria ? 'Actualizar' : 'Guardar'}
          </Button>
        </Modal.Footer>
      </Modal>

      {}
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

export default Categorias;
