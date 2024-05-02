const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'bbb77597d6msh9cf6eaef252c025p12863fjsn4cc692f6a4ff',
    'X-RapidAPI-Host': 'apartments-com1.p.rapidapi.com'
  }
};

async function searchProperties() {
  const endpoint = "https://apartments-com1.p.rapidapi.com/properties";
  const location = document.getElementById("locationInput").value;
  const minRent = document.getElementById("minRentInput").value;
  const maxRent = document.getElementById("maxRentInput").value;
  
  const params = {
    location: location,
    minRent: minRent,
    maxRent: maxRent
  };

  const url = new URL(endpoint);
  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data); // Output data to console for testing
    displayProperties(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayProperties(data) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (data && data.data && data.data.length > 0) {
    const fragment = document.createDocumentFragment();

    for (const property of data.data) {
      const propertyElement = document.createElement("div");
      propertyElement.classList.add("property");

      propertyElement.innerHTML = `
        <h3>${property.name}</h3>
        <p><strong>Bed Range:</strong> ${property.bedRange}</p>
        <p><strong>Rent Range:</strong> ${property.rentRange}</p>
        <p><strong>Address:</strong> ${property.address.fullAddress}</p>
      `;

      fragment.appendChild(propertyElement);
    }

    resultsContainer.appendChild(fragment);
  } else {
    console.log("No properties found.");
  }
}

async function getProperty(propertyId) {
  const endpoint = `https://apartments-com1.p.rapidapi.com/properties/${propertyId}`;
  
  try {
    const response = await fetch(endpoint, options);
    const propertyData = await response.json();
    
    console.log(propertyData); // Output property data to console for testing
    displayPropertyDetails(propertyData);
  } catch (error) {
    console.error('Error fetching property details:', error);
  }
}

function displayPropertyDetails(propertyData) {
  // Display property details on the webpage
  console.log(propertyData); // Output property data to console for testing
  // You can manipulate the DOM to display property details as needed
}

document.getElementById("searchForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  await searchProperties();
});
