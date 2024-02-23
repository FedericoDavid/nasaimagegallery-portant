import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

import { ImageItem } from "../types";

interface FavoritesState {
  favorites: ImageItem[];
}

type FavoritesAction =
  | { type: "ADD_FAVORITE"; payload: ImageItem }
  | { type: "REMOVE_FAVORITE"; payload: { nasa_id: string } };

const initialState: FavoritesState = {
  favorites: [],
};

const FavoritesContext = createContext<{
  state: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction
): FavoritesState {
  switch (action.type) {
    case "ADD_FAVORITE":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => fav.nasa_id !== action.payload.nasa_id
        ),
      };
    default:
      return state;
  }
}

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState, () => {
    const localData = localStorage.getItem("favorites");
    return localData ? { favorites: JSON.parse(localData) } : initialState;
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
