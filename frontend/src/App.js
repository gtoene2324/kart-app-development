
/*
In src/App.js, we use the useRealmApp() hook to determine when the main application is ready to render. We also check for an authenticated user and always render exclusively the login screen unless a user is logged in. This guarantees that only authenticated users can access the rest of the app.
const RequireLogginInUser = ({ children }) => {
*/

import React from "react";
import LoginScreen from "./components/LoginScreen";
import KartTrackApp from "./KartTrackApp";
import RealmApolloProvider from "./graphql/RealmApolloProvider";
import { useRealmApp, RealmAppProvider } from "./RealmApp";

// APP_ID is taken from the Realm Atlas app UI
export const APP_ID = "kart-tracker-fplzt";

const RequireLoggedInUser = ({ children }) => {
  // Only render children if there is a logged in user.
  const app = useRealmApp();
  return app.currentUser ? children : <LoginScreen />;
};

export default function App() {
  return (
    <RealmAppProvider appId={APP_ID}>
      <RequireLoggedInUser>
        <RealmApolloProvider>
          <KartTrackApp />
        </RealmApolloProvider>
      </RequireLoggedInUser>
    </RealmAppProvider>
  );
}
