import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};
const Form = ({ dispatch, state }: FormProps) => {
  const initialActivityState = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
  };
  const [activity, setActivity] = useState<Activity>(initialActivityState);

  useEffect(() => {
    if (state.activeId) {
      const activeActivity = state.activities.filter(
        (act) => act.id === state.activeId
      )[0];
      setActivity(activeActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const keyObj: string = e?.target?.name ?? "";
    let value: string | number = e?.target?.value ?? "";

    const isNumberField = ["category", "calories"].includes(keyObj);

    setActivity({
      ...activity,
      [keyObj]: isNumberField ? Number(value) : value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({ ...initialActivityState, id: uuidv4() });
  };

  return (
    <form
      action=""
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="" className="font-bold">
          Category
        </label>
        <select
          name="category"
          id="Category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option value={category?.id} key={category.id}>
              {category?.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Activity
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="food, apple, salad vegtables"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calories
        </label>
        <input
          name="calories"
          type="number"
          id="calories"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="300 calories"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "save meal" : "save activity"}
        disabled={!isValidActivity()}
      />
    </form>
  );
};

export default Form;
