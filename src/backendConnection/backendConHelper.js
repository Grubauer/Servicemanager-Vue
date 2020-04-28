//TODO: Auf echte Rest schnittstelle umbauen
import axios from "axios";

var services = null;
var employees = null;
// var employees = null;
function getServices() {
  return new Promise((resolve) => {
    if (services == null) {
      axios
        .get("http://localhost:9001/serviceBackend/services")
        .then((response) => {
          console.log(response.data);
          services = response.data.map((x) =>
            convertBackendServiceToService(x)
          );
          console.log(services);
          resolve(services);

          // resolve(demoServices);
        })
        .catch((error) => console.log(error));
    } else {
      resolve(services);
    }
  });
}

function convertServiceToBackendService(service) {
  return {
    name: service.name,
    date: service.date.toUTCString(),
    address: service.address,
    employee_id: service.employee.id,
  };
}
function convertBackendServiceToService(bService) {
  return {
    id: bService.id,
    name: bService.name,
    employee: bService.employee,
    date: new Date(bService.date),
    lat: parseFloat(bService.latitude),
    long: parseFloat(bService.longitude),
    address: bService.address,
  };
}

// {
//   id: 1,
//   name: "Putzen",
//   employee: {
//     id: 2,
//     name: "Stefan Reisinger",
//   },
//   date: new Date(2020, 6, 5, 14, 35),
//   lat: 48.300685,
//   long: 13.940405,
//   address: "Obergallsbach 6 4731 Prambachkirchen",
// },

function getService(id) {
  return new Promise((resolve) => {
    getServices().then((services) => resolve(services.find((x) => x.id == id)));
  });
}

function postService(service) {
  console.log(service);

  return new Promise((resolve) => {
    axios
      .post(
        "http://localhost:9001/serviceBackend/services",
        convertServiceToBackendService(service)
      )
      .then((response) => {
        console.log(response.data);
        resolve(convertBackendServiceToService(response.data));
      })
      .catch((error) => console.log(error));
  });
}

function getEmployees() {
  // return new Promise((resolve) => {
  //   resolve(demoEmployees);
  // });

  return new Promise((resolve) => {
    if (employees == null) {
      axios
        .get("http://localhost:9001/serviceBackend/employees")
        .then((response) => {
          console.log(response.data);
          employees = response.data;
          console.log(employees);
          resolve(employees);

          // resolve(demoServices);
        })
        .catch((error) => console.log(error));
    } else {
      resolve(employees);
    }
  });
}

function getEmployee(id) {
  return new Promise((resolve) => {
    resolve(demoEmployees.find((x) => x.id == id));
  });
}

function editService(serviceId, newService) {
  return new Promise((resolve) => {
    axios
      .put(
        `http://localhost:9001/serviceBackend/services/${serviceId}`,
        convertServiceToBackendService(newService)
      )
      .then((response) => {
        resolve(convertBackendServiceToService(response.data));
      })
      .catch((error) => console.log(error));
  });
}

function deleteService(serviceId) {
  return new Promise((resolve) => {
    axios
      .delete(`http://localhost:9001/serviceBackend/services/${serviceId}`)
      .then((response) => {
        resolve(convertBackendServiceToService(response.data));
      })
      .catch((error) => console.log(error));
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

// const demoServices = [
//   {
//     id: 1,
//     name: "Putzen",
//     employee: demoEmployees[2],
//     date: new Date(2020, 6, 5, 14, 35),
//     lat: 48.300685,
//     long: 13.940405,
//     address: "Obergallsbach 6 4731 Prambachkirchen",
//   },
//   {
//     id: 2,
//     name: "Rasenmähen",
//     employee: demoEmployees[0],
//     date: new Date(2020, 3, 2, 10, 0),
//     lat: 48.247136,
//     long: 14.02185,
//     address: "Roitham 67 4612 Scharten",
//   },
//   {
//     id: 3,
//     name: "Auto Reparieren",
//     employee: demoEmployees[1],
//     date: new Date(2020, 7, 12, 13, 0),
//     lat: 48.318565,
//     long: 13.916042,
//     address: "Unterbruck 12 4731 Prambachkirchen",
//   },
// ];

export {
  getServices,
  getEmployees,
  getService,
  getEmployee,
  editEmployee,
  editService,
  deleteService,
  postService,
};
