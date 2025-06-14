import React from "react";


const AgendaDia = () => {
    return (
       <div className="container p-4"
        style={{
        backgroundColor: '#ffd1dc',
        margin: '0 auto',
        maxWidth: '400px',
        width: '100%',
      }}
       >
      <h1 className="text-center mb-4"> Agenda do dia </h1>
      <table className="table table-bordered table-striped  mb-0 bg-white">
  <thead className="">
    <tr>
      <th>Matutino</th>
     
 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Lucas 10:00</td>
<input type="text" name="" id="" />
    </tr>
    <tr>
      <td>Antônio 11:00</td>
    <input type="text" name="" id="" />
     
    </tr>
   
  </tbody>
</table>

<br /> <br /> 
<div>
 <table className="table table-bordered table-striped mb-0 bg-white">
  <thead className="">
    <tr>
     
      <th>Vespertino</th>
 
    </tr>
  </thead>
  <tbody>
    <tr>
  
      <td>Théo  14:00 </td>
     <input type="text" name="" id="" />
    </tr>
    <tr>

      <td>Gabriel 15:00</td>
       <input type="text" name="" id="" />
    </tr>
   
  </tbody>
</table>
</div>
    </div>
    

    );
};
export default AgendaDia;