import { FC } from "react";
import { UserActivityStatuses } from "../../constants/constants";

interface Props {
  listOfUsers:
    | {
        firstName: string;
        status: number;
      }[]
    | [];
}

//Refactor to flexible approach
export const UserList: FC<Props> = ({ listOfUsers }) => {
  return (
    <div>
      <ul className="grid grid-flow-row px-10">
        {listOfUsers?.map((user, index: number) => (
          <li
            key={index}
            className="mt-1 shadow-lg bg-green-10 font-bold text-center rounded-lg"
          >
            {user.firstName} -
            {UserActivityStatuses[user.status].toLocaleLowerCase()}
          </li>
        ))}
      </ul>
    </div>
  );
};
