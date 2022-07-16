var firebaseConfig = {
       apiKey: "AIzaSyBEcYg9PzkTjkYcMo_NMtKsEpdZqy6cb1s",
    authDomain: "wellnesshome-19826.firebaseapp.com",
    databaseURL: "https://wellnesshome-19826-default-rtdb.firebaseio.com",
    projectId: "wellnesshome-19826",
    storageBucket: "wellnesshome-19826.appspot.com",
    messagingSenderId: "198460061416",
    appId: "1:198460061416:web:ed47b8eb89404b96a67b5d",
    measurementId: "G-7GB7PWSK5W"
      };

      firebase.initializeApp(firebaseConfig);
      // Initialize variables
      const auth = firebase.auth()
      const database = firebase.database()

      // Create a Recaptcha verifier instance globally
      // Calls submitPhoneNumberAuth() when the captcha is verified
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: function(response) {
            submitPhoneNumberAuth();
          }
        }
      );

      // This function runs when the 'sign-in-button' is clicked
      // Takes the value from the 'phoneNumber' input and sends SMS to that phone number
      function submitPhoneNumberAuth() {
        var phoneNumber = document.getElementById("phoneNumber").value;
        var appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then(function(confirmationResult) {
            window.confirmationResult = confirmationResult;
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      // This function runs when the 'confirm-code' button is clicked
      // Takes the value from the 'code' input and submits the code to verify the phone number
      // Return a user object if the authentication was successful, and auth is complete
      function submitPhoneNumberAuthCode() {

        name = document.getElementById('name').value
        phoneNumber = document.getElementById('phoneNumber').value

        if (validate_field(name) == false || validate_field(phoneNumber) == false // || validate_field(milk_before_cereal) == false
        ) {
        alert('One or More Extra Fields is Outta Line!!')
        return
        }

        var code = document.getElementById("code").value;
        confirmationResult.confirm(code).then(function(result) {

            var user = result.user;
            alert("OTP is verified!!!");

            if(user = result.user){
                  // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
             
              name : name,

              Mobile_no: phoneNumber,
              // milk_before_cereal : milk_before_cereal,
              // last_login : Date.now()
            }

            // Push to Firebase Database
            database_ref.child('contact/' + user.uid).set(user_data)
            }

            // this.data="doneit";
            console.log(user);
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      //This function runs everytime the auth state changes. Use to verify if the user is logged in
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log("USER LOGGED IN");
        } else {
          // No user is signed in.
          console.log("USER NOT LOGGED IN");
        }
      });


      function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}