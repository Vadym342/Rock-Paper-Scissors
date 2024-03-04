import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setLobby, setSockets } from "../../store/socket/socket.slice";
import {
  setIsPlaying,
  setPlayerOneActive,
} from "../../store/player/player.slice";
import { GameStart } from "../UserGame/UserGameStart";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { GuestService } from "../../services/guest.service";
import { GuestDataType } from "../../types/guest.types";
import { UserActivityStatuses } from "../../constants/constants";
import { UserList } from "../../components/UserList/UserList";
import { Button } from "../../shared/button/buttons";
import { useNavigate } from "react-router-dom";

export const socket = io(process.env.SERVER_URL || "http://localhost:8081/");

export const Lobby: FC = () => {
  const { lobby, sockets } = useAppSelector((state) => state.socket);
  const { isPlaying, guestInfo } = useAppSelector((state) => state.player);

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [listOfUsers, setListOfUsers] = useState<GuestDataType[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGetListOfUsers = async () => {
    try {
      const guests = await GuestService.getAllGuests();

      if (guests) {
        setListOfUsers(guests.data);
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  const handleUpdateGuestStatus = async (status: number) => {
    if (guestInfo.id) {
      try {
        await GuestService.updateGuest(guestInfo.id, {
          firstName: guestInfo.firstName,
          status,
        });
      } catch (err: any) {
        toast.error(err);
      }
    }
  };

  useEffect(() => {
    handleGetListOfUsers();

    socket.on("connect", () => {
      console.log("You connected to ", socket.id);
    });

    socket.on("updated-users", (users) => {
      dispatch(setSockets(users));
    });

    socket.on("full", (message) => {
      setSuccessMessage(message);
    });

    if (sockets.length === 2) {
      dispatch(setIsPlaying(true));
      handleUpdateGuestStatus(UserActivityStatuses.PLAYING);
    }

    return () => {
      socket.off("connect");
      socket.off("updated-users");
      socket.off("start");
      handleUpdateGuestStatus(UserActivityStatuses.OFFLINE);
    };
  }, [sockets]);

  const handleChangeLobby = (e: any) => {
    dispatch(setLobby(e.target.value.trim()));
  };

  const handleCreateLobby = (e: any) => {
    e.preventDefault();

    dispatch(setPlayerOneActive(true));
    lobby &&
      socket.emit("join-lobby", lobby) &&
      setSuccessMessage(`You created lobby ${lobby} & joined`);
  };

  const handleJoinLobby = (e: any) => {
    e.preventDefault();

    lobby && socket.emit("join-lobby", lobby);
  };

  const handleRedirectToHome = () => {
    navigate("/");
  };

  return (
    <>
      {isPlaying ? (
        <GameStart />
      ) : (
        <div>
          <h3 className="my-10 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-400 to-orange-500">
            It's your Lobby {guestInfo.firstName}
          </h3>
          <div className="flex flex-row space-x-20">
            <div>
              <div>
                <form onSubmit={handleCreateLobby}>
                  <div>
                    <input
                      type="text"
                      onChange={handleChangeLobby}
                      className="bg-gray-50 border w-32 border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                    />
                  </div>
                  <div className="w-32">
                    <Button
                      type="submit"
                      children="Create Game"
                      btnStyle="primary"
                    />
                  </div>
                </form>
              </div>
              <div>
                <form onSubmit={handleJoinLobby}>
                  <div className="mt-5">
                    <input
                      type="text"
                      onChange={handleChangeLobby}
                      className="bg-gray-50 border w-32 border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                    />
                  </div>
                  <div className="w-32">
                    <Button
                      type="submit"
                      children="Join Game"
                      btnStyle="primary"
                    />
                  </div>
                </form>
                <button
                  onClick={handleRedirectToHome}
                  className="mt-5 w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Back to Home
                </button>
              </div>

              <div>
                {<p>{successMessage}</p>}
                {successMessage && !successMessage.includes("two players") && (
                  <p>Wait for an opponent to join</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-400 to-orange-500">
                List of Users
              </h3>
              <UserList listOfUsers={listOfUsers} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
