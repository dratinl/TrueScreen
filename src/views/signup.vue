<template>
    <div id="signup">
        <h1>Sign up</h1>
        <input type="text" name="email" v-model="input.email" placeholder="e-mail" />
        <input type="text" name="username" v-model="input.username" placeholder="username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password"/>
        <button type="button" v-on:click="signUp()">Sign up</button>
    </div>
</template>
<script src="https://www.gstatic.com/firebasejs/5.9.3/firebase.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.9.2/firebase-firestore.js"></script>
<script type="text/javascript">
    import firebase from 'firebase';
    export default {
        name: 'Signup',
        data() {
            return {
                input: {
                    email: "",
                    username: "",
                    password: "",

                }
            }
        },
        methods: {
            signUp: function() {
                var vm = this;
                firebase.auth().createUserWithEmailAndPassword(this.input.email, this.input.password).then(
                    function (user){
                        var db = firebase.firestore()
                        db.collection("users").doc(vm.input.email).set({
                            email: vm.input.email,
                            username: vm.input.username,
                            campaign: [],
                            pc: []

                        })
                        .then(function() {
                            alert('Account Succesfully Created')
                        })
                        this.$router.replace({ name:"home" })
                    },
                    function (err){
                        alert('Oops' + err.message)
                    }

                );
                this.$router.replace({ name: "login" });
            }
        }
    }
</script>

<style scoped>
    #signup {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>