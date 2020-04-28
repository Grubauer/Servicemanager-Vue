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

function editService(serviceId, newService) {
  //Do Backend
  return new Promise((resolve) => {
    resolve(newService);
  });
}

function editEmployee(employeeId, newEmployee) {
  //Do Backend
  return new Promise((resolve) => {
    resolve(newEmployee);
  });
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
    lat: 48.300685,
    long: 13.940405,
    address: "Obergallsbach 6 4731 Prambachkirchen",
  },
  {
    id: 2,
    name: "Rasenmähen",
    employee: demoEmployees[0],
    date: new Date(2020, 3, 2, 10, 0),
    lat: 48.247136,
    long: 14.02185,
    address: "Roitham 67 4612 Scharten",
  },
  {
    id: 3,
    name: "Auto Reparieren",
    employee: demoEmployees[1],
    date: new Date(2020, 7, 12, 13, 0),
    lat: 48.318565,
    long: 13.916042,
    address: "Unterbruck 12 4731 Prambachkirchen",
  },
];

export { getServices, getEmployees, getService, getEmployee, editService, editEmployee };
