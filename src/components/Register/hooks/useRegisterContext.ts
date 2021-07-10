import { useContext } from "react";
import { RegisterContext } from "../context/RegisterContext";

export const useRegisterContext = () => useContext(RegisterContext);
