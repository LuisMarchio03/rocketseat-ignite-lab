import { gql, useQuery } from "@apollo/client";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps, NextPage } from "next";
import { withApollo } from "../../lib/withApollo";

const PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
      id
      title
    }
  }
`;

const Home: NextPage = () => {
  const { user } = useUser();
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  console.log(data);

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
