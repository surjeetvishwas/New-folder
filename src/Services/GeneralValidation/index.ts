const isEmpty = (param = "") => param.toString().trim().length === 0;

export const validation = (values: any, formValues: any) => {
  for (const key of formValues) {
    if (isEmpty(values[key])) {
      alert("Please fill Empty filed");
      return false;
    }
  }
  return true;
};
