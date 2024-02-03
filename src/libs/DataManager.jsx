import { useEffect, useState } from "react";
import { useProPresenterData } from "./ProPresenterDataProvider";

function DataManager() {
  const {
    setMacros,
    setLooks,
    setLibrary,
    setPlaylist,
    sendRequest,
    fetchData,
    setFetchData,
  } = useProPresenterData();
  const [dataFetched, setDataFetched] = useState(false);

  // Function to fetch all data after successful authentication
  useEffect(() => {
    if (fetchData && !dataFetched) {
      // Request all data
      sendRequest("macrosRequest");
      sendRequest("looksRequest");
      sendRequest("libraryRequest");
      sendRequest("playlistRequestAll");
      setFetchData(false);
      setDataFetched(true);
      console.log(
        "If fetchData is true and data not fetched",
        (fetchData, !dataFetched)
      );
    }
  }, [dataFetched, fetchData, sendRequest, setFetchData]);

  return null;
}
export default DataManager;
