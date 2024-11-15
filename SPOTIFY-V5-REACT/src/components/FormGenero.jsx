import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 

const FormGenero = () => {
  const { id } = useParams();  
  const navigate = useNavigate();  
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      axios.get(`http://localhost:3000/generos/${id}`)
        .then(res => {
          setNombre(res.data.nombre);
        })
        .catch(error => {
          setError('Error al cargar los datos del género');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const fields = [
      { key: 'nombre', value: nombre, description: '', type: 'text', enabled: true },
      { key: 'image', value: imagen, description: '', type: 'file', enabled: true }
    ];

    fields.forEach((field) => {
      formData.append(field.key, field.value);
    });

    try {
      if (isEdit) {
        const response = await axios.put(`http://localhost:3000/generos/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Género editado:', response.data);
      } else {

        const response = await axios.post('http://localhost:3000/generos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Género creado:', response.data);
      }
     
      navigate('/generos');
    } catch (err) {
      setError('Error al crear/editar género: ' + err.message);
      console.error('Error:', err);
    }
  };

  return (
    <Container>
      <h2>{isEdit ? 'Editar Género' : 'Crear Género'}</h2>
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
          {isEdit ? 'Actualizar Género' : 'Crear Género'}
        </Button>
      </Form>
    </Container>
  );
};

export default FormGenero;
