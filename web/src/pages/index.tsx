import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps, NextPage } from "next";

const Login: NextPage = () => {
  return null;
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
