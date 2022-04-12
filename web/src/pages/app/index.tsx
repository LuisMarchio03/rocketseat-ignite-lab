import { gql, useQuery } from "@apollo/client";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps, NextPage } from "next";
import { withApollo } from "../../lib/withApollo";

const Home: NextPage = () => {
  const { user } = useUser();

  return <h1>Hello world</h1>;
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    return {
      props: {},
    };
  },
});

export default withApollo(Home);
