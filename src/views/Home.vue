<template>

    <div id="home">
        
        <!-- Campaign Details --> 
        <div v-if="selectedCampaign != null" class="mycontent"> 
            <div class="mytabs">
                <a v-on:click="activeTab=1" v-bind:class="[activeTab === 1 ? 'active' : '' ]">Campaign</a>
                <a v-on:click="activeTab=2" v-bind:class="[activeTab === 2 ? 'active' : '' ]">Characters</a>
                <a v-on:click="activeTab=3" v-bind:class="[activeTab === 3 ? 'active' : '' ]">Profile</a>
            </div>
            <!-- Header -->
            <div class="header" id="header">
                <p style="float:left; margin: 8px; text-transform: uppercase;">Home</p>
                <a v-on:click="logout" id="logout" style="text-transform: uppercase;">Logout</a>
            </div>
            <div v-show="activeTab === 1" class="mycontent">
            <!-- Campaign Selector and New Campaign Feature -->
                <div class="campSelect">
                    <select v-model="selectedCampaign" id="campSelector" v-on:change="getCampDetails">
                        <option selected disabled>Select a Campaign </option>
                        <option v-for="camp in campNames" v-bind:value="campNames.indexOf(camp)+1">{{camp}}</option>
                    </select>
                    <a v-on:click="campStart" style="cursor: pointer"> +</a>
                </div>

            <!-- New Campaign Form -->
                <div v-show="n_camp" id='newcamp-form'>
                    <div class="boxContent" style="color: red;" v-show='errors.length'>
                        <b>Please correct the following error(s):</b>
                        <ul style="list-style:none;">
                          <li v-for='Error in errors'>{{ Error }}</li>
                        </ul>

                    </div>
                    <!-- Campaign Details -->
                    <div class='boxContent'>
                        <div class='label'>Campaign Name: </div>
                        <input type='text' name='name' v-model='n_campName'>
                        <div class="label">Campaign Description: </div>
                        <textarea rows="4" cols="50" type="text" name="description" v-model="n_campDesc"></textarea>
                    </div>
                    <!-- submit button -->
                    <div class="boxContent">
                        <button @click='checkForm'> Submit</button>
                        <button @click='campCancel'>Cancel</button>
                    </div>
                </div>
                <!-- Campaign Data -->
                <div class="infoCard" v-show="selectedCampaign>0">
                    <h3>{{campData.name}}</h3>
                    <div v-html="displayInfo()"></div>
                    <hr>
                    <a v-on:click="objectStart" style="cursor: pointer">+ add object</a>
                    <div v-show="n_object" id='newobject-form'>
                        <div class="boxContent" style="color: red;" v-show='errors.length'>
                            <b>Please correct the following error(s):</b>
                            <ul style="list-style:none;">
                              <li v-for='Error in errors'>{{ Error }}</li>
                            </ul>

                        </div>
                        <!-- Object Details -->
                        <div class='boxContent'>
                            <div class='label'>Object Name: </div>
                            <input type='text' name='name' v-model='n_objectName'>
                            <div class="label">Object Type: </div>
                            <input type="text" name="type" v-model="n_objectType">
                            <div class="label">Object Description: </div>
                            <textarea rows="4" cols="50" type="text" name="description" v-model="n_objectDesc"></textarea>
                        </div>
                        <!-- submit button -->
                        <div class="boxContent">
                            <button @click='checkobjectForm'> Submit</button>
                            <button @click='objectCancel'>Cancel</button>
                        </div>
                    </div>
                     
                </div>
            </div>
            <div v-show="activeTab === 2" class="mycontent">
                <!-- PC Selection -->
                <div class="pcSelect">
                    <select v-model="selectedPC" id="pcSelector" v-on:change="getPCDetails">
                        <option selected disabled>Select a Character</option>
                        <option v-for="pc in pcNames" v-bind:value="pcNames.indexOf(pc)+1">{{pc}}</option>
                    </select>
                    <a v-on:click="pcStart" style="cursor: pointer"> +</a>
                </div>
                <!-- New PC Form -->
                <div v-show="n_pc" id ="newpc-form">
                    <div class="boxContent" style="color: red;" v-show="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul style="list-style:none;">
                          <li v-for='Error in errors'>{{ Error }}</li>
                        </ul>

                    </div>
                    <!-- PC Details -->
                    <div class="boxContent">
                        <div class="label">Character Name: </div>
                        <input type="text" name="name" v-model ="n_pcName">
                        <div class="label">STR: </div>
                        <input type="number" v-model="n_pcStats.nstr" name="str" min="3" max="20">
                        {{n_pcStats.nstr}}
                        <div class="label">DEX: </div>
                        <input type="number" v-model="n_pcStats.ndex" name="dex" min="3" max="20">
                        <div class="label">CON: </div>
                        <input type="number" v-model="n_pcStats.ncon" name="con" min="3" max="20">
                        <div class="label">INT: </div>
                        <input type="number" v-model="n_pcStats.nint" name="int" min="3" max="20">
                        <div class="label">WIS: </div>
                        <input type="number" v-model="n_pcStats.nwis" name="wis" min="3" max="20">
                        <div class="label">CHA: </div>
                        <input type="number" v-model="n_pcStats.ncha" name="cha" min="3" max="20">
                    </div>
                    <div class="boxContent">
                        <button @click='checkpcForm'>Submit</button>
                        <button @click='pcCancel'>Cancel</button>
                    </div>
                </div>
                <div class="infoCard" v-show="selectedPC >0">
                    <h3>{{pcData.name}}</h3>
                    <div v-if="selectedPC > 0"style="display: inline" v-html="displayInfo()"></div> 
                </div>

            </div>
            <div v-show="activeTab === 3" class="mycontent" style="text-align: left">
                <div class="infoCard">
                    <h4>Username: <span style="font-weight: normal">{{cuser.username}}</span></h4>
                    <h4>E-mail: <span style="font-weight: normal">{{cuser.email}}</span></h4>
                </div>
            </div>
        </div>
            <!-- To do: 
                    Add Fields/Field Data for GM of Campaign 
                    Put window options in drop down or side menu
                    Design Campaign Info Display
                    Add PC's to Campaign
                    Allow GM to set what content is public
                    Allow PC users to set what content is public
                    Create info card for display
            -->

            
    </div>
</template>

<script>
    import firebase from 'firebase';
    export default {
        name: 'Home',
        data() { 
            return {
                //contains all data in specific user collection
                cuser: "",
                activeTab: 1,
                //new object info
                n_object: false,
                n_objectName: null,
                n_objectType: null,
                n_objectDesc: null,
                //new character info
                n_pc: false,
                n_pcName: null,
                n_pcStats: {
                    nstr: 0,
                    ndex: 0,
                    ncon: 0,
                    nint: 0,
                    nwis: 0,
                    ncha: 0
                },
                //new campaign info
                n_camp: false,
                n_campName: null,
                n_campDesc: null,
                //current campaign info
                selectedCampaign: 0,
                campData: "",
                //all campaigns available to user
                campNames: [],
                //current character info
                selectedPC: 0,
                pcData: "",
                //all characters available to user
                pcNames: [],
                //any errors in form submission
                errors: [],
                displayItem: "default"
            }
        },
        mounted() {
            var db = firebase.firestore()
            var cur_user = firebase.auth().currentUser.email
            var userRef = db.collection("users").doc(cur_user)
            var getDoc = userRef.get().then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    this.cuser = doc.data()
                    // Sets campaign names based on IDs
                    this.updateCampList()
                    this.updatePCList()
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
            if (this.selectedCampaign > 0){
                this.getCampDetails(this.cuser.campaign[this.selectedCampaign - 1])
            }
            if (this.selectedPC > 0){
                this.getPCDetails(this.cuser.pc[this.selectedPC - 1])
            }
        },
        methods: {
            // Access firestore for differing collections
            getPCDetails:  function() {
                var db= firebase.firestore()
                var pcID = this.cuser.pc[this.selectedPC - 1]
                var pcRef = db.collection("characters").doc(pcID);
                var getDoc = pcRef.get().then(doc => {
                    if (!doc.exists) {
                        console.log('Character does not exist boi')
                        return null
                    }else{
                        this.pcData = doc.data()
                    }
                })
            },
            getCampDetails: function() {
                var db = firebase.firestore()
                var campID = this.cuser.campaign[this.selectedCampaign - 1]
                var campRef = db.collection("campaign").doc(campID);
                var getDoc = campRef.get().then(doc => {
                    if (!doc.exists) {
                        console.log('Campaign does not exist??')
                        return null
                    }else {
                        this.campData = doc.data()
                    }
                })

            },
            //update list of items for the logged in user
            updatePCList: function() {
                this.pcNames = [];
                for (var x in this.cuser.pc) {
                    this.getPCName(this.cuser.pc[x])
                }
            },
            updateCampList: function(){
                this.campNames = [];
                for (var x in this.cuser.campaign) {
                    this.getCampName(this.cuser.campaign[x])
                }
            },
            //get document name based on docID
            getPCName: function(pcID){
                var db =firebase.firestore()
                var pcRef = db.collection("characters").doc(pcID)
                var getDoc = pcRef.get().then(doc => {
                    if (!doc.exists){
                        console.log('Character does not exist.')
                        return null
                    }else{
                        if (!(doc.get("name").toString() in this.pcNames)){
                            this.pcNames.push(doc.get("name"))
                        }
                    }
                })
            },
            getCampName: function(campID) {
                var db = firebase.firestore()
                var campRef = db.collection("campaign").doc(campID);
                var getDoc = campRef.get().then(doc => {
                    if (!doc.exists) {
                        console.log('Campaign does not exist??')
                        return null
                    }else {
                        var campData = (doc.get("name")).toString()
                        if (!(campData in this.campNames)) {
                            this.campNames.push(campData)
                        }
                    }
                })
            },
            logout: function() {
                firebase.auth().signOut().then(() => {
                    this.$router.replace({ name: "login" })
                })
            },
            //clear entered fields and have new form disappear
            objectCancel: function(){
                this.n_object=false;
                this.n_objectName=null;
                this.n_objectType=null;
                this.n_objectDesc=null;
                this.errors=[];
            },
            pcCancel: function(){
                this.n_pc = false;
                this.n_pcName = null;
                this.errors = [];
            },
            campCancel: function (){
                this.n_camp = false;
                this.n_campName = null;
                this.n_campDesc = null;
                this.errors = [];

            },
            //new form 
            objectStart: function() {
                this.n_objectName="";
                this.n_objectDesc="";
                this.n_objectType="";
                this.n_object=true;
            },
            pcStart: function () {
                this.n_pcName = "";
                this.n_pc = true;
            },
            campStart: function () {
                this.n_campName="";
                this.n_campDesc="";
                this.n_camp = true;
            },
            //checks that forms are entered correctly then pushes data forward
            checkForm:function(e) {
                if(this.n_campName && this.n_campDesc) {
                    this.campSend()
                }else{
                    this.errors = [];
                    if(!this.n_campName) this.errors.push("Campaign name required.");
                    if(!this.n_campDesc) this.errors.push("Campaign description required");
                    e.preventDefault();  
                }
                
            },
            checkpcForm:function(e) {
                if (this.n_pcName){
                    this.pcSend()
                }else{
                    this.errors = [];
                    if (!this.n_pcName) this.errors.push("Character name required.")
                }
            },
            checkobjectForm: function(e) {
                if (this.n_objectName && this.n_objectDesc && this.n_objectType){
                    this.objectSend()
                }else{
                    this.errors = [];
                    if (!this.n_objectName) this.errors.push("Object name required.");
                    if (!this.n_objectType) this.errors.push("Object type required.");
                    if (!this.n_objectDesc) this.errors.push("Object dsecription required.");
                    e.preventDefault();
                }
            },
            //Sends data to firestore 
            objectSend: function(){
                var vm = this;
                var db = firebase.firestore()
                var newStuff=db.collection("campaign").doc(this.cuser.campaign[this.selectedCampaign-1]).collection("objects").add({
                    name: vm.n_objectName,
                    type: vm.n_objectType,
                    description: vm.n_objectDesc
                })
            },
            pcSend: function(){
                console.log(this.n_pcStats.nstr)
                var vm = this;
                var db =firebase.firestore()
                var newStuff = db.collection("characters").add({
                    name: vm.n_pcName,
                    player: vm.cuser.username,
                    stats: [vm.n_pcStats.nstr, vm.n_pcStats.ndex, vm.n_pcStats.ncon, vm.n_pcStats.nint, vm.n_pcStats.nwis, vm.n_pcStats.ncha]
                    
                }).then( (docRef) => {
                    var userRef = db.collection("users").doc(this.cuser.email)
                    userRef.update({
                        pc: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                    })
                })
                this.n_pc = false;
                this.n_pcName=null;
            },
            campSend: function() {
                var vm = this;
                var db = firebase.firestore()
                var newStuff = db.collection("campaign").add({
                    name: vm.n_campName,
                    gm: vm.cuser.username,
                    description: vm.n_campDesc
                }).then( (docRef) => {
                    var userRef = db.collection("users").doc(this.cuser.email)
                    userRef.update({
                        campaign: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                    })
                })
                this.n_camp = false;
                this.n_campName=null;
                this.n_campDesc=null;
            },
            displayInfo: function(){
                var disItem = this.displayItem;
                if (disItem == "default"){
                    if (this.activeTab == 1){
                        return this.campData.description
                    }
                    else if (this.activeTab == 2){
                        if (this.pcData){
                            return '<div class="SingleCol"><div class="ColumnLabel">Str:</div>'+this.pcData.stats[0]+ '</div><div class="SingleCol"><div class="ColumnLabel">Dex:</div>'+this.pcData.stats[1]+'</div><div class="SingleCol"><div class="ColumnLabel">Con:</div>'+this.pcData.stats[2]+'</div><div class="SingleCol"><div class="ColumnLabel">Int:</div>'+this.pcData.stats[3]+'</div><div class="SingleCol"><div class="ColumnLabel">Wis:</div>'+this.pcData.stats[4]+'</div><div class="SingleCol"><div class="ColumnLabel">Cha:</div>'+this.pcData.stats[5]+'</div>'

                            //return '<span class="label">Str: </span>' + this.pcData.stats[0] + '<span class="label">Dex: </span>' + this.pcData.stats[1] + '<span class="label">Con: </span>' + this.pcData.stats[2] + '<span class="label">Int: </span>' + this.pcData.stats[3] + '<span class="label">Wis: </span>' + this.pcData.stats[4] + '<span class="label">Cha: </span>' + this.pcData.stats[5]
                        }
                    }
                    return 'SOMETHINGS WRONG'
                    
                }
            }
        }
    }
</script>
<style>
    html {
      height: 100vh;
      width: 100%;
      text-align: center;
      line-height: 1.6;
      font-weight: 400;
      overflow:hidden;
    }
    body{
      min-height: 100vh;
      width: 100%;
    }
    li {
        clear: left;
        float: left;
    }
    #logout{
        background-color:transparent;
        text-decoration:none;
        text-align: right;
        float: right;
        margin: 8px;

    }
    #logout:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    #header{
        position: fixed;
        color: white;
        top: 0;
        width:100%;
        height: 40px;
        left:0px;
        margin: 0;
        display: inline;
        background: #967BB6;
    }
    .box{
        float: right;
        position: relative;
        left: -50%;
        display: block;
        text-align: left;
    }
    .box > .boxContent{
        clear: left;
        left: 50%;
        position: relative;
        display: block;
    }
    .label .input{
        display: block;
    }

    .mycontent{
        width: 100%;
        height: 100vh;

    }
    .mytabs{
      overflow: hidden;
      margin-top: 40px;
      text-align: center;
    }
    .mytabs a{
      text-transform: uppercase;
      cursor: pointer;
      font-size: 14px;
      padding-left: 1rem;
      padding-right: 1rem ;
      display: inline-block;

    }

    .mytabs a.active{
      text-decoration: underline;
      cursor: default;
    }
    .infoCard {
        display: block;
        background: white;
        margin: 20px;
        padding: 10px;
        border-radius: 8px;
    }
    .ColumnLabel{
      font-size: calc(6px + 0.3vw);
      line-height: 10px;
      color: black;
      font-weight: normal;
      height: 10px;
    }

    .SingleCol{
      min-width: calc(30px + 0.6vw);
      margin: calc(3px + 0.5vw);
      white-space: nowrap;
      text-align: left;
    }
</style>
<style scoped>
    #secure {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>