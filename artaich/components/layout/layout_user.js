import { Fragment, useState } from 'react';
import Head from 'next/head';
import { Dialog, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import {
  Bars3Icon,
  // CalendarIcon,
  // ChartBarIcon,
  // FolderIcon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  // InboxIcon,
  // UsersIcon,
  XMarkIcon
  // AcademicCapIcon,
  // BanknotesIcon,
  // CheckBadgeIcon,
  // ClockIcon,
  // ReceiptRefundIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import logo from '../../public/Mlogop.png';
import Link from 'next/link';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true }
  // { name: 'Team', href: '#', icon: UsersIcon, current: false },
  // { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  // { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  // { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  // { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function LayoutUser({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  //console.log("Children props are : " + children.props);
  //console.log(JSON.stringify(children.props));
  const strapiUrl = process.env.STRAPI_URL;
  const image_url = children.props.user.avatar
    ? strapiUrl + children.props.user.avatar.url
    : '';
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html className="h-full bg-gray-100">
        <body className="h-full">
        ```
      */}
      <div>
        <Head>
          <title>Mattech</title>
          <meta name="description" content="Generated by ECO² Colombia" />
          <link rel="icon" href="/Mlogo.ico" />
        </Head>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex items-center justify-center">
                      <div className="flex flex-shrink-0 px-4">
                        <Link href="/dashboard">
                          <Image
                            className="h-12 w-auto"
                            src={logo}
                            alt="Mattech"
                          />
                        </Link>
                      </div>
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group flex items-center rounded-md px-2 py-2 text-base font-medium'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? 'text-gray-300'
                                : 'text-gray-400 group-hover:text-gray-300',
                              'mr-4 h-6 w-6 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 bg-gray-700 p-4">
                    <div className="flex items-center">
                      <div>
                        {image_url ? (
                          <img
                            className="inline-block h-9 w-9 rounded-full"
                            src={image_url}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-white bg-gray-400 rounded-full">
                            <span className="text-lg font-semibold">
                              {children.props.user.username.charAt(0)}
                              {children.props.user.username.charAt(1)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-white">
                          {children.props.user.username}
                        </p>
                        <Link href={'/profile'}>
                          <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                            View profile
                          </p>
                        </Link>
                      </div>
                    </div>
                    <div className="flex-row-reverse ml-8 items-center">
                      <button
                        title="Click for Logout!"
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => signOut()}
                      >
                        <ArrowLeftOnRectangleIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 self-center px-4">
                <Link href="/dashboard">
                  <Image className="h-12 w-auto" src={logo} alt="Mattech" />
                </Link>
              </div>
              <nav className="mt-5 flex-1 space-y-1 px-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? 'text-gray-300'
                          : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 h-6 w-6 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 bg-gray-700 p-4">
              <div className="flex items-center">
                <div>
                  {image_url ? (
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={image_url}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-white bg-gray-400 rounded-full">
                      <span className="text-lg font-semibold">
                        {children.props.user.username.charAt(0)}
                        {children.props.user.username.charAt(1)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {children.props.user.username}
                  </p>
                  <Link href={'/profile'}>
                    <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                      View profile
                    </p>
                  </Link>
                </div>
              </div>
              <div className="flex-row-reverse ml-8 items-center">
                <button
                  title="Click for Logout !"
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <ArrowLeftOnRectangleIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6 h-screen">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl text-center font-semibold text-gray-900">
                  Bienvenue sur Mattech
                </h1>
              </div>
              <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
