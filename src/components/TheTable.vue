<template>
  <b-container fluid="sm">
    <div class="vh-100 d-flex justify-content-center align-items-center">
      <div class="flex-grow-1">
        <div class="row mb-4">
          <div class="col-md-4">
            <legend>Search id</legend>
            <b-form-input
                id="filter-id"
                v-model="filter.id"
                type="search"
                placeholder="ID"
            ></b-form-input>
          </div>
          <div class="col-md-4">
            <legend>Search Brand</legend>
            <b-form-input
                id="filter-brand"
                v-model="filter.brand"
                type="search"
                placeholder="BRAND"
            ></b-form-input>
          </div>
          <div class="col-md-4">
            <legend>Search Years</legend>
              <div class="row">
                <div class="col-md-6 mb-sm-4">
                  <b-form-input
                      clas="mr-2"
                      id="filter-from-age"
                      v-model.trim.number="filter.from_age"
                      type="search"
                      placeholder="From age"
                  ></b-form-input>
                </div>
                <div class="col-md-6">
                  <b-form-input
                      id="filter-to-age"
                      v-model.trim.number="filter.to_age"
                      type="search"
                      placeholder="To age"
                  ></b-form-input>
                </div>
              </div>
        </div>
      </div>
        <b-table
            :no-local-sorting="true"
            :items="filteredItems"
            :fields="fields"
            v-model:sortBy="sortBy"
            sort-icon-left
            responsive="sm"
            @sort-changed="fetchRequest"
        >
        </b-table>
      </div>
    </div>
  </b-container>
</template>
<script>
import {postRequest} from "../Api.js";

export default {
  created() {
    const query = JSON.parse(localStorage.getItem('queryParams'));
    if (query) {
      for (let [key, value] of Object.entries(query)) {
        this.filter[key] = value
      }
    }
  },
  data() {
    return {
      sortBy: 'id',
      filter: {
        id: '',
        brand: '',
        from_age: '',
        to_age: null,
      },
      fields: [
        { key: 'id', sortable: true },
        { key: 'brand', sortable: true },
        { key: 'age', sortable: true },
      ],
      cars: [
        {id: 1, brand: 'BMW4', age: 2010},
        {id: 2, brand: 'Audi', age: 2012},
        {id: 3, brand: 'BMW', age: 2016},
        {id: 4, brand: 'Audi', age: 2018},
        {id: 5, brand: 'BMW', age: 2010},
        {id: 6, brand: 'Audi', age: 2012},
        {id: 7, brand: 'BMW', age: 2016},
        {id: 8, brand: 'Audi', age: 2018},
      ],
    }
  },
  methods: {
    fetchRequest(e) {
      postRequest(e.sortBy);
    }
  },
  computed: {
    filteredItems() {
      if (this.filter.to_age) {
        return this.cars.filter(car => {
          return car.id.toString().indexOf(this.filter.id.toString()) >= 0
              && car.brand.toLowerCase().indexOf(this.filter.brand.toLowerCase()) >= 0
              && car.age >= +this.filter.from_age
              && car.age <= +this.filter.to_age;
        });
      }
      return this.cars.filter(car => {
        return car.id.toString().indexOf(this.filter.id.toString()) >= 0
            && car.brand.toLowerCase().indexOf(this.filter.brand.toLowerCase()) >= 0
            && car.age >= +this.filter.from_age
      });
    },
  },
  watch: {
    filter: {
      deep: true,
      handler() {
        const query = {}
        Object.entries(this.filter).forEach(([key, value]) => {
          if (value) {
            query[key] = value;
          }
        })
        this.$router.push({ query });
        localStorage.setItem('queryParams', JSON.stringify(query));
      }
    }
  },
}
</script>
