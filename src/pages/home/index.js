import React, { Component, useState, useEffect, Fragment } from "react";
import api from "../../services/api.js";
import moment from "moment";
import { useForm } from "react-hook-form";
import { userInfo } from "../../services/auth";
import Container from "../../components/container/index.js";
import { Link, useParams } from "react-router-dom";
import LoaderHq from "../../components/loaderhqs/index.js";

const Home = () => {
  const { register, handleSubmit, watch, setValue, errors, control } =
    useForm();


  const [comics, setComics] = useState([]);
  const [infoExtra, setInfo] = useState([]);
  const [loader, setLoader] = useState(false);
  const [title, setHq] = useState([]);
	const [filterComics, setFilterComics] = useState([]);



  // -------------- KEYS DA API DA MARVEL COMICS ---------------
  const apiKeyMarvel = "391a03a3201bdb624eadf910888c6432";
  const timeStamp = "1641156787";
  const concat = "68d1b7fbfd6aec9661f132401b92a06f";
  // -----------------------------------------------------------

  useEffect(() => {
    api
      .get(
        `https://gateway.marvel.com:443/v1/public/comics?ts=${timeStamp}&apikey=${apiKeyMarvel}&hash=${concat}&limit=6`
      )
      .then((response) => {
        setComics(response.data.data.results);
        setInfo(response.data)
				setLoader(true);


      });
  }, []);


  useEffect(() => {
		setFilterComics(
			comics.filter(
				(item) =>
					item.title != null &&
					item.title
						.toLowerCase()
						.toString()
						.includes(title) 
			)
		);
	}, [
		title,
		comics	
	]);


  return (
    <>
      <Container>
        <div className="bg-gray-50 ">
    
          <div className="xl:mx-auto xl:container py-20 2xl:px-0 px-6">
           
            <div className="w-full">
            <h2
                  role="heading"
                  className="md:text-5xl text-2xl font-bold leading-10 mt-3 text-gray-800 flex"
                >
                  <p className="text-purple-900"> Procurar </p>{" "}
                  <p className="ml-2" style={{color: "#EB673C"}}>HQ</p>
                </h2>
                <p
                  role="contentinfo"
                  className="text-base leading-5 mt-5 text-gray-600"
                >
                  Na listagem abaixo estão alguns quadrinhos da Marvel
                  Comics.
                </p>
							<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 py-4 gap-4">
								<div className="flex border rounded bg-white items-center p-2 ">
									<input
										onChange={(e) => setHq(e.target.value)}
										type="text"
										placeholder="Quadrinho"
										className="bg-white w-full focus:outline-none" style={{color: "#EB673C"}}
									/>
								</div>
							</div>
						</div>
          </div>

          
          <div className="mx-auto container py-2">
					{!loader ? (
         <LoaderHq/>
          ) : (
            <div className="flex flex-wrap items-center lg:justify-between justify-center">
              {filterComics.map((item) => {
                const capa =
                  item.thumbnail.path + "." + item.thumbnail.extension;
                return (
                  <>
                  <Link
                  	to={{
                      pathname:  `/detalhe/${item.id}`,
                      state: {
                        id: item.id
                      },
                    }}
                  >
                  <div className="cursor-pointer transform  hover:scale-105 transition duration-300 mx-2 w-72 lg:mb-5 mb-8 shadow-md">
                    <div>
                      <img src={capa} className="w-full h-96 object-cover" />
                    </div>
                    <div className="bg-white">
                      <div className="flex items-center justify-between px-4 pt-4">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-bookmark"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#2c3e50"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                          </svg>
                        </div>
                        <div className="bg-purple-900 py-1.5 px-6 rounded-full">
                          <p className="text-xs text-white">
                            {item.dates[0].type !== null && <p> À venda </p>}
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center">
                          <h2 className="text-lg font-semibold text-gray-700">
                            {item.title}
                          </h2>
                          <p className="text-xs pl-5" style={{color: "#EB673C"}}>
                            {infoExtra.copyright}
                          </p>
                        </div>
                        <p className="text-xs text-gray-600 mt-2 truncate ">
                          {item.textObjects[0] == null && "Sem descrição"}
                          {item.textObjects.map((item) => (
                            <span>{item.text}</span>
                          ))}
                        </p>
                        <div className="flex mt-4">
                          <div>
                            <p className="text-xs text-white px-2 rounded-full	py-1" style={{backgroundColor: "#EB673C"}}>
                              {item.format != ""
                                ? item.format
                                : "Sem informação"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-4">
                          <h2 className="text-indigo-700 text-xs font-semibold">
                            Criadore(s):{" "}
                            {item.creators.items.map((item) => (
                              <>
                                <span> {item.name}-</span>
                              </>
                            ))}
                          </h2>

                          <h3 className="text-indigo-700 text-xl font-semibold">
                            ${item.prices[0].price}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                 
                  </>
                );
              })}
               {filterComics.length == 0 && (
            
                <div className="flex justify-center w-full text-xs uppercase text-center">
                    <p className="py-4 mx-4 text-xl uppercase" style={{color: "#EB673C"}}> NÃO FOI ENCONTRADO NENHUM QUADRINHO COM ESSE TÍTULO! </p>
                </div>
           
                )}
            </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
