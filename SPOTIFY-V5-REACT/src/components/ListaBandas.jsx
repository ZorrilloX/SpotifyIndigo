import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListaBandas = () => {
    const [listaBandas, setListaBandas] = useState([]);

    useEffect(() => {
        getListaBandas();
        document.title = "Lista de Bandas";
    }, []);

    const getListaBandas = () => {
        axios.get('http://localhost:3000/bandas')
            .then(res => {
                setListaBandas(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar esta banda?");
        if (!confirm) return;

        axios.delete(`http://localhost:3000/bandas/${id}`)
            .then(() => {
                getListaBandas(); // Actualizar lista después de eliminar
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <Container className="mt-3 mb-3">
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h2>Lista de Bandas</h2>
                            </Card.Title>
                            <Button variant="success" className="mb-3" as={Link} to="/bandas/create">Agregar Banda</Button>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Género</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaBandas.map(banda => (
                                        <tr key={banda.id}>
                                            <td>{banda.id}</td>
                                            <td>{banda.nombre}</td>
                                            <td>{banda.genero_id}</td>
                                            <td><Link className="btn btn-primary" to={"/bandas/" + banda.id}>Editar</Link></td>
                                            <td><Button variant="danger" onClick={() => eliminar(banda.id)}>Eliminar</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ListaBandas;
