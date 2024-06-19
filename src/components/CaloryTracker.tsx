import { useMemo } from "react";
import { Activity } from "../types";
import CaloryDisplay from "./CaloryDisplay";

type CaloryTrackerProps = {
  activities: Activity[];
};

const CaloryTracker = ({ activities }: CaloryTrackerProps) => {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (val, cur) => (cur.category === 1 ? val + cur.calories : val),
        0
      ),
    [activities]
  );
  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (val, cur) => (cur.category === 2 ? val + cur.calories : val),
        0
      ),
    [activities]
  );

  const totalCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activities]
  );
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Calories summary
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CaloryDisplay calories={caloriesConsumed} text="Consumed" />
        <CaloryDisplay calories={caloriesBurned} text="Burned" />
        <CaloryDisplay calories={totalCalories} text="Difference" />
      </div>
    </>
  );
};

export default CaloryTracker;
