import { IRootState } from "@/store";
import { useSelector } from "react-redux";

export const useReduxData = () => {
  const app = useSelector((state: IRootState) => state.app);
  const menu = useSelector((state: IRootState) => state.menu);

  return { ...app, menu };
};
