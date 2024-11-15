import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 

const FormAlbum = () => {
  const { id } = useParams();  
  const navigate = useNavigate();  
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState(null);
  const [bandaId, setBandaId] = useState('');
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      axios.get(`http://localhost:3000/albums/${id}`)
        .then(res => {
          setNombre(res.data.nombre);
          setBandaId(res.data.banda_id);
        })
        .catch(error => {
          setError('Error al cargar los datos del álbum');
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

  const handleBandaChange = (e) => {
    setBandaId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('image', imagen);
    formData.append('banda_id', bandaId);

    try {
      if (isEdit) {
        await axios.put(`http://localhost:3000/albums/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('http://localhost:3000/albums', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      navigate('/albums');
    } catch (err) {
      setError('Error al crear/editar álbum: ' + err.message);
      console.error('Error:', err);
    }
  };

  return (
    <Container>
      <h2>{isEdit ? 'Editar Álbum' : 'Crear Álbum'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" value={nombre} onChange={handleChange} placeholder="Nombre del álbum" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBanda">
          <Form.Label>Banda</Form.Label>
          <Form.Control type="number" value={bandaId} onChange={handleBandaChange} placeholder="ID de la Banda" required />
        </Form.Group>

        <Button variant="primary" type="submit">
          {isEdit ? 'Actualizar Álbum' : 'Crear Álbum'}
        </Button>
      </Form>
    </Container>
  );
};

export default FormAlbum;
