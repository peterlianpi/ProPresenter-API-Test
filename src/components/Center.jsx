/* eslint-disable react/prop-types */
function Center({ children }) {
  return (
    <div className="flex items-center justify-center mx-auto my-10">
      {children}
    </div>
  );
}
export default Center;
