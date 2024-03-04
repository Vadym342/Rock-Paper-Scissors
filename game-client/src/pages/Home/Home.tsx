import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getInfoFromLocalStorage,
  setInfoToLocalStorage,
} from "../../helpers/localstorage.helper";
import { GuestService } from "../../services/guest.service";
import { toast } from "react-toastify";
import { UserActivityStatuses } from "../../constants/constants";
import { setGuestInfo } from "../../store/player/player.slice";
import { Button } from "../../shared/button/buttons";

export const Home: FC = () => {
  const guestId = getInfoFromLocalStorage("guest") || "";
  const [firstName, setFirstName] = useState<string>("");
  const { guestInfo } = useAppSelector((state) => state.player);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRedirection = async (e: any) => {
    if (!guestId) {
      const guest = {
        firstName,
        status: +UserActivityStatuses.ONLINE,
      };

      try {
        const id = await GuestService.createOneGuest(guest);

        if (id) {
          setInfoToLocalStorage("guest", id);
          dispatch(setGuestInfo({ id, ...guest }));
          toast.success(`Hello guest ${firstName} in our site`);
        }
      } catch (err: any) {
        toast.error(err);
      }
    } else {
    }
    navigate("/lobby");
  };

  const handleGetGuest = async () => {
    try {
      const guestInfo = await GuestService.getOneGuest(guestId);

      if (guestInfo) {
        setFirstName(guestInfo.firstName);

        const guest = {
          firstName: guestInfo.firstName,
          status: +UserActivityStatuses.ONLINE,
        };

        await GuestService.updateGuest(guestId, {
          firstName: guest.firstName,
          status: guest.status,
        });

        dispatch(
          setGuestInfo({
            id: guestId,
            ...guest,
          })
        );
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
    handleGetGuest();

    toast.success(`Hello guest ${firstName} in our site`);

    return () => {
      handleUpdateGuestStatus(+UserActivityStatuses.OFFLINE);
    };
  }, []);

  return (
    <div className="flex justify-center flex-col items-center">
      <h3 className="my-10 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-400 to-orange-500">
        Rock Paper Scissors
      </h3>
      <div>
        <label className="block mb-2 text-sm font-medium text-white-900 dark:text-white">
          Enter your firstName:
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border w-32 border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />

        <Button
          type="button"
          children="Join Lobby"
          handler={handleRedirection}
          btnStyle="primary"
        />
      </div>

      <div className="flex justify-center flex-col items-center">
        <h3 className="mt-10">
          If you want manage your statistic you should create account
        </h3>
        <div>
          <Button type="button" children="SignIn/LogIn" btnStyle="primary" />
        </div>
      </div>
    </div>
  );
};
