import Link from 'next/link';
import Image from 'next/image';

import { DataDashboard } from '../../data/dashboard';

import dalle from '../../public/dalle.png';
import ia_chat from '../../public/ia_chat.png';

import mattranslate from '../../public/mattranslate.png';
import matsport from '../../public/matsport.png';
import qcm from '../../public/qcm.png';
import matdesc from '../../public/matdesc.png';
import matresume from '../../public/matresume.png';

const actions = [
  {
    title: DataDashboard.MattechChatTitle,
    href: 'mattchat',
    description: DataDashboard.MattechChatDescription,
    icon: ia_chat,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50'
  },
  {
    title: DataDashboard.MattechImageTitle,
    href: 'dalle',
    description: DataDashboard.MattechImageDescription,
    icon: dalle,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MatTranslateTitle,
    href: 'mattraduct',
    description: DataDashboard.MatTranslateDescription,
    icon: mattranslate,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: 'MATTSPORT',
    href: 'sportcoach',
    description: DataDashboard.MattSportDescription,
    icon: matsport,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MattQuizTitle,
    href: 'matquiz',
    description: DataDashboard.MattQuizDescription,
    icon: qcm,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MattDescriptionTitle,
    href: 'matdescription',
    description: DataDashboard.MattDescription,
    icon: matdesc,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MattResumeTitle,
    href: 'mattresum',
    description: DataDashboard.MattResume,
    icon: matresume,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MatCVTitle,
    href: 'matcv',
    description: DataDashboard.MatCVDescription,
    icon: matdesc,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  }
  // {
  //   title: 'Schedule a one-on-one',
  //   href: '#',
  //   icon: UsersIcon,
  //   iconForeground: 'text-sky-700',
  //   iconBackground: 'bg-sky-50',
  // },
  // {
  //   title: 'Payroll',
  //   href: '#',
  //   icon: BanknotesIcon,
  //   iconForeground: 'text-yellow-700',
  //   iconBackground: 'bg-yellow-50',
  // },
  // {
  //   title: 'Submit an expense',
  //   href: '#',
  //   icon: ReceiptRefundIcon,
  //   iconForeground: 'text-rose-700',
  //   iconBackground: 'bg-rose-50',
  // },
  // {
  //   title: 'Training',
  //   href: '#',
  //   icon: AcademicCapIcon,
  //   iconForeground: 'text-indigo-700',
  //   iconBackground: 'bg-indigo-50',
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardSection() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <h1 className="text-2xl text-center font-semibold text-gray-900">
          {DataDashboard.DashboardTitle}
        </h1>
      </div>

      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={classNames(
              actionIdx === 0
                ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                : '',
              actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
              actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
              actionIdx === actions.length - 1
                ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                : '',
              'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
            )}
          >
            <div>
              <span
                className={classNames(
                  action.iconBackground,
                  action.iconForeground,
                  'inline-flex rounded-lg p-1 ring-4 ring-white'
                )}
              >
                <Image
                  className="h-12 w-12"
                  src={action.icon}
                  alt={action.title}
                />
                {/* <action.icon className="h-6 w-6" aria-hidden="true" /> */}
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                <Link href={action.href} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-gray-500">{action.description}</p>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
