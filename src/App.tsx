import { useEffect, useMemo, useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activityReducer";
import ActivityList from "./components/ActivityList";
import CaloryTracker from "./components/CaloryTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state?.activities));
  }, [state?.activities]);

  const canRestartApp = useMemo(
    () => (state?.activities ?? []).length > 0,
    [state?.activities]
  );

  return (
    <>
      <header className=" bg-lime-600 p-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Calories Tracker
          </h1>
          <button
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp}
            onClick={() => dispatch({ type: "reset-app" })}
          >
            Restart App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state ?? initialState} />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CaloryTracker activities={state?.activities} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state?.activities ?? []}
          dispatch={dispatch}
        />
      </section>
    </>
  );
}

export default App;