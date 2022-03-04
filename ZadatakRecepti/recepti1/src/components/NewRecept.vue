<template>
<div>
<span>Naziv</span>
<input v-model="name"/>
</div>

<div>
<span>Sastojak</span>
<input v-model="nazivSastojka"/><input v-model="kolicinaSastojka"/> <button v-on:click="addSastojak">Add</button>

 <div class="sastojak" v-for="(sastojak, index) in sastojci" v-bind:key="index">
      <div class="sast" style="display: inline-flex" v-for="(value, name) in sastojak" v-bind:key="name">
    <p >
      {{ name }} -- {{ value }}
    </p>
     
     
      </div>
  </div>
</div>

<div>
    <textarea v-model="opisRecepta"> </textarea>
</div>
    <button v-on:click="saveRecord">Save</button>
</template>

<script>
export default {
    name: "NewRecept",
  data() {
    return {
      name: "",
      nazivSastojka:  "",
      kolicinaSastojka: "",
      sastojci: [],

      opisRecepta: "",
    };
  },
  components: {
   
  },

  created() {

  },
  methods: {
      saveRecord() {
          var recept = {};
          recept["Naziv"] = this.name;
          recept["sastojci"]  = this.sastojci;
          recept["opis"] = this.opisRecepta;


          var axios = require("axios");

      var config = {
        method: "post",
        url: "http://localhost:3000/api/insertrecords",
        headers: {
          recept: JSON.stringify(recept),
        },
      };
    var app = this;
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
         app.$emit('clicked')
          this.sastojci = [];
            this.nazivSastojka = "";
          this.kolicinaSastojka = "";
          this.name = "";
          this.opisRecepta = ""
        })
        .catch(function (error) {
          console.log(error);
        });

          console.log(recept);
          
      },
      addSastojak() {
          var sastojak = {}
          sastojak[this.nazivSastojka] = this.kolicinaSastojka;
          this.sastojci.push(sastojak)
          console.log(this.sastojci);
          this.nazivSastojka = "";
          this.kolicinaSastojka = "";
          
          
      }
  }
}
</script>

<style>

</style>