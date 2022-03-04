<template>
  <div id="app">
    <div class="menu">
      <button class="buttonAddNew" v-on:click="handleNewButton">Add New</button>
      <button class="buttonAddNew" v-on:click="handleEditButton">Edit</button>
      <button class="buttonAddNew" v-on:click="handleRemoveButton">
        Remove
      </button>
      <span>Search: </span>
      <input v-model="searchText" />
    </div>
    <div class="slider">
      <div class="sliderItem" v-for="row in rowsShow" v-bind:key="row.id">
        <button class="buttonRecept" v-on:click="openRecept(row)">
          <img src="../img/recept.jpeg" class="imageBtn" />
        </button>
        <p>{{ row.Naziv }}</p>
      </div>
    </div>

    <view-recept v-if="showRecept" :recept="{ selectedRecept }"></view-recept>
    <edit-recept
      v-if="showEditRecept"
      :recept="{ selectedRecept }"
    ></edit-recept>
    <new-recept @clicked="addedNew" v-if="showNewRecept"></new-recept>
  </div>
</template>

<script>
import ViewRecept from "./ViewRecept.vue";
import EditRecept from "./EditRecept.vue";
import NewRecept from "./NewRecept.vue";
import axios from "axios";

export default {
  name: "HomeItem",
  data() {
    return {
      rows: [],
      selectedRecept: {},
      showRecept: false,
      showEditRecept: false,
      searchText: "",
      showNewRecept: false,
    };
  },
  components: {
    ViewRecept,
    EditRecept,
    NewRecept,
  },

  created() {
    axios
      .get("http://localhost:3000/api/getAllRecords")
      .then((response) => {
        this.rows = response.data;
        this.rowsShow = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  computed: {
    rowsShow() {
      if (this.searchText === "") {
        return this.rows;
      }
      return this.rows.filter((e) => e.Naziv.includes(this.searchText));
    },
  },
  methods: {
    openRecept: function (row) {
      this.showRecept = false;
      this.selectedRecept = row;
      this.showRecept = true;
      this.showNewRecept = false;
    },
    handleEditButton: function () {
      this.showEditRecept = true;
      this.showRecept = false;
      this.showNewRecept = false;
    },
    handleNewButton() {
      this.showEditRecept = false;
      this.showRecept = false;
      this.showNewRecept = true;
    },
    addedNew() {
      this.$router.go();
    },
    handleRemoveButton: function () {
      var item = {};
      item["Naziv"] = this.selectedRecept.Naziv;
      var axios = require("axios");

      var config = {
        method: "post",
        url: "http://localhost:3000/api/removeRecord",
        headers: {
          search_item: JSON.stringify(item),
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });

      this.$router.go();
    },
  },
};
</script>

<style scoped>
table {
  font-family: "Open Sans", sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475c;
  color: #fff;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #d4d8f9;
}

.imageBtn {
  height: 100px;
  width: 100px;
}

.menu {
  position: static;
  width: 100%;
  height: 60px;
  background: rgb(157, 157, 214);
}

.buttonAddNew {
  margin-left: 5px;
  margin-right: 5px;
  height: 100%;
  background: rgb(157, 157, 214);
}

.buttonRecept {
  margin: 10px;
  border-radius: 10px;
}
.slider {
  width: 100vw;
  max-width: 100%;
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;
}

.sliderItem {
  width: 25%;
  height: 100px;
  display: inline-block;
}
</style>


