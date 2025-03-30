{/* Import é igual ao link, que usamos no html */ }
import './style.css';
import React from 'react';

{/* Criado uma constante apenas para dar um
     nome para que possemos importar as informações */}
const Relatorios = () => {
    return (
        /* aqui é como se fosse nosso body, 
        dentro dele funciona igual ao HTML, 
        porém é possível usar JavaScrip caso precise também*/
        <div className="body">


            <form>
                <input type="text"  />
                <input type="text" />
                <button>enviar</button>
            </form>

  
        </div>
    );
};

{/* Criado o Export para que possemos 
    exportar a estrutura que criammos */}
export default Relatorios;