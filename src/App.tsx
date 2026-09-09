import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import MealPlan from "./pages/MealPlan";
import Macros from "./pages/Macros";
import NotFound from "./pages/NotFound";
import Overview from "./pages/Overview";
import Recipes from "./pages/Recipes";
import ShoppingList from "./pages/ShoppingList";
import Suggestion from "./pages/Suggestion";
import Supplements from "./pages/Supplements";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="meal-plan" element={<MealPlan />} />
        <Route path="shopping-list" element={<ShoppingList />} />
        <Route path="supplements" element={<Supplements />} />
        <Route path="macros" element={<Macros />} />
        <Route path="suggestion" element={<Suggestion />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
