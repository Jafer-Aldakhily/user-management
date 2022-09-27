// const button = document.querySelector("#button")
let form_register = document.querySelector("#form_register")

let table_body = document.querySelector("#table_body")

let form_login = document.querySelector("#form_login")

let buttonLogin = document.querySelector("#buttonLogin")

let modal_body = document.querySelector(".modal-body")

let updateBtn = document.querySelector("#updateBtn")

let user_image = document.querySelector("#user_image")

let usersArr = []

let username = document.querySelector("#username");
    


const readAllUsers = () => {
    usersArr = fetch("http://localhost/php_js/index.php")
    .then(res => res.json())
    .then(data => {
        for(let i = 0; i <= (data.length - 1); i++)
        {
            table_body.innerHTML += `
            <tr>
                <th scope="row">${data[i].id}</th>
                <td>${data[i].full_name}</td>
                <td>${data[i].email}</td>
                <td>${data[i].password}</td>
                <td>${data[i].mobile}</td>
                <td>${data[i].date}</td>
                <td>
                            <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onclick="edit(${data[i].id})"
            >
                Edit
            </button>
                <a onclick="deleteUser(${data[i].id})" class="btn btn-danger">Delete</a>
                </td>
              </tr>
            
            `
        }
    }
        
    )
}


const readOne =  () => {
let user_id = localStorage.getItem("user_id")
fetch('http://localhost/php_js/readOne.php?id=' + user_id,{
  method: 'GET'
}).then((res) => res.json())
.then(data => {
  console.log(data);
  username.innerHTML = " "  + data.full_name

  user_image.src = data.image
  console.log(user_image);

})
}

readOne();


window.onload = (() => {
        readAllUsers();
});


// Start Validation

const validateEmail = (email) => {
    var re =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/im
    return re.test(phone)
  }




     const validatePassword = (password) => {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return re.test(password)
     }

// End Validation


//  Edit User
const edit = (id) => {
    fetch('http://localhost/php_js/edit.php/?id=' + id, {
        method: 'GET',
        })
        .then(res => res.json()) // or res.json()
        .then(data => {
            console.log(data.date);
            modal_body.innerHTML = `
            <div class="w-100">
            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Edit User</p>
  
            <form class="mx-1 mx-md-4" autocomplete="off" id="form_update">
              <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                  <label class="form-label" for="form3Example3c"
                    >Your Email</label
                  >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="form-control w-100"
                    required
                    value="${data.email}"
                  />
                </div>
              </div>
  
              <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                  <label class="form-label" for="form3Example1c">Mobile</label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    class="form-control"
                    required
                    value="${data.mobile}"
                  />
                </div>
              </div>
  
              <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                  <label class="form-label" for="form3Example1c">Full Name</label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    class="form-control"
                    required
                    value="${data.full_name}"
                  />
                </div>
              </div>
  
              <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                  <label class="form-label" for="form3Example1c">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    class="form-control"
                    value="${data.date}"
                  />
                </div>
              </div>            
  
              <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button onclick="update(${data.id})" type="button" id="button" class="btn btn-primary btn-lg">
                  Update
                </button>
              </div>
            </form>
          </div>
            
            `

        })  
        
    }

const update = (id) => {

    full_name = full_name.value
    email = email.value
    mobile = mobile.value
    date = date.value
    // password = password.value

    const data = new URLSearchParams();
    for (const p of new FormData(form_update)) {
        data.append(p[0],p[1])
    }

    fetch('http://localhost/php_js/update.php/?id=' + id,{
        method: 'PUT',
        body:data
    }).then((res) => res.json())
    .then(data => console.log(data))


}


// Delete User

const deleteUser = (id) => {
    fetch('http://localhost/php_js/delete.php/?id=' + id, {
    method: 'DELET',
    })
    .then(res => res.text()) // or res.json()
    .then(res => {
        console.log(res);
        // readAllUsers();
    })
}



form_register.addEventListener("submit",(e) => {
e.preventDefault()

email = document.querySelector("#email").value
full_name = document.querySelector("#full_name").value
mobile = document.querySelector("#mobile").value
date = document.querySelector("#date").value
password = document.querySelector("#password").value
confirm_password = document.querySelector("#confirm_password").value
image = document.querySelector("#image")


const data = new URLSearchParams();
for (const p of new FormData(form_register)) {
  data.append(p[0],p[1])
}

data.append('image',image.files[0].name)

if(validateEmail(email) == true)
{   
    if (validatePhone(mobile) == true)
    {
            fetch("http://localhost/php_js/signup.php",{
            method: "POST",
            body: data,
    
            }).then(res => res.json())
            .then (data => {
                if(data.status == 200)
                {
                    window.location = "./index.html"   
                    console.log(data.message)
                }
            })
    }else{
        console.log("phone number is not correct");
    }
}else{
    console.log("Email validation is not correct");
}

}) // for event listener






function login(){
    email = email.value
    password = password.value

    const data = new URLSearchParams();
    for (const p of new FormData(form_login)) {
        data.append(p[0],p[1])
    }

    fetch('http://localhost/php_js/login.php/',{
        method: 'POST',
        body:data
    }).then((res) => res.json())
    .then(data => {
      localStorage.setItem("user_id",data.id)
      localStorage.setItem("username",data.full_name)
      if(data.role == 1)
      {
        window.location = "./index.html"
      }else{
        window.location = "./welcome.html"
      }
    })

}

    function logout() {
      let user_id = localStorage.getItem("user_id")

      fetch('http://localhost/php_js/logout.php?id=' + user_id,{
        method: 'GET'
      }).then(res => res.json())
      .then(data => console.log(data))
      localStorage.removeItem("username");
      localStorage.removeItem("user_id");
      window.location = "./login.html";
    }





  // <div class="d-flex flex-row align-items-center mb-4">
  //   <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
  //   <div class="form-outline flex-fill mb-0">
  //     <label class="form-label" for="form3Example4c">Password</label>
  //     <input
  //       type="password"
  //       id="password"
  //       name="password"
  //       class="form-control"
  //       required
  //       value="${data.password}"
  //     />
  //   </div>
  // </div>





//   const validateFullName = (full_name) =>  {
//     let strname = full_name.split(" ")
//     console.log(strname);
//     if (/^[a-zA-Z\s]*$/.test(full_name) && full_name != "" && strname.length > 3) {
//       return true;
//     }
//     alert("inValid name ");

//     // return (false)
//   }




// CREATE TABLE users (
//   userid INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//   fullname VARCHAR(100),
//   email VARCHAR(50),
//   reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   status VARCHAR(10) DEFAULT "inactive",
//   phone VARCHAR(14),
//   user_pwd LONGTEXT,
//   dob DATE,
//   role VARCHAR(10) DEFAULT "user");
