{/* Esta ferramenta "StrictMode" do react, 
  é usada para que o sistema informe para 
  nós quando fizermos algo errado */}
import { StrictMode } from 'react';
{/* "createRoot", utilizada para identificar 
  o nosso elemento "root" que existe dentro 
  do nosso index.html */}
import { createRoot } from 'react-dom/client';
{/* Importanto todas as informações de dentro
   da constante "Root" dentro do script Route.jsx */}
import Root from "./routes/Route.jsx";
{/* Aqui é o link do css da página Main */}
import './index.css';

{/* "CreateRoot" é para ele identificar a rota
   e enviar a informação para o local correto */}
createRoot(document.getElementById('root')
).render(
  /* "StrictMode" para que o sistema sinalize caso
   fizermos algo errado */
  <StrictMode>
    <Root />
  </StrictMode>
);
