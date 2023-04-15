$(document).ready(function () {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    location.replace("dashboard.html");
  }

  const users = [
    {
      username: "JohnDoe",
      password: "pass123",
      email: "johndoe@example.com"
    },
    {
      username: "JaneDoe",
      password: "pass456",
      email: "janedoe@example.com"
    },
    {
      username: "BobSmith",
      password: "pass789",
      email: "bobsmith@example.com"
    },
    {
      username: "AliceLee",
      password: "pass123",
      email: "alicelee@example.com"
    },
    {
      username: "DavidKim",
      password: "pass567",
      email: "davidkim@example.com"
    }
  ];

  localStorage.setItem("userData", JSON.stringify(users));

  $.validator.addMethod('validemail', function (value) {
    return /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test(value)
  });

  $.validator.addMethod('validpass', function (value) {
    return /^[a-zA-Z0-9]*$/.test(value)
  });

  $("#myform").validate({
    rules: {
      email: {required:true,
        validemail: true,
      },
      password: {
        required:true,
        validpass: true,
        minlength: 6,
        maxlength: 10
      }
    },
    messages: {
      email: {required: "Please enter email",
        validemail: "Enter Valid Email",
      },
      password: {
        required: "Please enter Password",
        validpass: "Enter Valid Password",
        minlength: "Minimum Length 6",
        maxlength: "Maximum Length 10"
      }
    }
  })

  $("#login").click(function () {
    if ($("#myform").valid() == true) {
      // Check email and password with input and alert if matches
      const inputEmail = document.getElementById('email').value;
      const Email = inputEmail.toLowerCase();
      const inputPassword = document.getElementById('password').value;

      const storedUsers = JSON.parse(localStorage.getItem("userData"));

      const user = storedUsers.find(u => u.email === Email && u.password === inputPassword);

      if (user) {

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        location.replace("dashboard.html");

      } else {
        swal("Inavalid Credentials!", "Check Username And Password", "warning");
      }
    }
  });

});



















