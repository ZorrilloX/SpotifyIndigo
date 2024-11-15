import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 

const FormBanda = () => {
  const { id } = useParams();  
  const navigate = useNavigate();  
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState(null);
  const [generoId, setGeneroId] = useState('');
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      axios.get(`http://localhost:3000/bandas/${id}`)
        .then(res => {
          setNombre(res.data.nombre);
          setGeneroId(res.data.genero_id);
        })
        .catch(error => {
          setError('Error al cargar los datos de la banda');
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

  const handleGeneroChange = (e) => {
    setGeneroId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('image', imagen);
    formData.append('genero_id', generoId);

    try {
      if (isEdit) {
        await axios.put(`http://localhost:3000/bandas/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('http://localhost:3000/bandas', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      navigate('/bandas');
    } catch (err) {
      setError('Error al crear/editar banda: ' + err.message);
      console.error('Error:', err);
    }
  };

  return (
    <Container>
      <h2>{isEdit ? 'Editar Banda' : 'Crear Banda'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" value={nombre} onChange={handleChange} placeholder="Nombre de la banda" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGenero">
          <Form.Label>Género</Form.Label>
          <Form.Control type="number" value={generoId} onChange={handleGeneroChange} placeholder="ID del Género" required />
        </Form.Group>

        <Button variant="primary" type="submit">
          {isEdit ? 'Actualizar Banda' : 'Crear Banda'}
        </Button>
      </Form>
    </Container>
  );
};

export default FormBanda;
