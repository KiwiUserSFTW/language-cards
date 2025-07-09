// react
import { useLocation } from "react-router-dom";

/**
 * Custom hook that returns the current query parameters.
 * @returns {URLSearchParams} Query parameters object.
 */
const useQuery = (): URLSearchParams => {
  const { search } = useLocation();
  return new URLSearchParams(search);
};

export default useQuery;
