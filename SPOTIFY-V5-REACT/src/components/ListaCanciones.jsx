import React, { useState, useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListaCanciones = () => {
  const [canciones, setCanciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/canciones')
      .then(res => {
        setCanciones(res.data);
      })
      .catch(err => {
        setError('Error al cargar las canciones');
        console.error('Error:', err);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta canción?')) {
      try {
        await axios.delete(`http://localhost:3000/canciones/${id}`);
        setCanciones(canciones.filter(cancion => cancion.id !== id));
      } catch (err) {
        setError('Error al eliminar la canción');
        console.error('Error:', err);
      }
    }
  };

  return (
    <Container>
      <h2>Lista de Canciones</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Duración</th>
            <th>Álbum</th>
            <th>Banda</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {canciones.map(cancion => (
            <tr key={cancion.id}>
              <td>{cancion.nombre}</td>
              <td>{cancion.duracion}</td>
              <td>{cancion.album_id}</td>
              <td>{cancion.banda_id}</td>
              <td>
                <Link to={`/canciones/editar/${cancion.id}`} className="btn btn-warning me-2">
                  Editar
                </Link>
                <Button variant="danger" onClick={() => handleDelete(cancion.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/canciones/crear" className="btn btn-primary">Crear Canción</Link>
    </Container>
  );
};

export default ListaCanciones;
