<template>
  <div id="main-container">
  <div id="form">
    <div class="pyramid">
      <div class="base"></div>
      <div class="side one"></div>
      <div class="side two"></div>
      <div class="side three"></div>
      <div class="side four"></div>
    </div>
    <img src="../assets/white MAJiK Logo.png"/>
    <h1 class="register-header">Create Account</h1>
    <form autocomplete="chrome-off" class="form-register" @submit.prevent="register">
      <div class="alert-danger" role="alert" v-if="registrationErrors">
        {{ registrationErrorMsg }}
      </div>
      <label for="username" class="username-label">Email </label>
      <input 
        type="text"
        @input = "emailInput"
        id="username"
        class="username-input"
        placeholder=" Email Address"
        v-model="user.username"
        required
        autofocus
      />
      <ul class="email-validator">      
			<li id="valid-email" v-bind:class="{ validemail: this.user.valid_email }">Enter a valid email</li>
      </ul>
      <label for="password" class="password-label">Password</label>
      <input
        type="password"
        @input = "userInput"
        id="password"        
        class="password-input"
        placeholder=" Password"        
        v-model="user.password"
        required
        
      />
      <ul class="validator">      
			<li id="length" v-bind:class="{ valid: this.user.contains_eight_characters }">Minimum length 8 characters</li>
			<li id="number" v-bind:class="{ valid: this.user.contains_number }">At least one number</li>
      <li id="letter" v-bind:class="{ valid: this.user.contains_lowercase }">At least one lowercase</li>
			<li id="capital" v-bind:class="{ valid: this.user.contains_uppercase }">At least one uppercase</li>
			<li id="special-char" v-bind:class="{ valid: this.user.contains_special_character }">At least one special character</li>
      </ul>
            
      <label for="password" class="password-label-confirm">Confirm Password</label>
      
      <input
        type="password"
        id="confirmPassword"
        class="password-input-confirm"
        placeholder=" Confirm Password"
        v-model="user.confirmPassword"
        required
      />
      <router-link :to="{ name: 'login' }" class="login-link">Have an account?</router-link>
      <button class="create-account-button" type="submit">
        Create Account
      </button>
    </form>
  </div>
  </div>
</template>

<script>
import authService from '../services/AuthService';


export default {
  name: 'register',
  data() {
    return {
      
      user: {
        username: '',
        password: '',
        confirmPassword: '',
        role: 'user',        
        contains_eight_characters: false,
        contains_number: false,
        contains_uppercase: false,
        contains_lowercase: false,
        contains_special_character: false,
        valid_email: false,
    
      },
      
      registrationErrors: false,
      registrationErrorMsg: 'There were problems registering this user.',
    };


  },
  methods: {
    emailInput: function(){
      this.user.valid_email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.user.username); 
    if(this.user.valid_email) {
      this.user.valid_email = true;
    } else {
      this.user.valid_email = false;
    }
    },
    userInput: function (){
      const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
      this.user.contains_number = /\d/.test(this.user.password);
      this.user.contains_uppercase = /[A-Z]/.test(this.user.password);
      this.user.contains_lowercase = /[a-z]/.test(this.user.password);
			this.user.contains_special_character = format.test(this.user.password);
      
      if(this.user.password.length >= 8){
        this.user.contains_eight_characters = true;
      } else {
        this.user.contains_eight_characters = false;
      }
      if(this.user.contains_number) {
        this.user.contains_number = true;
      }
      if(this.user.contains_lowercase) {
        this.user.contains_lowercase = true;
      }
      if(this.user.contains_uppercase) {
        this.user.contains_uppercase = true;
      }
      if(this.user.contains_special_character) {
        this.user.contains_special_character = true;
      }
    },
    register() {
      if (this.user.password != this.user.confirmPassword) {

        this.registrationErrors = true;
        this.registrationErrorMsg = 'Password & Confirm Password do not match.';
    
      } else if(!this.user.valid_email) {
        this.registrationErrors = true;
        this.registrationErrorMsg = 'Please Enter A Valid Email.';
      } else {
        
        authService
        
          .register(this.user)
          .then((response) => {
            if (response.status == 201) {
              this.$router.push({
                path: '/login',
                query: { registration: 'success' },
              });
            }
          })
          .catch((error) => {
            const response = error.response;
            this.registrationErrors = true;
            if (response.status === 400) {
              this.registrationErrorMsg = 'Email already in use.';
            }
          });
      }
    },    
    clearErrors() {
      this.registrationErrors = false;
      this.registrationErrorMsg = 'There were problems registering this user.';
    },
    
  },
};
</script>

<style scoped>

*{
    font-family: Tahoma, Verdana, Segoe, sans-serif;
    box-sizing: border-box;
}

.alert-danger {
  grid-area: alert;
  color: rgb(227, 108, 108);
  
}

img {
  width: 40%;
  min-width: 360px;
  display: block;
  margin: 0 auto;
}

body {

  background-color: white;
  height: 100vh;
  padding: 0;
  margin: 0;

}

div #nav {

  display: none;

}

.register-header {

    margin: 0px;
    padding-bottom: 20px;
    text-align: center;
    color: rgb(54, 52, 52);


}

#main-container {
  padding-top: 75px;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;

}

#form {
  width: 60%;
  border-radius: 24px;
  background-color: rgba(135, 122, 88, 0.45);
  box-shadow: 0px 2px 6px -1px rgba(109, 103, 103, 0.712);
  padding-top: 20px;
  padding-bottom: 20px;

}

.form-register {
  align-items: center;
  display: grid;
  grid-template-columns: 6fr 2fr 4fr 6fr;
  grid-template-areas:  ". username-label username-input ."
                        ". . email-validator ."
                        ". password-label password-input ."
                        ". . validator ."
                        ". password-label-confirm password-confirm ."
                        ". . alert ."
                        ". login-link create-account-button .";
                        
  grid-template-rows: auto auto 100px auto auto 50px 50px  ;
  
}

label {

  font-weight: 10;
  font-size:  16px;
  padding-bottom: 20x;

}


.username-label {
  
  grid-area: username-label;

}

.username-input {

  grid-area: username-input;
  
}

.username-input:focus ~ .email-validator {
  display: block;
}


.validemail {
  color: rgb(105, 143, 105);
   
}

.validemail:after {
  content: '  ✓';
}

.email-validator {
  grid-area: email-validator;
  display: none;
  background-color: rgba(0,0,0,.1);
  border-radius: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: rgb(73, 73, 73);
}

.password-label {
  
  grid-area: password-label;
  
}

.password-input:focus ~ .validator {
  display:block;
}

.validator{
  grid-area: validator;
  display: none;
  background-color: rgba(0,0,0,.1);
  border-radius: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: rgb(73, 73, 73);
}

.valid {
  color: rgb(105, 143, 105);
}

.valid:after {
  
  content: '  ✓';
  
}

.password-label-confirm {

  grid-area: password-label-confirm;

}

.password-input {
  
  grid-area: password-input;
  
}

.password-input-confirm {

  grid-area: password-confirm;

}

.create-account-button {

  grid-area: create-account-button;

}

.login-link {

  color: rgb(69, 69, 69);
  grid-area: login-link;

}

input {

  font-size:  16px; 
  padding:  10px; 

  height:  56px; 
  border:  none; 
  border-bottom:  solid 1px rgba(0,0,0,.1); 
  background:  #fff; 
  width:  auto; 
  box-sizing:  border-box; 
  transition:  all .3s linear; 
  color:  #000; 
  font-weight:  400;
  
}

.create-account-button {
  width:  auto;
  min-width:  50px;
  border-radius:  12px; 
  text-align:  center; 
  padding:  15px 40px;  
  color:  rgb(80, 80, 80); 
  font-size:  14px; 
  box-shadow:  0px 2px 6px -1px rgba(109, 103, 103, 0.712); 
  border:  none; 
  background-color: rgba(135, 122, 88, 0.45);
  
}

.create-account-button:hover {
  background-color:  rgb(60, 60, 60);
  color: rgb(217, 217, 217);
  transition: 0.6s;
}

.create-account-button:active {
  background-color: rgb(128, 128, 128);
  border: 4px solid rgb(53, 53, 53);
  transition: 0.1s;
  
}

.pyramid {
  margin: 0 auto;
  margin-bottom: 20px;
  position: relative;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  transform: rotateY(326deg) rotateX(2deg) rotateZ(359deg);
  animation: rotate 5s linear infinite;
}
.side {
  width: 0;
  height: 0;
  position: absolute;
  opacity: 0.7;
  border: 100px solid transparent;
  border-bottom: 200px solid rgba(109, 103, 103, 0.712);
  border-top: 0px;
}
.one {
  transform: rotateX(30deg);
  transform-origin: 0 0;
}
.two {
  transform-origin: 100px 0;
  transform: rotateY(90deg) rotateX(-30deg);
  border-bottom-color: rgba(109, 103, 103, 0.712);
}
.three {
  transform-origin: 100px 0;
  transform: rotateY(270deg) rotateX(-30deg);
  border-bottom-color: rgba(109, 103, 103, 0.712);
}
.four {
  transform-origin: 100px 0;
  transform: rotateY(0) rotateX(-30deg);
  border-bottom-color: rgba(109, 103, 103, 0.712);
}
.base {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateY(73px) rotateX(90deg);
  border: 0;
  background: rgba(109, 103, 103, 0.712);
}
@keyframes rotate {
  from {
    transform: rotateY(0)
      rotateX(30deg) rotateZ(30deg);
  }
  to {
    transform: rotateY(360deg)
      rotateX(30deg) rotateZ(30deg);
  }
}

@media only screen and (max-device-width: 480px) {
  .alert-danger {
  grid-area: alert;
  color: rgb(227, 108, 108);
  
}

img {
  width: 40%;
  min-width: 360px;
  display: block;
  margin: 0 auto;
}

body {

  background-color: white;
  height: 100vh;
  padding: 0;
  margin: 0;

}

div #nav {

  display: none;

}

.register-header {

    margin: 0px;
    padding-bottom: 20px;
    text-align: center;
    color: rgb(54, 52, 52);


}

#main-container {
  padding-top: 75px;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;

}

#form {
  width: 100%;
  height: 88%;
  border-radius: 24px;
  background-color: rgba(135, 122, 88, 0.45);
  box-shadow: 0px 2px 6px -1px rgba(109, 103, 103, 0.712);
  padding-top: 20px;
  padding-bottom: 20px;

}

.form-register {
  align-items: center;
  display: grid;
  grid-template-columns: 6fr 2fr 4fr 6fr;
  grid-template-areas:  ". username-label username-input ."
                        ". . email-validator ."
                        ". password-label password-input ."
                        ". . validator ."
                        ". password-label-confirm password-confirm ."
                        ". . alert ."
                        ". login-link create-account-button .";
                        
  grid-template-rows: auto auto 100px auto auto 50px 50px  ;
  
}

label {

  font-weight: 10;
  font-size:  16px;
  padding-bottom: 20x;

}


.username-label {
  
  grid-area: username-label;

}

.username-input {

  grid-area: username-input;
  
}

.username-input:focus ~ .email-validator {
  display: block;
}


.validemail {
  color: rgb(105, 143, 105);
   
}

.validemail:after {
  content: '  ✓';
}

.email-validator {
  grid-area: email-validator;
  display: none;
  background-color: rgba(0,0,0,.1);
  border-radius: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: rgb(73, 73, 73);
}

.password-label {
  
  grid-area: password-label;
  
}

.password-input:focus ~ .validator {
  display:block;
}

.validator{
  grid-area: validator;
  display: none;
  background-color: rgba(0,0,0,.1);
  border-radius: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: rgb(73, 73, 73);
}

.valid {
  color: rgb(105, 143, 105);
}

.valid:after {
  
  content: '  ✓';
  
}

.password-label-confirm {

  grid-area: password-label-confirm;

}

.password-input {
  
  grid-area: password-input;
  
}

.password-input-confirm {

  grid-area: password-confirm;

}

.create-account-button {

  grid-area: create-account-button;

}

.login-link {

  color: rgb(69, 69, 69);
  padding-right: 10px;
  grid-area: login-link;

}

input {

  font-size:  16px; 
  padding:  10px; 

  height:  56px; 
  border:  none; 
  border-bottom:  solid 1px rgba(0,0,0,.1); 
  background:  #fff; 
  width:  auto; 
  box-sizing:  border-box; 
  transition:  all .3s linear; 
  color:  #000; 
  font-weight:  400;
  
}

.create-account-button {
  width:  auto;
  min-width:  50px;
  border-radius:  12px; 
  text-align:  center; 
  padding:  15px 40px;  
  color:  rgb(80, 80, 80); 
  font-size:  14px; 
  box-shadow:  0px 2px 6px -1px rgba(109, 103, 103, 0.712); 
  border:  none; 
  background-color: rgba(135, 122, 88, 0.45);
  
}

.create-account-button:hover {
  background-color:  rgb(60, 60, 60);
  color: rgb(217, 217, 217);
  transition: 0.6s;
}

.create-account-button:active {
  background-color: rgb(128, 128, 128);
  border: 4px solid rgb(53, 53, 53);
  transition: 0.1s;
  
}

.pyramid {
  margin: 0 auto;
  margin-bottom: 20px;
  position: relative;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  transform: rotateY(326deg) rotateX(2deg) rotateZ(359deg);
  animation: rotate 5s linear infinite;
}
.side {
  width: 0;
  height: 0;
  position: absolute;
  opacity: 0.7;
  border: 100px solid transparent;
  border-bottom: 200px solid rgba(109, 103, 103, 0.712);
  border-top: 0px;
}
.one {
  transform: rotateX(30deg);
  transform-origin: 0 0;
}
.two {
  transform-origin: 100px 0;
  transform: rotateY(90deg) rotateX(-30deg);
  border-bottom-color: rgba(109, 103, 103, 0.712);
}
.three {
  transform-origin: 100px 0;
  transform: rotateY(270deg) rotateX(-30deg);
  border-bottom-color: rgba(109, 103, 103, 0.712);
}
.four {
  transform-origin: 100px 0;
  transform: rotateY(0) rotateX(-30deg);
  border-bottom-color: rgba(109, 103, 103, 0.712);
}
.base {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateY(73px) rotateX(90deg);
  border: 0;
  background: rgba(109, 103, 103, 0.712);
}
@keyframes rotate {
  from {
    transform: rotateY(0)
      rotateX(30deg) rotateZ(30deg);
  }
  to {
    transform: rotateY(360deg)
      rotateX(30deg) rotateZ(30deg);
  }
}
}

</style>
