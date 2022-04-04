import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps, NextPage } from "next";

const Home: NextPage = () => {
  return <h1>Hello world</h1>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();
