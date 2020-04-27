function getEmpTag(name) {
  console.log(name);
  if (name.split(" ").length > 1) {
    return `${name.charAt(0).toUpperCase()}${name
      .split(" ")[1]
      .charAt(0)
      .toUpperCase()}`;
  }
  return `${name.charAt(0).toUpperCase()}`;
}

function sortEmployees(employees, activeId) {
  return employees.sort((x, y) =>
    x.id == activeId
      ? -1
      : y.id == activeId
      ? 1
      : x.name < y.name
      ? -1
      : x.name > y.name
      ? 1
      : 0
  );
}

export { getEmpTag, sortEmployees };
