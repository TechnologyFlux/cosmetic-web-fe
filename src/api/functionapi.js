/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import axios from "axios";
//import { error } from "jquery";

export const api = axios.create({
  //baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: "https://cosmetic-web-project-production.up.railway.app",
});

export const getHeader = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getHeaderFile = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };
};

/* This function add a new employee to the database*/
export async function addEmployee(employee) {
  const response = await api.post("/api/employee/admin/add", employee, {
    headers: getHeader(),
  });
  if (response.status === 201) {
    console.log(response);
    return true;
  } else {
    console.log("error");
    return false;
  }
}

/* This function gets all employees from the database */
export async function getAllEmployees(currentPage, branch) {
  try {
    const result = await api.get(
      `/api/employee/filter?pageNo=${currentPage}&pageSize=&username=&enabled=true&branch=${branch}`,
      {
        headers: getHeader(),
      }
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    throw new Error("Error fetching employees");
  }
}

/* This  function will delete a employee by the Id*/
export async function deleteEmployee(employeeId) {
  try {
    const result = await api.delete(`/api/employee/delete/${employeeId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting room ${employeeId}`);
  }
}

/* This function will update employee */
export async function updateEmployee(employeeData) {
  const response = await api.put(`/api/employee/update`, employeeData);
  if (response.status === 201) {
    console.log(response);
    return true;
  } else {
    console.log("error");
    return false;
  }
}

/* This function will get a employee by Id */
export async function getEmployeeById(employeeId) {
  try {
    const result = await api.get(`api/employee/${employeeId}`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching room ${error.message}`);
  }
}

// get employee by username
 // login
 export async function loginUser(login) {
    try { console.log(login)
      const response = await api.post("/api/auth/login", login);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
    
  }