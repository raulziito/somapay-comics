import React, { Component, useState, useEffect, Fragment } from "react";
import api from "../../services/api.js";
import moment from "moment";
import { useForm } from "react-hook-form";
import { userInfo } from "../../services/auth";
import Container from "../../components/container/index.js";
import { Link, useParams } from "react-router-dom";

const Detalhe = (props) => {
  const id = useParams().id;
  const [show, setShow] = useState(true);
  const [comics, setComics] = useState([]);
  const [infoExtra, setInfo] = useState([]);
  const [characters, setCharacters] = useState([]);

  // -------------- KEYS DA API DA MARVEL COMICS ---------------
  const apiKeyMarvel = "391a03a3201bdb624eadf910888c6432";
  const timeStamp = "1641156787";
  const concat = "68d1b7fbfd6aec9661f132401b92a06f";
  // -----------------------------------------------------------

  useEffect(() => {
    api
      .get(
        `https://gateway.marvel.com:443/v1/public/comics/${id}?ts=${timeStamp}&apikey=${apiKeyMarvel}&hash=${concat}&limit=6`
      )
      .then((response) => {
        setComics(response.data.data.results);
        setInfo(response.data);
      });

    api
      .get(
        `https://gateway.marvel.com:443/v1/public/comics/${id}/characters?ts=${timeStamp}&apikey=${apiKeyMarvel}&hash=${concat}&limit=6`
      )
      .then((response) => {
        setCharacters(response.data.data.results);
      });
  }, []);

  var person = characters.length;

  return (
    <Container>
      {comics.map((item) => {
        const capa = item.thumbnail.path + "." + item.thumbnail.extension;
        return (
          <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
            <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
              <img className="w-full" alt="img of a girl posing" src={capa} />
            </div>
            <div className="md:hidden">
              <img className="w-full" alt="img of a girl posing" src={capa} />
            </div>
            <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
              <div className="border-b border-gray-200 pb-6">
                <p className="text-sm leading-none text-gray-600">
                  Criadore(s):{" "}
                  {item.creators.items.map((item) => (
                    <>
                      <span> {item.name} - </span>
                    </>
                  ))}
                </p>
                <h1
                  className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
                >
                  {item.title}
                </h1>
              </div>
              <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                <p className="text-base leading-4 text-gray-800">Preço</p>
                <div className="flex items-center justify-center">
                  <h3 className="text-purple-800 text-xl font-semibold mr-2">
                    ${item.prices[0].price}
                  </h3>
                </div>
              </div>
              <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                <p className="text-base leading-4 text-gray-800">Copyright</p>
                <div className="flex items-center justify-center">
                  <h3 className=" text-purple-800 text-xl font-semibold mr-2">
                    {infoExtra.copyright}
                  </h3>
                </div>
              </div>
              <button
                className="
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-purple-900
						w-full
						py-4
                        rounded-md
						hover:bg-purple-800
					"
              >
                Quero ler!
              </button>
              <div>
                <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">
                  {item.textObjects[0] == null && "Sem descrição"}
                  {item.textObjects.map((item) => (
                    <span>{item.text}</span>
                  ))}
                </p>
                <p className="text-base leading-4 mt-7 text-gray-600">
                  Código do produto: {item.upc}
                </p>
                <p className="text-base leading-4 mt-4 text-gray-600">
                  Número de páginas:{" "}
                  {item.pageCount != 0 ? item.pageCount : "Sem informação"}
                </p>
                <p className="text-base leading-4 mt-4 text-gray-600">
                  Lingua: {item.textObjects[0] == null && "Sem informação"}
                  {item.textObjects.map((item) => (
                    <span>{item.language}</span>
                  ))}
                </p>
                <p className="text-base leading-4 mt-4 text-gray-600">
                  Formato: {item.format != "" ? item.format : "Sem informação"}
                </p>
              </div>
              <div>
                <div className="border-t border-b py-4 mt-7 border-gray-200">
                  <div
                    onClick={() => setShow(!show)}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <p className="text-base leading-4 text-gray-800">
                      Personagem do quadrinho
                    </p>
                    <button
                      className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                      aria-label="show or hide"
                    >
                      <svg
                        className={
                          "transform " + (show ? "rotate-180" : "rotate-0")
                        }
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 1L5 5L1 1"
                          stroke="#4B5563"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    className={
                      "pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " +
                      (show ? "block" : "hidden")
                    }
                    id="sect"
                  >
                    {person > 0 ? (
                      characters.map((item) => {
                        const personagem =
                          item.thumbnail.path + "." + item.thumbnail.extension;

                        return (
                          <div className="flex flex-col justify-center ">
                            <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-md p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                              <div className="w-full md:w-1/3 bg-white grid place-items-center">
                                <img
                                  src={personagem}
                                  alt="tailwind logo"
                                  className="rounded-xl"
                                />
                              </div>
                              <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                                <h3 className="font-black text-gray-800 md:text-3xl text-xl">
                                  {item.name}
                                </h3>
                                <p className="md:text-lg text-gray-500 text-base">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col justify-center ">
                        <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-md p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                          <div className="w-full md:w-1/3 bg-white grid place-items-center">
                            <img
                              src="https://www.kindpng.com/picc/m/52-526072_unknown-character-hd-png-download.png"
                              alt="tailwind logo"
                              className="rounded-xl"
                            />
                          </div>
                          <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                            <h3 className="font-black text-gray-800 md:text-3xl text-xl">
                              Sem informação
                            </h3>
                            <p className="md:text-lg text-gray-500 text-base">
                              Sem informação
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default Detalhe;
