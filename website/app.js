/* Global Variables */
const API_KEY = '&appid=9d62ae32f784a32322ec2290b6c9d837';
const API_URL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const port = 8000;

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const performAction = async (e) => {
  e.preventDefault();
  const zipCode = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  let wetherdata = await getWeather(API_URL, zipCode, API_KEY);
  let temp = wetherdata.main.temp;
  const data = [{
    date,
    temp,
    content,
  }]

  await postData(`http://localhost:${port}/POST`, data);

  //Update UI
  generateTableBody(tableUI, data);
}

//return weather json data from the url
const getWeather = async (baseURL, zipcode, apikey) => {
  const res = await fetch(baseURL + zipcode + apikey)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//UI
const tableUI = document.querySelector('.table');

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let rowname of data) {
    let th = document.createElement('th');
    let td = document.createTextNode(rowname);
    th.appendChild(td);
    row.appendChild(th);
  }
}

const datahead = [{ date: 'date', temperature: 'temp', feeling: 'content' }];
const keys = Object.keys(datahead[0]);

function generateTableBody(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (let key in element) {
      let cell = row.insertCell();
      let td = document.createTextNode(element[key]);
      cell.appendChild(td);
    }
  }
}

// Async GET
const retrieveData = async (url = '') => {
  const request = await fetch(url);
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    return allData;
  }
  catch (error) {
    console.log("error", error);
  }
};

generateTableHead(tableUI, keys);
document.getElementById('generate').addEventListener('click', performAction);