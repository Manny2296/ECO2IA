
import Head from 'next/head';
import { getUser } from '../util/api/user';
import Modal from '../components/modal/modal';

import StepsLayout from '../components/steps_renovhome/StepsLayout';

export default function renovhome(props) {

  const iasAccessArray = props?.user?.plan?.ias_access
    ?  props.user.plan.ias_access.split(',').map((item) => item.trim())
    : [];

  const isEco2RenovAvailable = iasAccessArray.includes('Eco2Renov');

  return (
    <div>
      <Head>
        <title>ECO2RENOVHOME</title>
        <meta name="description" content="Generated by ECO² Colombia" />
        <link rel="icon" href="/iconografia/eco2it_logo.jpeg" />
      </Head>
      {/* If it is not a plan, or the plan does not have access to Eco2Renov, or the user has no tokens, show the modal */}
      {!props.user.plan ? (
        <Modal user={props?.user} />
      ) : !isEco2RenovAvailable ? (
        <Modal user={props?.user} />
      ) : +props?.user?.plan?.max_tokens <= 0 ? (
        <Modal user={props?.user} />
      ) : (
        <StepsLayout />
      )}
    </div>
  );
}




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
