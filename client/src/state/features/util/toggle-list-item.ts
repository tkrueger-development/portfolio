const toggleListItem = <T>({ list, filterName }: { list: Array<T>, filterName: T }): Array<T> => {
  const updatedList = [ ...list ];
  const location    = updatedList.indexOf(filterName);

  if (location > -1) updatedList.splice(location, 1);
  else               updatedList.push(filterName);

  return updatedList;
};

export { toggleListItem }; 