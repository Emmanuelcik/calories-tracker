type CaloryDisplayProps = {
  calories: number;
  text: string;
};
const CaloryDisplay = ({ calories, text }: CaloryDisplayProps) => {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
      <span className="font-balck text-6xl text-orange">{calories}</span>
      {text}
    </p>
  );
};

export default CaloryDisplay;
