import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FormCancion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [duracion, setDuracion] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [bandaId, setBandaId] = useState('');
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      axios.get(`http://localhost:3000/canciones/${id}`)
        .then(res => {
          setNombre(res.data.nombre);
          setDuracion(res.data.duracion);
          setAlbumId(res.data.album_id);
          setBandaId(res.data.banda_id);
        })
        .catch(error => {
          setError('Error al cargar los datos de la canción');
        });
    }
  }, [id]);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleDuracionChange = (e) => {
    setDuracion(e.target.value);
  };

  const handleAlbumChange = (e) => {
    setAlbumId(e.target.value);
  };

  const handleBandaChange = (e) => {
    setBandaId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nombre,
      duracion,
      album_id: albumId,
      banda_id: bandaId,
    };

    try {
      if (isEdit) {
        await axios.put(`http://localhost:3000/canciones/${id}`, formData);
      } else {
        await axios.post('http://localhost:3000/canciones', formData);
      }
      navigate('/canciones');
    } catch (err) {
      setError('Error al crear/editar canción: ' + err.message);
      console.error('Error:', err);
    }
  };

  return (
    <Container>
      <h2>{isEdit ? 'Editar Canción' : 'Crear Canción'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" value={nombre} onChange={handleNombreChange} placeholder="Nombre de la canción" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDuracion">
          <Form.Label>Duración (minutos)</Form.Label>
          <Form.Control type="text" value={duracion} onChange={handleDuracionChange} placeholder="Duración de la canción" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAlbum">
          <Form.Label>Álbum</Form.Label>
          <Form.Control type="number" value={albumId} onChange={handleAlbumChange} placeholder="ID del Álbum" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBanda">
          <Form.Label>Banda</Form.Label>
          <Form.Control type="number" value={bandaId} onChange={handleBandaChange} placeholder="ID de la Banda" required />
        </Form.Group>

        <Button variant="primary" type="submit">
          {isEdit ? 'Actualizar Canción' : 'Crear Canción'}
        </Button>
      </Form>
    </Container>
  );
};

export default FormCancion;
