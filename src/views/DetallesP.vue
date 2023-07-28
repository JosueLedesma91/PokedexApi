<template>
    <div class="container">
        <router-link to="/" type="button" class="btn btn-info">Regresar</router-link>
        <br><br>
        <v-row >
          <v-col cols="12" md="12" sm="12">     
               
            <div class="card bg-secondary" >
                 <img :src="img" class="card-img-top" alt="" style="max-height: 150px;">
              <div class="card-body">
                <div style="text-align: center;">
                <h5 class="card-title"><span class="badge bg-primary">{{id}} - {{name}}</span></h5>
                 <span class="badge bg-warning text-dark">Tipo:</span>
                 <p style="margin: 2px;" class="fw-bold" v-for="tipo in tipos" :key="tipo.name">{{tipo.name}}</p>
                </div>  
                <div >
                 <span class="badge bg-danger text-dark">Estadísticas:</span>
                 <br><br>
                <div class="text-caption" v-for="stat in stats" :key="stat.name">
                    <span class="fw-bold">{{stat.name}}</span>
                    <v-slider
                    v-model="stat.base_stat"
                    thumb-label="always"
                    ></v-slider>
                </div>                  
                </div>
              </div>
            </div>     
          
        </v-col>
       </v-row>
      </div>
    </template>

<script >
import { useRoute } from 'vue-router';
import axios from 'axios';
export default{
 data(){
     return {
      id:0,
      name:'',
      img:'',
      url:'',
      tipos:[],
      stats:[]      
    }
 },
 mounted(){
  const route = useRoute();
  this.id = route.params.id;
  this.url = `https://pokeapi.co/api/v2/pokemon/${this.id}/`;
  this.getPokemon();

 },
 methods:{
  
  async getPokemon(){
    try {
    const response = await axios.get(this.url);
    const arregloPokemon = response.data.results;
    let tipos_ = [];
    let stats_ = [];

    this.name = response.data.name.charAt(0).toUpperCase() + response.data.name.substring(1);
    this.id = response.data.id;
    this.img = response.data.sprites.other.dream_world.front_default;
    const arregloTipos = response.data.types;
    tipos_ = arregloTipos.map(tipo => ({ name: tipo.type.name.charAt(0).toUpperCase() + tipo.type.name.substring(1) }));
        //if(arregloTipos.lenght > 0){
        //        arregloTipos.forEach((tipo) => {
        //          var tipo_ = {name: tipo.name}
        //          tipos_.push(tipo_);
        //        });
        //}
      const arregloStats = response.data.stats;

        stats_ = arregloStats.map(stat => ({ name: stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.substring(1), base_stat: stat.base_stat }));
        //if(arregloStats.lenght > 0){
        //        arregloStats.forEach((stat) => {
        //          var stat_ = {name: stat.name, base_stat: stat.base_stat}
        //          stats_.push(stat_);
        //        });
       // }
      

      this.tipos = tipos_;
      this.stats = stats_;
      //const pokemonObjeto = { name: nombreP, img: imagenP, id: idPokemon, tipos: tipos_ };
      //this.pokemones.push(pokemonObjeto);
    
  } catch (error) {
    console.error('Error al obtener el pokemon:', error);
  }
}
  },

  

 }

</script>
