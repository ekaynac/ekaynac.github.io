import { useContext } from "react";
import { MorphContext } from "./MorphProvider";

export const useMorph = () => useContext(MorphContext);
