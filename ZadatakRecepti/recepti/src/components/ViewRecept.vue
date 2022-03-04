<template>
<h3>Naziv:</h3>
<div>
    
    <p>{{odabrani.Naziv}}</p>
    <button>Edit</button>

</div>
<h3>Sastojci za pripremu:</h3>
  <div class="sastojak" v-for="(sastojak, index) in sastojci" v-bind:key="index">
      <div class="sast" style="display: inline-flex" v-for="(value, name) in sastojak" v-bind:key="name">
    <p >
      {{ name }} -- {{ value }}
    </p>
     
     
      </div>
  </div>
  <h3>Način pripreme:</h3>
  <p>{{ odabrani.opis }}</p>
   <button>Edit</button>
</template>

<script>
export default {
  name: "ViewRecept",
  props: {
    recept: Object,
  },
  data() {
    return {
      odabrani: {},
      sastojci: [],
    };
  },
  watch: {
    // whenever question changes, this function will run
    recept() {
      this.odabrani = Object.assign({}, this.recept).selectedRecept;
      this.sastojci = this.odabrani.sastojci;
      console.log("this.sastojci", this.sastojci);
    },
  },
  created() {
    this.odabrani = Object.assign({}, this.recept).selectedRecept;
    this.sastojci = this.odabrani.sastojci;
    console.log("this.sastojci", this.sastojci);
  },
};
</script>