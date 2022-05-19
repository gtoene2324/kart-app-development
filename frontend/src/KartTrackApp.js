import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
//import { useRealmApp } from "./RealmApp";
import RaceTable from "./components/RaceTable";

export default function KartTrackApp() {
  return (
    <Container>
      <RaceTable css={gridAreaMain} />
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 100vh;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-areas: "sidebar main";
`;

const gridAreaMain = css`
  grid-area: sidebar;
`;
