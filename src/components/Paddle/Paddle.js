import React from "react";
import "./Paddle.css";

export default function Paddle({isPlayerTwo}) {
  return <div className={ isPlayerTwo ? "paddle player2" : "paddle"}/>;
}
