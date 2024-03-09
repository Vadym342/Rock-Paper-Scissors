export enum UserActivityStatuses {
  ONLINE = 1,
  PLAYING = 2,
  OFFLINE = 3,
}

export const ArrayOfChoices = [
  {
    id: "1",
    value: "scissors",
  },
  {
    id: "2",
    value: "paper",
  },
  {
    id: "3",
    value: "rock",
  },
];

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
