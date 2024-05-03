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
    const responseData = await response.json();

    console.log(responseData); // Output data to console for testing
    if (responseData && responseData.status === 200 && responseData.data && responseData.data.length > 0) {
      displayProperties(responseData.data);
    } else {
      console.log("No properties found.");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayProperties(data) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  for (const property of data) {
    const propertyElement = document.createElement("div");
    propertyElement.classList.add("property");

    propertyElement.innerHTML = `
      <h3>${property.name || 'Not available'}</h3>
      <p><strong>Bed Range:</strong> ${property.bedRange || 'Not available'}</p>
      <p><strong>Rent Range:</strong> ${property.rentRange || 'Not available'}</p>
      <p><strong>Address:</strong> ${property.address && property.address.fullAddress ? property.address.fullAddress : 'Not available'}</p>
    `;

    fragment.appendChild(propertyElement);
  }

  resultsContainer.appendChild(fragment);
}

async function getProperty(propertyId) {
  const endpoint = `https://apartments-com1.p.rapidapi.com/properties/${propertyId}`;
  
  try {
    const response = await fetch(endpoint, options);
    const propertyData = await response.json();
    
    console.log(propertyData); // Output property data to console for testing
    if (propertyData && propertyData.status === 200 && propertyData.data) {
      displayPropertyDetails(propertyData.data);
    } else {
      console.log("Property details not found.");
    }
  } catch (error) {
    console.error('Error fetching property details:', error);
  }
}

function displayPropertyDetails(propertyData) {
  const propertyDetailsContainer = document.getElementById("propertyDetails");
  propertyDetailsContainer.innerHTML = ""; // Clear previous property details

  const propertyElement = document.createElement("div");
  propertyElement.classList.add("property-details");

  propertyElement.innerHTML = `
    <h3>${propertyData.name || 'Not available'}</h3>
    <p><strong>Description:</strong> ${propertyData.description || 'Not available'}</p>
    <p><strong>Lease Terms:</strong> ${propertyData.leaseTerms || 'Not available'}</p>
    <p><strong>Last Modified Date:</strong> ${propertyData.lastModifiedDate || 'Not available'}</p>
    <!-- Add more property details as needed -->
  `;

  propertyDetailsContainer.appendChild(propertyElement);
}

document.getElementById("searchForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  await searchProperties();
});

document.getElementById("getPropertyBtn").addEventListener("click", function() {
  const propertyId = document.getElementById("propertyIdInput").value;
  getProperty(propertyId);
});
