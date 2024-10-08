import { SportCoachIA } from '../../components/eco2sportcoach/Eco2SportCoachIA';
import ErrorBoundary from '../../components/ErrorBoundary';
import Modal from '../../components/modal/modal';
import { getUser } from '../../util/api/user';
import Head from 'next/head';

export default function SportCoach(props) {
  const iasAccessArray = props?.user?.plan?.ias_access
    ? props.user.plan.ias_access.split(',').map((item) => item.trim())
    : [];

  const isEco2SportAvailable = iasAccessArray.includes('Eco2Sport');
  return (
    <div className="my-10">
      <Head>
        <title>ECO2SPORT</title>
        <meta name="description" content="Generated by ECO² Colombia" />
        <link rel="icon" href="/iconografia/eco2it_logo.jpeg" />
      </Head>
      {/* If it is not a plan, or the plan does not have access to chatGpt, or the user has no tokens, show the modal */}
      {!props.user.plan ? (
        <Modal user={props?.user} />
      ) : !isEco2SportAvailable ? (
        <Modal user={props?.user} />
      ) : +props?.user?.plan?.max_tokens <= 0 ? (
        <Modal user={props?.user} />
      ) : (
        <ErrorBoundary>
          <SportCoachIA user={props.user.id} />
        </ErrorBoundary>
      )}
    </div>
  );
}

// Función getServerSideProps para obtener los datos del usuario desde el servidor
export const getServerSideProps = async (context) => {
  // Obtener los datos del usuario utilizando la función getUser
  const result = await getUser(context);

  // Verificar si no se obtuvieron datos del usuario
  if (!result?.data) {
    // Redireccionar al inicio si no se obtuvieron datos del usuario
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }

  // Devolver los datos del usuario y la sesión como propiedades
  return {
    props: {
      user: result?.data,
      session: result?.session
    }
  };
};
