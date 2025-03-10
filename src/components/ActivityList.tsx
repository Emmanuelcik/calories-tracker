import { Dispatch, useCallback } from "react";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activityReducer";

type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const getCategoryName = useCallback(
    (category: Activity["category"]) => {
      return categories.map((cat) => (cat.id === category ? cat.name : ""));
    },
    [activities]
  );
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Food and Activities
      </h2>
      {activities.length < 1 ? (
        <p className="text-center my-5">No activities to show...</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="px-5 py-10 bg-white mt-5 flex justify-between shadow"
          >
            <div className="space-y2 relative">
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                  activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                }`}
              >
                {getCategoryName(activity.category)}
              </p>
              <p className="text-2xl font-bold pt-5">{activity.name}</p>
              <p className="font-black text-4xl text-lime-500">
                {activity.calories} <span>Calories</span>
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button
                onClick={() => {
                  dispatch({
                    type: "set-activeId",
                    payload: { activeId: activity.id },
                  });
                }}
              >
                <PencilSquareIcon className="h-8 w-8 text-gray-800" />
              </button>

              <button
                onClick={() => {
                  dispatch({
                    type: "delete-activity",
                    payload: { activityId: activity.id },
                  });
                }}
              >
                <XCircleIcon className="h-8 w-8 text-gray-800" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ActivityList;
