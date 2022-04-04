import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps, NextPage } from "next";

const Home: NextPage = () => {
  return <h1>Hello world</h1>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
