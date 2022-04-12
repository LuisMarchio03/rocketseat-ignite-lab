import { gql, useQuery } from "@apollo/client";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps, NextPage } from "next";
import { useMeQuery } from "../../graphql/generated/graphql";
import {
  getServerPageGetProducts,
  ssrGetProducts,
} from "../../graphql/generated/page";
import { withApollo } from "../../lib/withApollo";

const Home: NextPage = ({ data }: any) => {
  const { user } = useUser();
  const { data: me } = useMeQuery();

  return <pre>{JSON.stringify(me, null, 2)}</pre>;
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    return {
      props: {},
    };
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
