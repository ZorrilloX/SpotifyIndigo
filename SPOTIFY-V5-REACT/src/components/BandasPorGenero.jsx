import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const BandasPorGenero = () => {
  const { generoId } = useParams();
  const [bandas, setBandas] = useState([]);

  // Cargar las bandas del género seleccionado
  useEffect(() => {
    const fetchBandas = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/generos/${generoId}/bandas`);
        setBandas(response.data);
      } catch (error) {
        console.error("Error al cargar las bandas", error);
      }
    };
    fetchBandas();
  }, [generoId]);

  return (
    <Container>
      <h1 className="text-center mt-8">Bandas del Género</h1>

      <Row className="mt-4 g-4 justify-content-center">
        {bandas.map((banda) => (
          <Col xs={12} sm={6} md={4} lg={3} key={banda.id} className="mb-4">
            <Card
              style={{ cursor: "pointer", height: "100%", minHeight: "300px" }}
              onClick={() => window.location.href = `/banda/${banda.id}`}
            >
              <Card.Img
                variant="top"
                src={`http://localhost:3000/imagenes/${banda.id}.jpg`} 
                alt={banda.nombre}
                style={{ objectFit: "cover", height: "150px" }}
              />
              <Card.Body>
                <Card.Title>{banda.nombre}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BandasPorGenero;
