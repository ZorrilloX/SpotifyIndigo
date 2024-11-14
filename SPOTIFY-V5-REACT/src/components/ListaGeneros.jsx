import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListaGeneros = () => {
    const [listaGeneros, setListaGeneros] = useState([]);

    useEffect(() => {
        getListaGeneros();
        document.title = "Lista de Géneros";
    }, []);

    const getListaGeneros = () => {
        axios.get('http://localhost:3000/generos')
            .then(res => {
                setListaGeneros(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar este género?");
        if (!confirm) return;

        axios.delete(`http://localhost:3000/generos/${id}`)
            .then(() => {
                getListaGeneros(); // Actualizar lista después de eliminar
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
                                <h2>Lista de Géneros</h2>
                            </Card.Title>
                            <Button variant="success" className="mb-3" as={Link} to="/generos/create">Agregar Género</Button>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaGeneros.map(genero => (
                                        <tr key={genero.id}>
                                            <td>{genero.id}</td>
                                            <td>{genero.nombre}</td>
                                            <td><Link className="btn btn-primary" to={"/generos/" + genero.id}>Editar</Link></td>
                                            <td><Button variant="danger" onClick={() => eliminar(genero.id)}>Eliminar</Button></td>
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

export default ListaGeneros;
