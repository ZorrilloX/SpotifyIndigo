import { Route, Link } from "react-router-dom";
import ListaGeneros from "./components/ListaGeneros";
import FormGenero from "./components/FormGenero";

const App = () => {
  return (
    <>
      <h1>Bienvenido a la aplicación de géneros musicales</h1>
      <nav>
        <ul>
          <li><Link to="/generos">Lista de Géneros</Link></li>
          <li><Link to="/generos/create">Crear Género</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/generos" element={<ListaGeneros />} />
        <Route path="/generos/create" element={<FormGenero />} />
        <Route path="/generos/:id" element={<FormGenero />} />
      </Routes>
    </>
  );
};

export default App;
