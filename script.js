const id = document.getElementById("id");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const monthYear = document.getElementById("monthYear");
const datesExcluded = document.getElementById("datesExcluded");
const numberOfDays = document.getElementById("numberOfDays");
const leadCount = document.getElementById("leadCount");
const expectedDRR = document.getElementById("expectedDRR");

const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

// const addNew = document.getElementById("addNew");
// const dataInput = document.getElementById("dataInput");

const newAction = document.getElementById("newAction");
const newId = document.getElementById("newId");
const newStartDate = document.getElementById("newStartDate");
const newEndDate = document.getElementById("newEndDate");
const newMonthYear = document.getElementById("newMonthYear");
const newDatesExcluded = document.getElementById("newDatesExcluded");
const newNumberOfDays = document.getElementById("newNumberOfDays");
const newLeadCount = document.getElementById("newLeadCount");
const newExpectedDRR = document.getElementById("newExpectedDRR");
const lastUpdate = document.getElementById("lastUpdate");


// Calculate Dates
const dateCalculated = () => {
  let inputStartDate = new Date(startDate.value);
  let inputEndDate = new Date(endDate.value);

  let months = (inputEndDate.getFullYear() - inputStartDate.getFullYear()) * 12;
  months -= inputStartDate.getMonth() + 1;
  months += inputEndDate.getMonth();

  let years = Math.floor(months / 12);
  let remainingMonths = months % 12;

  let result;
  if (years < 1) {
    if (remainingMonths < 1) {
      result = "0";
    } else if (remainingMonths > 1) {
      result =
        remainingMonths > 2
          ? remainingMonths + " Months"
          : remainingMonths + " Month";
    } else {
      result = remainingMonths + " Month";
    }
  } else {
    if (remainingMonths < 1) {
      if (years > 1) {
        result = years > 2 ? years + " Years" : years + " Year";
      } else {
        result = years + " Year";
      }
    } else {
      if (years > 1) {
        result =
          years > 2
            ? years + " Years " + " & " + remainingMonths + " Months"
            : years + " Years " + " & " + remainingMonths + " Month";
      } else {
        result = years + " Year " + " & " + remainingMonths + " Month";
      }
    }
  }
  monthYear.textContent = result;
};

let excludedDatesArray = [];

const handleExcludedDates = () => {
  let excludedDates = datesExcluded.value;
  // Split the string by commas to get individual dates
  let newExcludedDates = excludedDates.split(" , ");

  // Add each selected date to the excludedDatesArray after filtering out duplicates
  newExcludedDates.forEach((date) => {
    let trimmedDate = date.trim();
    if (!excludedDatesArray.includes(trimmedDate)) {
      excludedDatesArray.push(trimmedDate);
    }
  });

  // Log the excluded dates array to the console
  console.log(excludedDatesArray);
  console.log(excludedDatesArray.length);

  numberOfDays.textContent = excludedDatesArray.length;
};

endDate.addEventListener("change", dateCalculated);
datesExcluded.addEventListener("change", handleExcludedDates);

// Assuming you have already gathered the new data to be added to the JSON file
const newData = {
  action: newAction.textContent,
  id: newId.textContent,
  startDate: newStartDate.textContent,
  endDate: newEndDate.textContent,
  monthYear: newMonthYear.textContent,
  datesExcluded: newDatesExcluded.textContent,
  numberOfDays: newNumberOfDays.textContent,
  leadCount: newLeadCount.textContent,
  expectedDRR: newExpectedDRR.textContent,
  lastUpdate: lastUpdate.textContent,
};

saveBtn.addEventListener("click", function () {
  const actionValue = document.getElementById("action").value;
  const idValue = id.value;
  const startDateValue = startDate.value;
  const endDateValue = endDate.value;
  const datesExcludedValue = excludedDatesArray;
  const leadCountValue = leadCount.value;
  const expectedDRRValue = expectedDRR.value;

  clearFunction();
  if (
    idValue &&
    startDateValue &&
    endDateValue &&
    datesExcludedValue &&
    leadCountValue &&
    expectedDRRValue
  ) {
    // Create an object to store the data
    const newData = {
      action: actionValue,
      id: idValue,
      startDate: startDateValue,
      endDate: endDateValue,
      datesExcluded: datesExcludedValue,
      leadCount: leadCountValue,
      expectedDRR: expectedDRRValue,
      lastUpdate: new Date().toLocaleString(),
    };

    // Save the new data to local storage and display immediately
    let storedData = JSON.parse(localStorage.getItem("storedData")) || [];
    storedData.push(newData);
    localStorage.setItem("storedData", JSON.stringify(storedData));

    // Display the new data in the table immediately
    const table = document.querySelector("tbody");
    const secondRow = table.children[1]; // Finding the second row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
<td data-th="Action"><p>${actionValue}</p></td>
<td data-th="ID"><p>${idValue}</p></td>
<td data-th="Start Date"><p>${startDateValue}</p></td>
<td data-th="End Date"><p>${endDateValue}</p></td>
<td data-th="Month, Year"><p>${item.monthYear}</p></td>
<td data-th="Dates Excluded"><p>${datesExcludedValue}</p></td>
<td data-th="Number of Days"><p>${item.numberOfDays}</p></td>
<td data-th="Lead Count"><p>${leadCountValue}</p></td>
<td data-th="Expected DRR"><p>${expectedDRRValue}</p></td>
<td data-th="Last Updated"><p>${newData.lastUpdate}</p></td>
`;
    // Inserting the new row after the second row
    table.insertBefore(newRow, secondRow.nextElementSibling);


    // Reset values to default or empty states
    id.value = "0";
    startDate.value = "";
    endDate.value = "";
    monthYear.textContent = "0";
    datesExcluded.value = "";
    numberOfDays.textContent = "0";
    leadCount.value = "0";
    expectedDRR.value = "0";

    // Reset excludedDatesArray
    excludedDatesArray = [];
  } else {
    // Handle case where not all fields are filled
    alert("Please fill out all the information before submitting.");
  }
});

// Retrieving data from local storage and displaying it on the page
window.addEventListener("DOMContentLoaded", () => {
  let storedData = JSON.parse(localStorage.getItem("storedData")) || [];
  if (storedData.length > 0) {
    const table = document.querySelector("tbody");
    const secondRow = table.children[1]; // Finding the second row

    storedData.forEach((item) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td data-th="Action"><p>${item.action}</p></td>
        <td data-th="ID"><p>${item.id}</p></td>
        <td data-th="Start Date"><p>${item.startDate}</p></td>
        <td data-th="End Date"><p>${item.endDate}</p></td>
        <td data-th="Month, Year"><p>${item.monthYear}</p></td>
        <td data-th="Dates Excluded"><p>${item.datesExcluded}</p></td>
        <td data-th="Number of Days"><p>${item.numberOfDays}</p></td>
        <td data-th="Lead Count"><p>${item.leadCount}</p></td>
        <td data-th="Expected DRR"><p>${item.expectedDRR}</p></td>
        <td data-th="Last Updated"><p>${item.lastUpdate}</p></td>
      `;
      // Inserting the new row after the second row
      table.insertBefore(newRow, secondRow.nextElementSibling);
    });
  }
});


// Define the clear function
const clearFunction = () => {
  id.value = "0";
  startDate.value = "";
  endDate.value = "";
  monthYear.textContent = "0";
  datesExcluded.value = "";
  numberOfDays.textContent = "0";
  leadCount.value = "0";
  expectedDRR.value = "0";

  // Reset excludedDatesArray
  excludedDatesArray = [];
};

// Attach the clear function to the cancel button
cancelBtn.addEventListener("click", clearFunction);