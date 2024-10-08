import { useState, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Toaster } from 'react-hot-toast';

export const PopUpModal = ({ children, isModalNeedIt, onClose }) => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  return (
    <>
      {isModalNeedIt ? (
        <>
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-[1000]"
              initialFocus={cancelButtonRef}
              onClose={onClose}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-70  transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex w-full justify-center h-full p-4 text-center items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4"
                    enterTo="opacity-100 translate-y-0"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 "
                    leaveTo="opacity-0 translate-y-4 "
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg dark:bg-white bg-black px-1 pb-1 pt-1 text-left shadow-xl transition-all sm:my-8">
                      <div>
                        <div className="isolate bg-white">
                          <div
                            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                            aria-hidden="true"
                          >
                            <div
                              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                              style={{
                                clipPath:
                                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                              }}
                            />
                          </div>

                          {children}
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          <Toaster position="top-center" />
        </>
      ) : (
        <>
          {' '}
          {children}
          <Toaster position="top-center" />{' '}
        </>
      )}
    </>
  );
};
