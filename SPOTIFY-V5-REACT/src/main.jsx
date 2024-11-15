import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import ListaGeneros from './components/ListaGeneros';
import FormGenero from './components/FormGenero';
import ListaCanciones from './components/ListaCanciones';
import FormCancion from './components/FormCancion';
import ListaAlbumes from './components/ListaAlbumes';
import FormAlbum from './components/FormAlbum';
import ListaBandas from './components/ListaBandas';
import FormBanda from './components/FormBanda';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/generos",
    element: <ListaGeneros />,
  },
  {
    path: "/generos/create",
    element: <FormGenero />,
  },
  {
    path: "/generos/:id",
    element: <FormGenero />,
  },
  {
    path: "/canciones",
    element: <ListaCanciones />,
  },
  {
    path: "/canciones/crear",
    element: <FormCancion />,
  },
  {
    path: "/canciones/editar/:id",
    element: <FormCancion />,
  },
  {
    path: "/albumes",
    element: <ListaAlbumes />,
  },
  {
    path: "/albumes/crear",
    element: <FormAlbum />,
  },
  {
    path: "/albumes/editar/:id",
    element: <FormAlbum />,
  },
  {
    path: "/bandas",
    element: <ListaBandas />,
  },
  {
    path: "/bandas/crear",
    element: <FormBanda />,
  },
  {
    path: "/bandas/editar/:id",
    element: <FormBanda />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
