<template>

<span>Naziv:</span>
<br>
<input v-model="ime"/>
  <div class="sastojak" v-for="sastojak in sastojci" v-bind:key="sastojak">
    <p v-for="(value, name) in sastojak" v-bind:key="name">
      {{ name }} -- {{ value }}
    </p>
    <div v-for="(value, name) in sastojak" v-bind:key="name">

    </div>
  </div>
  <h3>Način pripreme:</h3>
  <p>{{ odabrani.opis }}</p>
</template>

<script>
export default {
  name: "EditRecept",
  props: {
    recept: Object,
  },
  data() {
    return {
      odabrani: {},
      sastojci: [],
      ime: "",

    };
  },
  watch: {
    // whenever question changes, this function will run
    recept() {
      this.odabrani = Object.assign({}, this.recept).selectedRecept;
      this.ime = Object.assign({}, this.recept).selectedRecept.Naziv;
      this.sastojci = this.odabrani.sastojci;
      console.log("this.sastojci", this.sastojci);
    },
    ime() {
        console.log(this.ime);
        
    }
  },
  created() {
    this.odabrani = Object.assign({}, this.recept).selectedRecept;
    this.sastojci = this.odabrani.sastojci;
    console.log("this.sastojci", this.sastojci);
  },
};
</script>