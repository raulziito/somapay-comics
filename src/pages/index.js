import React, {
 Fragment 
} from 'react';
import '../style/index.css';
import Logo from '../assets/somapay_logo.png';
import Cover from '../assets/cover.jpg';
import FacebookLogin from 'react-facebook-login';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth';
import GoogleLogin from 'react-google-login';

function Login() {
  const {
    register,
    rules,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({});

  const responseFacebook = (response) => {
    if (response) {
      login(response);
          window.location.href = "/home";
    } else {
          alert("Algo deu errado!");
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const responseGoogle = (response) => {
    if (response) {
      login(response);
         window.location.href = "/home";
    } else {
         alert("Algo deu errado!");
    }
  };
  return (
    <>
      <section className="flex flex-col lg:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img src={Cover} alt="" className="w-full h-full object-cover" />
        </div>

        <div
          className="bg-white w-full lg:max-w-full  lg:items-center xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center md:items-start justify-center"
        >
          <div className="w-full h-100">
            
            <div className="text-xl md:text-2xl font-bold leading-tight sm:mt-5">
              <img 
              alt="logo"
              src={Logo} className="mr-3 h-20" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold leading-tight sm:mt-1 text-gray-500">
              Entre na sua conta
            </h2>
            <form
              className="mt-6"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Digite seu email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">
                    Este campo ?? obrigat??rio
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Senha</label>
                <input
                  type="password"
                  placeholder="Digite sua senha"            
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    Este campo ?? obrigat??rio
                  </p>
                )}
              </div>

              <div className="text-right mt-2">
                <span
               
                  className="cursor-pointer text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Esqueceu a senha?
                </span>
              </div>

              <button
                type="submit"
                className="w-full block bg-purple-900 hover:bg-purple-800 focus:bg-indigo-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
              >
                Entrar
              </button>
            </form>

            <hr className="my-6 border-gray-300 w-full" />

            <div className="flex space-x-4 items-center justify-center px-2 ">
              <FacebookLogin
                appId="256385069930037"
                autoLoad={true}
                fields="name,email"
                callback={responseFacebook}
                cssClass="block bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white font-semibold rounded-lg px-4 py-3 border border-gray-300"
                icon="fa-facebook mr-2"
              />

              <GoogleLogin
                clientId="623834383556-niddton16a01pujsbhrlslmldnqobi2h.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
            </div>

            <p className="mt-8">
              N??o possui conta?{" "}
              <span
               
                className="cursor-pointer text-blue-500 hover:text-blue-700 font-semibold"
              >
                Criar Conta
              </span>
            </p>
          </div>
        </div>
      </section>

    </>
  );
}

export default Login;
