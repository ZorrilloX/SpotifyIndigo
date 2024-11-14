import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('nombre', nombre);
  if (imagen) formData.append('imagen', imagen);

  // Verifica que el FormData esté bien configurado
  console.log('FormData:', formData);

  try {
    const response = await axios.post('http://localhost:3000/generos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Género creado:', response.data);
    setNombre('');
    setImagen(null);
  } catch (err) {
    setError('Error al crear género: ' + err.message);
    console.error('Error al crear género:', err);
  }
};

  return (
    <Container>
      <h2>Crear Género</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleChange}
            placeholder="Nombre del género"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="file"
            name="imagen"
            onChange={handleImageChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Crear Género
        </Button>
      </Form>
    </Container>
  );
};

export default FormGenero;
