import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setGamePlay,
  setOpponentChoice,
  setPlayerChoice,
} from "../../store/player/player.slice";
import { GamePlay } from "./UserGamePlay";
import { socket } from "../Lobby/Lobby";

export const GameBody: FC = () => {
  const { playerOneActive, gamePlay, opponentChoice, playerChoice } =
    useAppSelector((state) => state.player);

  const { opponentPickedMessage } = useAppSelector(
    (state) => state.opponentStatus
  );

  const { lobby } = useAppSelector((state) => state.socket);

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("p1Choice", ({ choice }) => {
      !playerOneActive && dispatch(setOpponentChoice(choice));
    });

    socket.on("p2Choice", ({ choice }) => {
      playerOneActive && dispatch(setOpponentChoice(choice));
    });

    return () => {
      socket.off("p1Choice");
      socket.off("p2Choice");
    };
  }, []);

  const iconClickHandler = (e: any) => {
    const choice = e.target.value;
    dispatch(setPlayerChoice(choice));

    const choiceEvent = playerOneActive ? "p1Choice" : "p2Choice";

    socket.emit(choiceEvent, { choice, room: lobby });
    socket.emit("game-play", lobby);

    if (opponentChoice && opponentPickedMessage) {
      dispatch(setGamePlay(!gamePlay));
    }
  };

  return gamePlay ? (
    <GamePlay />
  ) : (
    <div>
      <div>Your current choice: {playerChoice}</div>
      <div>
        {/* Create map form ArrayOfChoices */}
        <button
          value="scissors"
          onClick={iconClickHandler}
          className="mt-5 w-15 bg-transparent text-white-700 font-semibold py-2 px-4 border border-blue-500 hover:bg-blue-500"
        >
          scissors
        </button>
        <button
          value="paper"
          onClick={iconClickHandler}
          className="mt-5 w-15 bg-transparent text-white-700 font-semibold py-2 px-4 border border-blue-500 hover:bg-blue-500"
        >
          paper
        </button>
        <button
          value="rock"
          onClick={iconClickHandler}
          className="mt-5 w-15 bg-transparent text-white-700 font-semibold py-2 px-4 border border-blue-500 hover:bg-blue-500"
        >
          rock
        </button>
      </div>
    </div>
  );
};
