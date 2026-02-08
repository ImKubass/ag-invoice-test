import { useId as useIdReact } from "react";

export const useId = (id?: string) => {
	const uniqueId = useIdReact();
	return id || uniqueId;
};
