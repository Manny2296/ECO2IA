import Head from 'next/head';
import Modal from '../components/modal/modal';
import Eco2traductAI from '../components/eco2traduct/eco2traduct';
import { getUser } from '../util/api/user';

const Eco2traduct = (props) => {
  const iasAccessArray = props?.user?.plan?.ias_access
    ? props.user.plan.ias_access.split(',').map((item) => item.trim())
    : [];

  const isEco2TraductAvailable = iasAccessArray.includes('Eco2Traduct');
  return (
    <div>
      <Head>
        <title>ECO2TRADUCT</title>
        <meta name="description" content="Generated by ECO² Colombia" />
        <link rel="icon" href="/iconografia/eco2it_logo.jpeg" />
      </Head>
      {/* If it is not a plan, or the plan does not have access to chatGpt, or the user has no tokens, show the modal */}
      {!props.user.plan ? (
        <Modal user={props?.user} />
      ) : !isEco2TraductAvailable ? (
        <Modal user={props?.user} />
      ) : +props?.user?.plan?.max_tokens <= 0 ? (
        <Modal user={props?.user} />
      ) : (
        <Eco2traductAI />
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const result = await getUser(context);

  if (!result?.data) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }

  return {
    props: {
      user: result?.data,
      session: result?.session
    }
  };
};

export default Eco2traduct;
