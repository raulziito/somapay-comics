import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from "react-router-dom";
import Logo from "../../assets/somapay_logo.png";
import { isAuthenticated } from "../../services/auth";
import { logout } from "../../services/auth";


function disconnect() {
  logout();
  window.location.href = '/';
}

export default function Header(props) {

  return (
    <Popover className="relative bg-white">
      <div className=" mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
           
              
              <Link
                to={{
                pathname: '/home',
              }}
              >

                <img className="h-20 w-auto sm:h-20" src={Logo} alt="" />
              </Link>
           
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Abrir menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <span
             
              className="cursor-pointer ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-purple-900 hover:bg-purple-800"

            >
              Bem vindo, 
              {' '}
              {isAuthenticated()}
              .
              </span>
            <span
              onClick={disconnect}
              className="cursor-pointer ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2  text-base font-medium text-gray-500 "
            >
              Sair
            </span>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img alt="logo" className="h-12 w-auto" src={Logo} />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Fechar Menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <span

                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Bem vindo, 
                  {' '}
                  {isAuthenticated()}
                  .
                  </span>
              </div>
              <div>
                <span
                  onClick={disconnect}
                  className="cursor-pointer w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sair
                </span>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
