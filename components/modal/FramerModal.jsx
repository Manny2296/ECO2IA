import { useState, useContext } from "react";
import {UserContext} from "../../context/user/UserContext";
import { motion } from "framer-motion";
import Backdrop  from "./Backdrop";
import { StarsRate } from "../ui/StarsRate";
import { sendScore } from "../../util/api/score_ias";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export const FramerModal = ({handleClose, id_ia, title}) => {
  const [filledStars, setFilledStars] = useState(0);
  const router = useRouter();

  const { user } = useContext(UserContext);

  async function handleSendScore() {
    if(filledStars === 0) return toast.error('Debes seleccionar una calificación');
    await sendScore({ id_ia: id_ia, stars: filledStars, userId:user.id });
    toast.success('Calificación enviada');
    router.reload();
    
  }
  return (
    <Backdrop onClick={handleClose}>
      <motion.section
        onClick={(e) => e.stopPropagation()}
        className="modal dark:bg-white dark:bg-opacity-100 z-[100] bg-white opacity-100  m-auto py-0 px-8 border-[12px] flex flex-col items-center"
        variants={flip}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="bg-gradient-to-r from-red-500 via-eco2MainColor to-slate-800 inline-block dark:text-transparent bg-clip-text font-extrabold text-xl">Califica {title}</h2>
        <StarsRate filledStars={filledStars} setFilledStars={setFilledStars} />
        <footer className="flex justify-evenly gap-4">
          <ModalButton onClick={handleSendScore} label="Enviar" />
          <ModalButton onClick={handleClose} label="Cerrar" />
        </footer>
      </motion.section>
    </Backdrop>
  );
}



const ModalButton = ({ onClick, label }) => (
  <motion.button
    className="modal-button"
    type="button"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {label}
  </motion.button>
);


const dropIn = {
  hidden: {
    y: "-200vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "200vh",
    opacity: 0,
  },
};

const flip = {
  hidden: {
    transform: "scale(0) rotateX(-360deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotateX(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotateX(360deg)",
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};


const newspaper = {
  hidden: {
    transform: "scale(0) rotate(720deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotate(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotate(-720deg)",
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};
