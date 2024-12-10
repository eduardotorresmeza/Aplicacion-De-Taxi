import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

function Bienvenida() {
  return (
    <div className="container mt-5">
      <Card className="shadow-lg rounded">
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: '#FFCC00' }}>Bienvenido a TaxiPro</h2>
          <p className="text-center">Esta es tu aplicación de gestión de taxis. Aquí podrás administrar usuarios, taxis, rutas y categorías. ¿Qué te gustaría hacer hoy?</p>
          
        

          <Row className="mt-5">
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h4>Usuarios</h4>
                  <p>Aquí puedes ver todos los usuarios registrados en la aplicación, gestionarlos, agregar nuevos o editar su información.</p>
                  <Button variant="info" href="/usuarios">Ver Detalles</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h4>Taxis</h4>
                  <p>Consulta la información de los taxis disponibles, gestiona los vehículos y su estado de operación.</p>
                  <Button variant="info" href="/taxis">Ver Detalles</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h4>Categorías</h4>
                  <p>Administra las categorías de taxis, como lujo, económico, o cualquier otra que sea útil para tu sistema.</p>
                  <Button variant="info" href="/categorias">Ver Detalles</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h4>Rutas</h4>
                  <p>Aquí puedes visualizar y administrar las rutas disponibles para cada taxi y su asignación.</p>
                  <Button variant="info" href="/rutas">Ver Detalles</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Bienvenida;
