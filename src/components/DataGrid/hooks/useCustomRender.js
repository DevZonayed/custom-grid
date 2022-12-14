const useCustomRender = (element, component) => {
  if (element === undefined || element === null) return;
  let elementToRander = element || element[0];
  elementToRander.innerHTML = `${component}`;
};
export default useCustomRender;
