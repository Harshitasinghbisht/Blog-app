import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { Sun, Moon } from "lucide-react";

function ToggleTheme() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-full border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {theme === "light" ? <Moon size={20}/> : <Sun size={20}/>}
    </button>
  );
}

export default ToggleTheme;
