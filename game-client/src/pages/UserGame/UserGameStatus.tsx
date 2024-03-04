import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setOpponentPickedMessage,
  setOpponentRestartedMessage,
} from "../../store/opponentStatus/opponentStatus.slice";
import { socket } from "../Lobby/Lobby";
import { setScore } from "../../store/score/score.slice";
import { GuestService } from "../../services/guest.service";
import { UserActivityStatuses } from "../../constants/constants";
import { toast } from "react-toastify";
import { setIsPlaying } from "../../store/player/player.slice";

export const GameStatus: FC = () => {
  const { resultOut } = useAppSelector((state) => state.score);
  const { gamePlay, guestInfo } = useAppSelector((state) => state.player);
  const { opponentPickedMessage, opponentRestartedMessage } = useAppSelector(
    (state) => state.opponentStatus
  );

  const [leftMessage, setLeftMessage] = useState("");

  const dispatch = useAppDispatch();

  const handleUpdateUser = async () => {
    if (guestInfo.id) {
      try {
        await GuestService.updateGuest(guestInfo.id, {
          firstName: guestInfo.firstName,
          status: +UserActivityStatuses.OFFLINE,
        });
      } catch (err: any) {
        toast.error(err);
      }
    }
  };

  useEffect(() => {
    socket.on("status", (message) => {
      dispatch(setOpponentPickedMessage(message));
    });

    socket.on("connected", () => {
      setLeftMessage("opponent reconnected!");

      setTimeout(() => {
        setLeftMessage("");
      }, 1000);
    });

    socket.on("disconnected", (message) => {
      handleUpdateUser();
      setLeftMessage(message);
      dispatch(setScore(0));
      dispatch(setOpponentPickedMessage(""));
      dispatch(setOpponentRestartedMessage(""));
    });

    dispatch(setOpponentRestartedMessage(""));

    return () => {
      socket.off("status");
      socket.off("connected");
      socket.off("disconnected");
    };
  }, []);

  const handleRedirectToLobby = () => {
    dispatch(setIsPlaying(false));
  };

  return (
    <div>
      {!resultOut && (
        <div className="w-48">
          <p>{opponentPickedMessage}</p>
        </div>
      )}
      {gamePlay && resultOut && (
        <div className="w-48">
          <p>{opponentRestartedMessage}</p>
        </div>
      )}
      <p>{leftMessage}</p>

      <div>
        <button
          onClick={handleRedirectToLobby}
          className="mt-5 w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Back to Lobby
        </button>
      </div>
    </div>
  );
};
