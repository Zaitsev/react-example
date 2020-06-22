import * as React from "react";
import { Details } from "../details/Details";
import "./Application.scss";
import {Chart} from "../d3test";

export function Application() {
  return (
    <div className="Application">
      <div className="top">
        <div className="logo" />
      </div>
      <div className="welcome">FuseBox ❤️ JSX/TSX &nbsp; &raquo; HSC works</div>
      <Details />
        <Chart />
    </div>
  );
}
