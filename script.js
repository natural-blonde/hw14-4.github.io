let getID = id => document.getElementById(id);

let passLogin = /^[a-zA-Z]{4,16}$/;
getID('login').oninput = function (){
  if(passLogin.test(getID('login').value)){
    ableButton();
    this.classList.add('green');
    this.classList.remove('red');
  }
  else{
    this.classList.add('red');
    this.classList.remove('green');
  }
}

let passPassword = /^[a-z0-9\-._]{4,16}$/;
getID('password').oninput = function() {
  if(passPassword.test(this.value)){
    ableButton();
    this.classList.add('green');
    this.classList.remove('red');
  }
  else{
    this.classList.add('red');
    this.classList.remove('green');
  }
}

let passEmail = /^[a-z0-9\-.]+@[a-z]+\.[a-z]+$/;
getID('email').oninput = function(){
  if(passEmail.test(this.value)){
    ableButton();
    this.classList.add('green');
    this.classList.remove('red');
  }
  else{
    this.classList.add('red');
    this.classList.remove('green');
  }
}

let user;
let userMassive = [];
  getID('add-user').onclick = function addUser(){
    if((passLogin.test(getID('login').value)) && (passPassword.test(getID('password').value)) && (passEmail.test(getID('email').value))) {
      ableButton();
      user = {
        login: getID('login').value,
        password: getID('password').value,
        email: getID('email').value
      };
      userMassive.push(user);
      getID('login').value = '';
      getID('password').value = '';
      getID('email').value = '';
      getID('login').classList.remove('green');
      getID('password').classList.remove('green');
      getID('email').classList.remove('green');
      render();
    }
  }

  function render() {
    document.querySelector('tbody').innerHTML = '';
    for (let i = 0; i < userMassive.length; i++) {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${i+1}</td>
        <td>${userMassive[i].login}</td>
        <td>${userMassive[i].password}</td>
        <td>${userMassive[i].email}</td>
        <td><input type='button' class = 'editBtn btn edit' id = 'editBtn' name = 'edit' value = 'Edit'></td>
        <td><input type='button' class = 'deleteBtn btn delete' id = 'deleteBtn' name = 'delete' value = 'Delete'></td>`;
        getID('users-list').append(row);
      }
  } 


document.querySelector('tbody').onclick = event =>
event.target.classList.contains('edit') ? editUser(event) :
event.target.classList.contains('delete') ? deleteUser(event) : 0 ;

function deleteUser(event) {
  let index = event.target.parentElement.parentElement.firstElementChild.textContent - 1;
  userMassive.splice(index, 1);
  render();
}

let userIndex
let edit;
function editUser(event) {
  userIndex = event.target.parentElement.parentElement.firstElementChild.textContent - 1;
  edit = userMassive[userIndex];
  getID('login').value = edit.login;
  getID('password').value = edit.password;
  getID('email').value = edit.email;
  getID('add-user').hidden = true;
  getID('edit-user').hidden = false;
}

getID('edit-user').onclick = function saveEditUser(){
  if((passLogin.test(getID('login').value)) && (passPassword.test(getID('password').value)) && (passEmail.test(getID('email').value))) {
  ableButton();
  edit.login = getID('login').value ;
  edit.password = getID('password').value;
  edit.email = getID('email').value;
  getID('add-user').hidden = false;
  getID('edit-user').hidden = true;
  getID('login').value = "";
  getID('password').value = "";
  getID('email').value = "";
  getID('login').classList.remove('green');
  getID('password').classList.remove('green');
  getID('email').classList.remove('green');
  render();
  }
}

  function ableButton() {
    let testAdd = getID("add-user");
    let testEdit = getID("edit-user");
    if((getID('login').value) && (getID('password').value) && (getID('email').value)) {
      testAdd.disabled = false;
      testEdit.disabled = false;
    }
    else {
      testAdd.disabled = true;
      testEdit.disabled = true;
    }
  }


