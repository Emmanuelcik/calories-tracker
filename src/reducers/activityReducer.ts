import { Activity } from "../types";

export type ActivityActions =
  | {
      type: "save-activity";
      payload: { newActivity: Activity };
    }
  | { type: "set-activeId"; payload: { activeId: Activity["id"] } }
  | { type: "delete-activity"; payload: { activityId: Activity["id"] } }
  | { type: "reset-app" };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action?.type === "save-activity") {
    let updatedActivities: Activity[] = [];
    if (state.activeId) {
      updatedActivities = state.activities.map((act) =>
        act.id === state.activeId ? action.payload.newActivity : act
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updatedActivities,
      activeId: "",
    };
  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.activeId,
    };
  }

  if (action.type === "delete-activity") {
    const newActivities: Activity[] = state.activities.filter(
      (act) => act.id !== action.payload.activityId
    );

    return {
      ...state,
      activities: newActivities,
    };
  }

  if (action.type === "reset-app") {
    return {
      activities: [],
      activeId: "",
    };
  }
};
