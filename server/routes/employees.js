import { Router } from "express";
import axios from "axios";
import express from "express";

const employeesRouter = Router();

const employees = [
  {
    firstName: "Roy",
    lastName: "Testerton",
    dateOfBirth: "19/02/1990",
    jobTitle: "Software developer",
    company: "Test co",
    country: "US",
  },
  {
    firstName: "Lisa",
    lastName: "Testora",
    dateOfBirth: "11/07/1984",
    jobTitle: "CTO",
    company: "Test co",
    country: "GBR",
  },
  {
    firstName: "Simon",
    lastName: "McTester",
    dateOfBirth: "01/11/1987",
    jobTitle: "Product manager",
    company: "Mock industries",
    country: "IND",
  },
  {
    firstName: "Selina",
    lastName: "Testo",
    dateOfBirth: "23/11/1972",
    jobTitle: "Software developer",
    company: "Mock industries",
    country: "IND",
  },
  {
    firstName: "Tim",
    lastName: "Mockman",
    dateOfBirth: "12/11/1972",
    jobTitle: "Software developer",
    company: "Mock industries",
    country: "IND",
  },
  {
    firstName: "Melissa",
    lastName: "Mocker",
    dateOfBirth: "10/01/1982",
    jobTitle: "Software developer",
    company: "Mock industries",
    country: "US",
  },
];

employeesRouter.get("/", async (req, res) => {
  try {
    const getCountry = async (countryCode) => {
      const response = await axios.get(
        `https://restcountries.com/v2/alpha/${countryCode}`
      );
      return response.data;
    };

    const employeesWithCountry = await Promise.all(
      employees.map(async (employee) => {
        const {
          country: countryCode,
          firstName,
          lastName,
          dateOfBirth,
        } = employee;

        const country = await getCountry(countryCode);
        const { name, timezones, languages, currencies } = country;

        const employeeObj = {
          ...employee,
          country: {
            name,
            timezones,
            languages,
            currencies,
            code: countryCode,
          },
        };

        const specialRegions = req.query.regions || ["Europe", "Asia"];
        const isSpecialRegion = specialRegions.includes(country.region);

        if (isSpecialRegion) {
          employeeObj.id = `${firstName}${lastName}${dateOfBirth
            .split("/")
            .join("")}`;
        }

        return employeeObj;
      })
    );

    res.status(200).json({ data: employeesWithCountry });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Just a mock endpoint to creating and employee
employeesRouter.post("/", (req, res) => {
  try {
    res.status(201).json({
      message: "Employee created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default employeesRouter;
