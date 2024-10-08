import { useState,useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import Link from 'next/link';
import { useHover } from '@uidotdev/usehooks'
import { motion, AnimatePresence } from 'framer-motion'
import { StarsButton } from '../modal/StarsButton';
import { FramerModal } from '../modal/FramerModal';
import {BlockIANavigation} from "../icons/icons";

const IACard = ({
  id,
  title,
  description,
  href,
  screenShoot,
  keywords,
  quantity,
  score,
  index,
  plan
  
}) => {


  const [ref, hovering] = useHover();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { iasAllowedToAccess } = useContext(PromptContext);

  // console.log('screenShoot?.data?.attributes?.url', screenShoot )
  // console.log("iasAllowedToAccess", iasAllowedToAccess)

    // if(plan){
    //    const iasAllowedToSplited =  plan?.ias_access?.split(',')
    //    setIasAllowedToAccess = iasAllowedToSplited.map((ia) => ia.trim());
    // }
   

  const arrKeywords = keywords.split(',');
  let urlImg = screenShoot || '/empty_image.webp';
  
  return (
    <motion.article
      key={id}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: quantity * 0.1, duration: 0.3 }}
      viewport={{ once: true }}
      className={`relative flex flex-col rounded-3xl bg-darkColor p-6 gap-3 border-2  overflow-hidden col-span-8 row-span-1 sm:row-span-2 md:row-span-3  dark:bg-darkColor md:p-8  ${
        index % 2 === 0
          ? 'md:row-span-4 lg:col-span-4'
          : 'md:row-span-3 lg:col-span-4'
      }`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-start gap-5 opacity-50 z-[1]">
          <StarsButton
            title={title}
            score={score}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />

          <AnimatePresence
            initial={false}
            wait={true}
            onExitComplete={() => null}
          >
            {isModalOpen && (
              <FramerModal
                title={title}
                id_ia={id}
                modalOpen={isModalOpen}
                handleClose={() => setIsModalOpen((prev) => !prev)}
                score={score}
              />
            )}
          </AnimatePresence>

          <p className="font-semibold uppercase text-lightColor">
            Votos{' '}
            <span className="text-lightColor dark:text-eco2MainColor text-lg font-semibold">
              {' '}
              {score?.length}
            </span>
          </p>
          {plan ? (
            <>
             
              {plan.typo === 'Premium' ? (
                <button
                  title="Eres cliente Premium 😍"
                  className="font-semibold uppercase text-lightColor dark:text-amber-500 transition-all "
                  disabled
                >
                  Premium ✨
                </button>
              ) : (
                <Link
                  title="Vuelvete cliente premium 😍"
                  className="font-semibold uppercase hover:scale-110 text-lightColor dark:hover:text-amber-500 transition-all "
                  href="/#pricing"
                >
                  Upgrade⚡
                </Link>
              )}
              {iasAllowedToAccess.includes(title) ? (
                <Link
                  className="p-2 border-2 border-lightColor dark:border-lightColor  rounded-full absolute z-50 top-4 right-6 lg:top-6 lg:right-8 cursor-pointer hover:scale-110 hover:bg-darkColor hover:text-white duration-200 transition-all dark:hover:text-[#f5f5f7] duration-150 "
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={`Ir a ${title} 🤖`}
                >
                  <svg
                    className="h-6 w-6 text-lightColor dark:text-white hover:text-eco2MainColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </Link>
              ) : (
                <button
                  title="No permitido para plan freemium 😔"
                  disabled={true}
                  className="bg-red-800 p-2 border-2  rounded-full absolute z-50 top-4 right-6 lg:top-6 lg:right-8  hover:bg-red-600  duration-200 transition-all  duration-150 "
                >
                  <BlockIANavigation />
                </button>
              )}
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col gap-1 z-[1]">
          <h3
            className={`${isModalOpen ? 'opacity-5' : ''} text-2xl font-bold text-lightColor`}
          >
            {title}
          </h3>
          <p className={`${isModalOpen ? 'opacity-5' : ''} text-base text-lightColor`}>
            {description}
          </p>
          <div className="flex items-center gap-2 opacity-90 font-medium ">
            {arrKeywords.map((keyword) => (
              <span
                key={keyword}
                className={`${isModalOpen ? 'opacity-5' : ''} text-sm text-lightColor`}
              >
                {keyword}
              </span>
            ))}
          </div> 
        </div>
        <img
          className={`${
            isModalOpen ? 'opacity-10' : ''
          } absolute  -right-10 w-full top-48 rounded-2xl object-cover  transition-all duration-300 lg:-right-12 lg:top-48 ${
            hovering && 'scale-[1.025]'
          }`}
          src={urlImg}
          alt={title}
          title={title}
        />
      </div>
    </motion.article>
  );
};

export default IACard
