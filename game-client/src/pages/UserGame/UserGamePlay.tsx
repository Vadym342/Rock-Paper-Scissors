import { useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  increment,
  setDidWin,
  setResultOut,
  setWinnerText,
} from "../../store/score/score.slice";
import {
  setOpponentPickedMessage,
  setOpponentRestartedMessage,
} from "../../store/opponentStatus/opponentStatus.slice";
import {
  setGamePlay,
  setOpponentChoice,
  setPlayerChoice,
} from "../../store/player/player.slice";
import { socket } from "../Lobby/Lobby";
import { Button } from "../../shared/button/buttons";

export const GamePlay: FC = () => {
  const { playerOneActive, playerChoice, opponentChoice } = useAppSelector(
    (state) => state.player
  );
  const { resultOut, winnerText } = useAppSelector((state) => state.score);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("result", (data) => {
      dispatch(setResultOut(true));

      const { winner } = data;

      if (
        (winner === "player1" && playerOneActive) ||
        (winner === "player2" && !playerOneActive)
      ) {
        dispatch(setWinnerText("you win"));
        dispatch(increment());
        dispatch(setDidWin(true));
      } else if (winner === "player1" || winner === "player2") {
        dispatch(setWinnerText("you lose"));
      } else {
        dispatch(setWinnerText("draw"));
      }
    });

    dispatch(setOpponentRestartedMessage(""));

    socket.on("restart-message", (message) => {
      dispatch(setOpponentRestartedMessage(message));
    });

    return () => {
      socket.off("result");
      socket.off("restart-message");
    };
  }, [resultOut]);

  const startNewGame = () => {
    dispatch(setPlayerChoice(""));
    dispatch(setOpponentChoice(""));
    dispatch(setGamePlay(false));
    dispatch(setDidWin(false));
    dispatch(setResultOut(false));
    socket.emit("restart");
    dispatch(setOpponentPickedMessage(""));
  };

  return (
    <div>
      <div>
        <div>Your choice: {`${playerChoice}`}</div>

        {!resultOut ? (
          <div> second player: </div>
        ) : (
          <div>Opponent last choice was: {`${opponentChoice}`}</div>
        )}
      </div>

      {resultOut && (
        <div>
          <p>Result: {`${winnerText}`}</p>

          <Button
            type="button"
            children="Start new Game"
            handler={startNewGame}
            btnStyle="primary"
          />
        </div>
      )}
    </div>
  );
};
