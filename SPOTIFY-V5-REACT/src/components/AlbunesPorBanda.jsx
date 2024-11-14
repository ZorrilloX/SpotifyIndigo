import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const AlbunesPorBanda = () => {
  const { bandaId } = useParams();
  const [albunes, setAlbunes] = useState([]);

  // Cargar los álbumes de la banda seleccionada
  useEffect(() => {
    const fetchAlbunes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/bandas/${bandaId}/albunes`);
        setAlbunes(response.data);
      } catch (error) {
        console.error("Error al cargar los álbumes", error);
      }
    };
    fetchAlbunes();
  }, [bandaId]);

  return (
    <Container>
      <h1 className="text-center mt-8">Álbumes de la Banda</h1>

      <Row className="mt-4 g-4 justify-content-center">
        {albunes.map((album) => (
          <Col xs={12} sm={6} md={4} lg={3} key={album.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={`http://localhost:3000/imagenes/${album.id}.jpg`}
                alt={album.nombre}
                style={{ objectFit: "cover", height: "150px" }}
              />
              <Card.Body>
                <Card.Title>{album.nombre}</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => window.location.href = `/album/${album.id}`}
                >
                  Ver Canciones
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AlbunesPorBanda;
