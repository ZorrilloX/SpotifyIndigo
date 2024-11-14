import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import ListaGeneros from './components/ListaGeneros';
import FormGenero from './components/FormGenero';
import 'bootstrap/dist/css/bootstrap.min.css';

// Definición de rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  // Página principal que contiene otras rutas internas
  },
  {
    path: "/generos",
    element: <ListaGeneros />,  // Lista de géneros
  },
  {
    path: "/generos/create",
    element: <FormGenero />,  // Formulario para crear género
  },
  {
    path: "/generos/:id",
    element: <FormGenero />,  // Formulario para editar un género
  }
]);

// Renderización del router
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
