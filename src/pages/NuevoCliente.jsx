import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/Clientes";


export async function action({ request }) {
  const formData = await request.formData();

  // FORMA DE DEBUGEAR UN FORM DATA
  // console.log(formData.get('nombre'));

  // console.log([...formData])

  const datos = Object.fromEntries(formData);

  const error = [];
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  const email = formData.get('email');

  if(!regex.test(email))
  {
    error.push('El email no es valido')
  }

  if (Object.values(datos).includes("")) {
    error.push("todos los datos son obligatorios");
  }

  if (Object.keys(error).length) {
    return error;
  }

 await agregarCliente(datos)


  return redirect('/');
}

const NuevoCliente = () => {
  const errores = useActionData();

  const navigate = useNavigate();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 uppercase font-bold"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="POST">
          <Formulario />

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 uppercase p-3 font-bold text-white text-lg"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  );
};

export default NuevoCliente;
