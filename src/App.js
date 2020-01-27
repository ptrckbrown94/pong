import React, { useReducer, useEffect } from "react";
import "./styles.css";
import Paddle from "./components/Paddle";
import Ball from "./components/Ball";

const initialState = {
  paddle1: {
    y: 0,
    dy: 0
  },
  paddle2: {
    y: 0,
    dy: 0
  },
  ball: {
    x: 50,
    y: 50,
    dx: 5,
    dy: 5
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "MOVE_PADDLE_1":
      console.log("STATE: ", state);
      console.log("ACTION: ", action);
      return {
        ...state,
        paddle1: {
          ...state.paddle1,
          ...action.payload
        }
      };
    case "MOVE_PADDLE_2":
      return {
        ...state,
        paddle2: {
          ...state.paddle2,
          ...action.payload
        }
      };
    case "RENDER":
      return {
        ...state,
        ball: { ...state.ball, ...action.payload.ball },
        paddle1: { ...state.paddle1, ...action.payload.paddle1 },
        paddle2: { ...state.paddle2, ...action.payload.paddle2 }
      };
    default:
      throw new Error("Event not found: ", action.type);
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleKeyDown(e) {
    const char = e.key.toLowerCase();
    if (char === "w" && state.paddle1.dy !== -10) {
      dispatch({
        type: "MOVE_PADDLE_1",
        payload: {
          dy: -10
        }
      });
    }
    if (char === "s" && state.paddle1.dy !== 10) {
      dispatch({
        type: "MOVE_PADDLE_1",
        payload: {
          dy: 10
        }
      });
    }
    if (char === "o" && state.paddle2.dy !== -10) {
      dispatch({
        type: "MOVE_PADDLE_2",
        payload: {
          dy: -10
        }
      });
    }
    if (char === "l" && state.paddle2.dy !== 10) {
      dispatch({
        type: "MOVE_PADDLE_2",
        payload: {
          dy: 10
        }
      });
    }
  }
  function handleKeyUp(e) {
    const char = e.key.toLowerCase();
    if (char === "w" || char === "s") {
      dispatch({
        type: "MOVE_PADDLE_1",
        payload: {
          dy: 0
        }
      });
    }
    if (char === "o" || char === "l") {
      dispatch({
        type: "MOVE_PADDLE_2",
        payload: {
          dy: 0
        }
      });
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state]);
  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [state]);

  useEffect(() => {
    const handle = setTimeout(() => {
      let x = state.ball.x;
      let y = state.ball.y;

      let dx = state.ball.dx;
      let dy = state.ball.dy;

      let p1y = state.paddle1.y;
      let p2y = state.paddle2.y;

      let p1dy = state.paddle1.dy;
      let p2dy = state.paddle2.dy;

      if (x + dx > 400 - 20 || x + dx < 0) {
        dx = -dx;
      }

      if (y + dy > 300 - 20 || y + dy < 0) {
        dy = -dy;
      }

      if (
        (p1y < y + dy && p1y + 100 > y + dy && x < 45) ||
        (p2y < y + dy && p2y + 100 > y + dy && x > 335)
      ) {
        dx = -dx;
      }
      if (p1y + state.paddle1.dy > 300 - 100) {
        p1y = 200;
      } else if (p1y + state.paddle1.dy < 0) {
        p1y = 0;
      } else {
        p1y = p1y + p1dy;
      }

      if (p2y + state.paddle2.dy > 300 - 100) {
        p2y = 200;
      } else if (p2y + state.paddle2.dy < 0) {
        p2y = 0;
      } else {
        p2y = p2y + p2dy;
      }

      dispatch({
        type: "RENDER",
        payload: {
          ball: {
            dx,
            dy,
            x: state.ball.x + dx,
            y: state.ball.y + dy
          },
          paddle1: {
            y: p1y,
            dy: p1dy
          },
          paddle2: {
            y: p2y,
            dy: p2dy
          }
        }
      });
    }, 50);
    return () => clearTimeout(handle);
  }, [
    state.ball,
    state.paddle1.y,
    state.paddle1.dy,
    state.paddle2.y,
    state.paddle2.dy
  ]);

  // console.log(state.paddle1.y);

  return (
    <div className="container">
      <Paddle paddleY={state.paddle1.y} />
      <Paddle isPlayerTwo paddleY={state.paddle2.y} />
      <Ball pos={state.ball} />
    </div>
  );
}
