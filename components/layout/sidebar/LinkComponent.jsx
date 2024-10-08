import Link from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '../../../util/animate/Anim';

export const LinkComponent = ({ data, isActive, setSelectedIndicator }) => {

  const { title, href, index } = data;
  return (
    <motion.nav
      className={` ${isActive ? 'text-eco2MainColor' : 'text-lightColor dark:text-darkColor'} relative  text-center sm:text-left`}
      onMouseEnter={() => {
        setSelectedIndicator(href);
      }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? 'open' : 'closed'}
        className="w-[10px] h-[10px] bg-lightColor dark:bg-darkColor border absolute top-[25px] right-0 rounded-full"
      ></motion.div>
      <Link href={href}>{title}</Link>
    </motion.nav>
  );
};

