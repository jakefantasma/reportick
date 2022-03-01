import "./App.css";
import * as xlsx from "xlsx";
import { useEffect, useState } from "react";
function App() {
  const [data, setdata] = useState({
    formulario: {
      Fecha: "",
      Codigo: "",
      Nombre: "",
      NTicket: "",
      Asunto: "",
      Estado: "",
      Departameto: "",
      Comentario: "",
    },
    lista: [],
  });
  function handlerExport() {
    const final_result = data.lista.reduce((col, el, i) => {
      col.push({
        ["#"]: i + 1,
        Fecha: el.Fecha,
        ["Cód_Emp_IT"]: el.Codigo,
        Nombre_IT: el.Nombre,
        ["#_Ticket"]: el.NTicket,
        Asunto: el.Asunto,
        Estado: el.Estado,
        Departameto: el.Departameto,
        Comentario: el.Comentario,
      });
      return col;
    }, []);
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(final_result);
    xlsx.utils.book_append_sheet(workbook, worksheet, "export");
    xlsx.writeFile(workbook, "result.xlsx");
  }
  //component
  function CardRegistro({ info, indice }) {
    //handlerdelete
    function handlerdelete() {
      let tmp = data.lista;
      tmp.splice(indice, 1);
      setdata({ ...data, lista: tmp });
      localStorage.setItem("lista", JSON.stringify(tmp));
    }
    return (
      <div className="CardReg">
        <div className="CardInfo">
          <div>
            {indice +
              ". " +
              info.Fecha +
              " | " +
              info.Codigo +
              " " +
              info.Nombre}
          </div>
          <div>{info.Asunto}</div>
          <div>{info.Comentario}</div>
          <div>
            {info.NTicket + " | " + info.Departameto + " | " + info.Estado}
          </div>
        </div>
        <div className="CardGestion">
          <input type="button" value="eliminar" onClick={handlerdelete} />
        </div>
      </div>
    );
  }
  //handlersave
  function handlersave() {
    const id = data.lista.length;
    let tmp = data.lista;
    tmp.push(data.formulario);
    setdata({
      ...data,
      lista: tmp,
      formulario: {
        Fecha: "",
        Codigo: "",
        Nombre: "",
        NTicket: "",
        Asunto: "",
        Estado: "",
        Departameto: "",
        Comentario: "",
      },
    });
    localStorage.setItem("lista", JSON.stringify(tmp));
  }
  //handlerRemoveAll
  function handlerRemoveAll(){
    setdata({
      ...data,
      lista: [],
      formulario: {
        Fecha: "",
        Codigo: "",
        Nombre: "",
        NTicket: "",
        Asunto: "",
        Estado: "",
        Departameto: "",
        Comentario: "",
      },
    });
    localStorage.setItem("lista", JSON.stringify([]));
  }
  //handler to inputs
  function handlerchange(ev) {
    let n = ev.target.name;
    let mod = data.formulario;
    mod[[n]] = ev.target.value;
    setdata({ ...data, formulario: mod });
  }
  useEffect(() => {
    //console.log(data.lista);
    const info = localStorage.getItem("lista");
    if (info != null) {
      setdata({ ...data, lista: JSON.parse(info) });
    }
  }, []);
  return (
    <div className="App">
      <div className="Cabecera">
        <h1>Reportick</h1>
      </div>
      <div className="ContainerFormulario">
        <div className="Formulario">
          <input
            type="date"
            name="Fecha"
            value={data.formulario.Fecha}
            onChange={handlerchange}
          />
          <input
            type="text"
            name="Codigo"
            placeholder="codigo de empleado"
            value={data.formulario.Codigo}
            onChange={handlerchange}
          />
          <input
            type="text"
            name="Nombre"
            placeholder="Nombre"
            value={data.formulario.Nombre}
            onChange={handlerchange}
          />
          <input
            type="text"
            name="NTicket"
            placeholder="Numero de ticket"
            value={data.formulario.NTicket}
            onChange={handlerchange}
          />
          <input
            type="text"
            name="Asunto"
            placeholder="Asunto"
            value={data.formulario.Asunto}
            onChange={handlerchange}
          />
          <input
            type="text"
            name="Estado"
            placeholder="Estado"
            value={data.formulario.Estado}
            onChange={handlerchange}
          />
          <input
            type="text"
            name="Departameto"
            placeholder="Departameto"
            value={data.formulario.Departameto}
            onChange={handlerchange}
          />
          <input
            type="text"
            name="Comentario"
            placeholder="Comentario"
            value={data.formulario.Comentario}
            onChange={handlerchange}
          />
          <input
            type="button"
            name="send"
            value="Guardar"
            onClick={handlersave}
          />
        </div>
      </div>
      <div className="ListadoTicks">
        {Object.keys(data.lista).map((i) => {
          return <CardRegistro info={data.lista[i]} key={i} indice={i} />;
        })}
      </div>
      <div className="SubControl">
        <input type="button" value="exportar" onClick={handlerExport} style={{backgroundColor: "green", color: "white"}}/>
        <input type="button" value="eliminar" onClick={handlerRemoveAll} style={{backgroundColor: "red", color: "white"}} />
      </div>
    </div>
  );
}
export default App;
