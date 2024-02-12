import Head from 'next/head';
import { Eco2Description } from '../components/eco2description/Eco2Description';
import Modal from '../components/modal/modal';
import { getUser } from '../util/api/user';

export default function eco2description(props) {
  return (
    <div className="my-10">
      <Head>
        <title>ECO2DESCRIPTION</title>
        <meta name="description" content="Generated by ECO² Colombia" />
        <link rel="icon" href="/eco2it_logo.jpeg" />
      </Head>
      {!props.user.plan ? (
        <Modal user={props?.user} />
      ) : +props?.user?.plan?.max_tokens <= 0 ? (
        <Modal user={props?.user} />
      ) : (
        <Eco2Description user={props.user.id} />
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
