import { FC } from "react";
import { useAppSelector } from "../../store/hooks";

import { GameBody } from "./UserGameBody";
import { GameInfo } from "../../components/GameStatistic/game-statistic";
import { GameStatus } from "./UserGameStatus";

export const GameStart: FC = () => {
  const { score } = useAppSelector((state) => state.score);

  return (
    <>
      <GameInfo score={score} />
      <GameBody />
      <GameStatus />
    </>
  );
};
