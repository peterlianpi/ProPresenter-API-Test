import Clear from "./Clear";

function ClearAll() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Clear action="clearAll" label="Clear All" />
      <Clear action="clearText" label="Clear Slide" />
      <Clear action="clearProps" label="Clear Props" />
      <Clear action="clearAudio" label="Clear Audio" />
      <Clear action="clearVideo" label="Clear Video" />
      <Clear action="clearTelestrator" label="Clear Telestrator" />
      <Clear action="clearToLogo" label="Clear To Logo" />
      <Clear action=" " label=" " />
    </div>
  );
}
export default ClearAll;
