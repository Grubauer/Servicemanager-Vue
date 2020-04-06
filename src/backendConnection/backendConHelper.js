//TODO: Auf echte Rest schnittstelle umbauen
function getServices() {
  return demoServices;
}

function getService(id) {
  return demoServices.find((x) => x.id == id);
}

function getEmployees() {
  return demoEmployees;
}

function getEmployee(id) {
  return demoEmployees.find((x) => x.id == id);
}
const demoEmployees = [
  {
    id: 1,
    name: "Hubert Sauerrampfer",
  },
  {
    id: 2,
    name: "Stefan Reisinger",
  },
  {
    id: 3,
    name: "Anton Fralinger",
  },
];

const demoServices = [
  {
    id: 1,
    name: "Putzen",
    employee: demoEmployees[2],
    date: new Date(2020, 6, 5, 14, 35),
    address: "Obergallsbach 6 4731 Prambachkirchen",
  },
  {
    id: 2,
    name: "Rasenmähen",
    employee: demoEmployees[0],
    date: new Date(2020, 3, 2, 10, 0),
    address: "Roitham 67 4612 Scharten",
  },
  {
    id: 3,
    name: "Auto Reparieren",
    employee: demoEmployees[1],
    date: new Date(2020, 7, 12, 13, 0),
    address: "Unterbruck 12 4731 Prambachkirchen",
  },
];

export { getServices, getEmployees, getService, getEmployee };
