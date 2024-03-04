type GameInfoProps = {
  score: number;
};

export const GameInfo = ({ score }: GameInfoProps) => {
  return (
    <div className="mt-10">
      <button
        type="button"
        className="w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Score {score}
      </button>
    </div>
  );
};
