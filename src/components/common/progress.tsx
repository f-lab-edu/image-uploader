interface ProgressProps {
  value: number;
  max?: number;
}

const Progress = ({ value, max = 1 }: ProgressProps) => {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className="w-80 min-w-36 h-2 overflow-hidden rounded-lg bg-gray-300 relative">
      <div
        className={`h-full absolute top-0 left-0 transition-all duration-300 ease-in-out bg-indigo-400`}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default Progress;
