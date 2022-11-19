// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS AJAX</h1>`;
console.clear();
/**
 * //SYNTAX FOR AJAX
    var xhr = new XMLHttpRequest();
    xhr.open(method, URL, [async, user, password]);
    // only if you wish to send body use below syntax
    xhr.send([body]);
    //else use
    xhr.send();
 */

// CRUD operation using XMLHTTPREQUEST
// READ -> GET
// UPDATE -> PUT
// CREATE -> POST
// DELETE -> DELETE

// POST - create new user

var xhrPOST = new XMLHttpRequest();
xhrPOST.open('POST', 'https://reqres.in/api/login');
/**
 *
 * for x-www-form-urlencoded form url encode
 * xhrPOST.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
 * sampleData shouldbe like
 * 'email=eve.holt@reqres.in&password=cityslicka'
 */

/**
 *
 * for json oriented
 * xhrPOST.setRequestHeader('Content-type', 'application/json');
 * sampleData shouldbe like
 *  {
 * email: 'eve.holt@reqres.in',
 * password: 'cityslicka',
 * }
 */
xhrPOST.setRequestHeader('Content-type', 'application/json');

xhrPOST.onreadystatechange = function () {
  // readyState == 4 completed the request and received response
  // status === 200, ok response from server
  if (this.readyState === 4 && this.status === 200) {
    let res = JSON.parse(xhrPOST.response);
    // localStorage.setItem("key","value") // syntax for set item into localstorage
    // note : it is domain based not session based
    localStorage.setItem('token', res.token);
  }
  if (this.readyState === 4 && this.status === 400) {
    console.error(xhrPOST.response);
  }
};

let f = 'email=eve.holt@reqres.in&password=cityslicka';

let data = {
  email: 'eve.holt@reqres.in',
  password: 'cityslicka',
};

xhrPOST.send(JSON.stringify({ ...data }));

// GET - get list of users

var xhr = new XMLHttpRequest(); //syntax to initialize ajax
xhr.open('GET', 'https://reqres.in/api/users?page=1'); // open the network
xhr.setRequestHeader(
  'Authorization',
  'Bearer ' + localStorage.getItem('token')
);
xhr.onreadystatechange = function () {
  // readyState == 4 completed the request and received response
  // status === 200, ok response from server
  if (this.readyState === 4 && this.status === 200) {
    // console.log(JSON.parse(xhr.response));
  }
};
//sending the request to server
xhr.send();

//PUT

let xhrPUT = new XMLHttpRequest();
xhrPUT.open('PUT', 'https://reqres.in/api/users/2');
xhrPUT.setRequestHeader('Content-type', 'application/json');
xhrPUT.setRequestHeader(
  'Authorization',
  'Bearer ' + localStorage.getItem('token')
);
xhrPUT.onreadystatechange = function () {
  if (this.readyState === 4 && this.status <= 299 && this.status >= 200) {
    console.log(this.response);
  }
  if (this.readyState === 4 && this.status <= 499 && this.status >= 400) {
    console.error(this.response);
  }
};

let putData = {
  name: 'morpheus',
  job: 'zion resident',
};

xhrPUT.send(JSON.stringify({ ...putData }));

// DELETE

var xhrDelete = new XMLHttpRequest(); //syntax to initialize ajax
xhrDelete.open('DELETE', 'https://reqres.in/api/users/2'); // open the network
// console.log(xhr);
xhrDelete.setRequestHeader(
  'Authorization',
  'Bearer ' + localStorage.getItem('token')
);
xhrDelete.onreadystatechange = function () {
  // readyState == 4 completed the request and received response
  // status === 200, ok response from server
  if (this.readyState === 4 && this.status === 204) {
    console.log('Deleted Successfully');
  }
};
//sending the request to server
xhrDelete.send();

// fetch - promise
// syntax for fetch
// fetch(URL,{
//   method:"",
//   headers:{},
//   body:{}
// }).then()

// POST using fetch;

var loginCredential = {
  email: 'eve.holt@reqres.in',
  password: 'cityslicka',
};
fetch('https://reqres.in/api/login', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(loginCredential),
})
  .then((res) => {
    // throw new Error("Srini made error")
    return res.json();
  })
  .then((res) => {
    console.log('from fetch ', res);
    localStorage.setItem('fetchBasedToken', res.token);
  })
  .catch((error) => console.error(error));

fetch('https://reqres.in/api/users?page=1', {
  method: 'GET',
  headers: {
    Authorization: 'Bearer' + localStorage.getItem('fetchBasedToken'),
  },
})
  .then((res) => res.json())
  .then((res) => {
    console.log('from fetch ', res);
  });
