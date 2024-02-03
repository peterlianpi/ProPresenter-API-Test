/* eslint-disable react/prop-types */

import { useProPresenterData } from "../../libs/ProPresenterDataProvider";

function Clear({ action, label }) {
  const { sendRequest } = useProPresenterData();
  const handleClear = () => {
    // Send the command associated with the action
    const command = action;
    sendRequest(command);
    console.log("Command : ", command);
    console.log(`Command to send:\n${JSON.stringify(command)}`);
  };
  return (
    <button className=" h-28" onClick={handleClear}>
      {label}
    </button>
  );
}
export default Clear;
