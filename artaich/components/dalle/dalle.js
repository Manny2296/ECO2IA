import { useState, useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import { UserContext } from '../../context/user/UserContext';
import Image from 'next/image';
import { useDalle } from '../../hooks/useDalle';
import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import SearchTextbox from '../searchTextbox/searchTextbox';
import { DalleResponse } from '../../util/api/dalleResponse';
import { WelcomeDalle } from './welcomedalle';
import { ButtonHelper } from '../welcome/buttonHelper';

import { Carousel } from './carousel';

export default function DalleIA() {
  const [showDropdown, setShowDropdown] = useState(false);

  const [imageSrc, setImageSrc] = useState('');
  const [openHelpers, setOpenHelpers] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const { user } = useContext(UserContext);
  const { prompt, setPrompt, setPromptTokens, setResponse } =
    useContext(PromptContext);

  const { data, mutate } = useDalle(user?.id);

  const handleChange = (e) => {
    setPrompt(e.target.value);
    if (e.target.value === '') {
      setPromptTokens(0);
    }
  };
  const FetchData = async () => {
    if (!prompt) {
      setIsError('Please type something before submit');
    } else {
      setIsLoading(true);
      try {
        const response = await DalleResponse({ prompt: prompt, user: user });
        const decodedImage = response?.data?.data[0]?.b64_json;
        setImageSrc(decodedImage);
        // const imageUrl = `data:image/png;base64,${decodedImage}`;
        // console.log('response is:', response?.data.data[0].b64_json);

        // Download the image and convert it to a Blob
        // const imageBlob = await fetch(imageUrl).then((res) => res.blob());

        // const formData = new FormData();
        // formData.append('file', new Blob([imageBlob]), 'image.png');

        // const updatedRequest = uploadUserImage({ formData: formData });
        // console.log('updatedRequest is:', updatedRequest);
        mutate({ data: [...data.data, response?.data], ...data });
        setResponse(response?.data?.data);
      } catch (error) {
        console.log('error is:', error);
        setIsError('An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
        setPrompt('');
        setOpenHelpers(false);
      }
    }
  };

  return (
    <section className="relative">
      {imageSrc === '' ? (
        <WelcomeDalle />
      ) : openHelpers ? (
        <WelcomeDalle />
      ) : (
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            {imageSrc !== '' ? (
              <>
                <img
                  src={imageSrc && `data:image/jpeg;base64,${imageSrc}`}
                  onLoad={() => setShowDropdown(true)}
                  alt="dalle image"
                  className="w-auto h-auto"
                />
                <div
                  className={`${showDropdown ? 'absolute  top-10 ' : 'hidden'}`}
                >
                  <Menu>
                    <Menu.Button className="text-gray-500 hover:text-gray-900">
                      <EllipsisVerticalIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    <Menu.Items className="absolute left-0 z-50 w-48 py-2 mt-2 bg-white rounded-md shadow-lg focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                            href="#"
                          >
                            Download
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                            href="#"
                          >
                            Download as PNG
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                            href="#"
                          >
                            Download as PDF
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              </>
            ) : null}
          </div>
          <div style={{ flex: 1 }}>
            {imageSrc !== '' ? (
              <>
                <img
                  src={imageSrc && `data:image/jpeg;base64,${imageSrc}`}
                  onLoad={() => setShowDropdown(true)}
                  alt="dalle image"
                  className="w-auto h-auto"
                />
                <div
                  className={`${showDropdown ? 'absolute  top-10 ' : 'hidden'}`}
                >
                  <Menu>
                    <Menu.Button className="text-gray-500 hover:text-gray-900">
                      <EllipsisVerticalIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    <Menu.Items className="absolute left-0 z-50 w-48 py-2 mt-2 bg-white rounded-md shadow-lg focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                            href="#"
                          >
                            Download
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                            href="#"
                          >
                            Download as PNG
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                            href="#"
                          >
                            Download as PDF
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              </>
            ) : null}
          </div>
          <br></br>
        </div>
      )}

      <div className="fixed bottom-3 w-full flex flex-col">
        <div className="w-[92%] lg:w-[72.5%] xl:w-[77%] 2xl:max-w-[77rem]">
          <Carousel />
        </div>
        <div className="flex justify-center  w-[92%] lg:w-[72.5%] xl:w-[77%] 2xl:max-w-[77rem]">
          <SearchTextbox
            OnChange={handleChange}
            Fetch={FetchData}
            loading={loading}
          />
          <ButtonHelper onClick={() => setOpenHelpers(!openHelpers)} />
        </div>
      </div>
    </section>
  );
}