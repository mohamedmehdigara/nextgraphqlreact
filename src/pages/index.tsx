// pages/index.tsx
import type { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";

const UserQuery = gql`
  query getUser {
    getUser {
      id
      firstName
			lastName
    }
  }
`;

const graphQLClient = new GraphQLClient("http://localhost:3000/api/graphql");
const fetchUser = async () => {
  return await graphQLClient.request(UserQuery);
};

const Home: NextPage = () => {
  const { isLoading, data } = useQuery(["get-user"], fetchUser);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="flex h-screen w-screen justify-center items-center">
        <div>
          <p>{data.getUser.id}</p>
          <p>{data.getUser.firstName}</p>
					<p>{data.getUser.lastName}</p>
        </div>
      </div>
    </>
  );
};

export default Home;