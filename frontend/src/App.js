import React from "react";
import LoginScreen from "./components/LoginScreen";
import KartTrackApp from "./KartTrackApp";
import RealmApolloProvider from "./graphql/RealmApolloProvider";
import { useRealmApp, RealmAppProvider } from "./RealmApp";

// APP_ID is taken from the Realm Atlas app UI
export const APP_ID = "kart-tracker-fplzt";

const RequireLogginInUser = ({ children }) => {
  //Only render children if there's a logged in user
  const app = useRealmApp();
  //TODO - build login screen
  return app.currentUser ? children : <LoginScreen />;
};

export default function App() {
  return (
    <RealmAppProvider appId={APP_ID}>
      <RequireLoggedInUser>
        <RealmApolloProvider>
          <KartTrackingApp />
        </RealmApolloProvider>
      </RequireLoggedInUser>
    </RealmAppProvider>
  );
}
