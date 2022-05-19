import React from "react";
/*
 export a React component that provides the ApolloClient object instantiate the client
 client connects to the app's GraphQL API
*/

import { useRealmApp } from "../RealmApp";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

/*The createRealmApolloClient() function  instantiates a client object
 Every GraphQL request must include an Authorization header that specifies a valid user access token. Specify the auth header, so that requests won't fail. 
*/
const createRealmApolloClient = (app) => {
  const link = new HttpLink({
    // Realm apps use a GraphQl endpoint, identified by an App ID
    uri: `https://realm.mongodb.com/api/client/v2.0/app/${app.id}/graphql`,
    // Custom fetch handler adds the loggin in user's access token to GraphQL requests
    fetch: async (uri, options) => {
      if (!app.currentUser) {
        _;
        throw new Error("Must be logged in to use graphql api");
      }
      // refresh user's custom data also refreshes their access token
      await app.currentUser.refreshCustomData();
      // handler adds bearer token auth header to otherwise unchanged request
      options.headers.Authorization = `Bearer ${app.currentUser.accessToken}`;
      return fetch(uri, options);
    },
  });

  //Apollo cache object, will allow interaction with data already fetched from server
  const cache = new InMemoryCache();

  return new ApolloClient({ link, cache });
};

// Instantiate the component
export default function RealmApolloProvider({ children }) {
  const app = useRealmApp();
  const [client, setClient] = React.useState(createRealmApolloClient(app));
  React.useEffect(() => {
    setClient(createRealmApolloClient(app));
  }, [app]);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}