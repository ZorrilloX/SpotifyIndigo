import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const CatalogoGeneros = () => {
  const [generos, setGeneros] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Cargar los géneros desde la API
  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await axios.get("http://localhost:3000/generos"); // Cambia la URL por la correcta
        setGeneros(response.data);
      } catch (error) {
        console.error("Error al cargar los géneros", error);
      }
    };
    fetchGeneros();
  }, []);

  // Filtrar géneros según búsqueda
  const filteredGeneros = generos.filter((genero) =>
    genero.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h1 className="text-center mt-8">Catálogo de Géneros Musicales</h1>

      {/* Buscador global */}
      <Form className="mt-4 mb-4">
        <Form.Control
          type="text"
          placeholder="Buscar por nombre de género"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      {/* Listado de géneros */}
      <Row className="mt-4 g-4 justify-content-center">
        {filteredGeneros.map((genero) => (
          <Col xs={12} sm={6} md={4} lg={3} key={genero.id} className="mb-4">
            <Card
              style={{ cursor: "pointer", height: "100%", minHeight: "300px" }}
              onClick={() => navigate(`/genero/${genero.id}`)} // Navega al listado de bandas
            >
              <Card.Img
                variant="top"
                src={`http://localhost:3000/imagenes/${genero.id}.jpg`} // Asegúrate de que las imágenes estén disponibles
                alt={genero.nombre}
                style={{ objectFit: "cover", height: "150px" }}
              />
              <Card.Body>
                <Card.Title>{genero.nombre}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {filteredGeneros.length === 0 && (
          <Col xs={12}>
            <p className="text-center">No se encontraron géneros.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CatalogoGeneros;
