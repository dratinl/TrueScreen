<template>
    <div id="login">
        <h1>Login</h1>
        <div>
        <input type="text" name="email" v-model="input.email" placeholder="Email" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        </div>
        <button type="button" v-on:click="login()">Login</button>
        <button type="button" v-on:click="signup()">Signup</button>
    </div>
</template>

<script>
    import firebase from 'firebase';
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            signup() {
                console.log(this);
                this.$router.replace({ name: "signup" });
            },
            login: function() {
                firebase.auth().signInWithEmailAndPassword(this.input.email, this.input.password).then(
                    (user) => {
                        this.$router.replace({ name: "home" });
                    },
                    (err) => {
                        alert('Oops ' + err.message)
                    }
                );

                /*if(this.input.username != "" && this.input.password != "") {
                    // Connect to Database and authenticate information 
                    // Search via username in database. Hash password and check against hashed storage server side
                    if(this.input.password == this.$parent.mockAccount.password) {
                        this.$emit("authenticated", true);
                        this.$parent.currentUser = this.input.username;
                        this.$router.replace({ name: "secure" });
                    } else {
                        console.log("The username and / or password is incorrect");
                    }
                } else {
                    console.log("A username and password must be present");
                }*/
            }
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>