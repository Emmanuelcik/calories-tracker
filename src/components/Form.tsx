import { categories } from "../data/categories";

const Form = () => {
  return (
    <form action="" className="space-y-5 bg-white shadow p-10 rounded-lg">
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="" className="font-bold">
          Category
        </label>
        <select
          name=""
          id="Category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
        >
          {categories.map((category) => (
            <option value={category?.id} key={category.id}>
              {category?.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activity" className="font-bold">
          Activity
        </label>
        <input
          type="text"
          id="activity"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="food, apple, salad vegtables"
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calories
        </label>
        <input
          type="number"
          id="calories"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="300 calories"
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
        value="Save"
      />
    </form>
  );
};

export default Form;
