import React, { useState, useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListaAlbumes = () => {
  const [albumes, setAlbumes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/albumes')
      .then(res => {
        setAlbumes(res.data);
      })
      .catch(err => {
        setError('Error al cargar los álbumes');
        console.error('Error:', err);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este álbum?')) {
      try {
        await axios.delete(`http://localhost:3000/albumes/${id}`);
        setAlbumes(albumes.filter(album => album.id !== id));
      } catch (err) {
        setError('Error al eliminar el álbum');
        console.error('Error:', err);
      }
    }
  };

  return (
    <Container>
      <h2>Lista de Álbumes</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Año</th>
            <th>Género</th>
            <th>Banda</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {albumes.map(album => (
            <tr key={album.id}>
              <td>{album.nombre}</td>
              <td>{album.anio}</td>
              <td>{album.genero_id}</td>
              <td>{album.banda_id}</td>
              <td>
                <Link to={`/albumes/editar/${album.id}`} className="btn btn-warning me-2">
                  Editar
                </Link>
                <Button variant="danger" onClick={() => handleDelete(album.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/albumes/crear" className="btn btn-primary">Crear Álbum</Link>
    </Container>
  );
};

export default ListaAlbumes;
