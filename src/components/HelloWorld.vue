<template>
<div class="container">
  <v-row >
    <input type="text" class="form-control form-control-sm" style="width: 50%;margin-left: 10px;" v-model="letra" placeholder="Buscar">&nbsp;&nbsp;
    <button type="button" class="btn btn-primary btn-sm" @click="buscar">Buscar</button>
  </v-row>    
    <v-row >
      <v-col v-for="pokemon in pokemones" :key="pokemon.name" cols="12" md="4" sm="6">        
        <div class="card text-white bg-secondary" style="max-height: 300px;" >
          <router-link :to="{path:'detalles/'+pokemon.id}" type="button"  class="btn btn-primary">
             <img :src="pokemon.img" class="card-img-top" alt="" style="max-height: 150px;">
          </router-link>
          <div class="card-body text-center">
            <h5 class="card-title"><span class="badge bg-primary">{{pokemon.id}} - {{pokemon.name}}</span></h5>
            <div >
             <span class="badge bg-warning text-dark">Tipo:</span>
             <p style="margin: 2px;" class="fw-bold" v-for="tipos in pokemon.tipos" :key="tipos.name">{{tipos.name}}</p>
            </div>  
          </div>
        </div>     
      
    </v-col>
   </v-row>
  </div>
</template>

<script >
  import axios from 'axios';
  export default{
   data(){
       return {
        pokemones:[],
        busqueda: ''        
      }
   },
   mounted(){
    this.getPokemones();
    //this.buscar();

   },
   methods:{
    
    async getPokemones(){
      try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
      const arregloPokemones = response.data.results;

      for (const pokemon of arregloPokemones) {
        const nombreP = pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1);
        let imagenP = '';
        let idPokemon = '';
        let tipos_ = [];

        const res = await axios.get(pokemon.url);
        idPokemon = res.data.id;
        imagenP = res.data.sprites.other.dream_world.front_default;
        const arregloTipos = res.data.types;
        if (arregloTipos.length > 0) {
          tipos_ = arregloTipos.map(tipo => ({ name: tipo.type.name.charAt(0).toUpperCase() + tipo.type.name.substring(1) }));
        }

        const pokemonObjeto = { name: nombreP, img: imagenP, id: idPokemon, tipos: tipos_ };
        this.pokemones.push(pokemonObjeto);
      }
    } catch (error) {
      console.error('Error al obtener la lista de pokémones:', error);
    }
  }
    },
  buscar() {
     if(this.busqueda != ''){     
      const letraMinuscula = this.busqueda.toLowerCase();
      const pokemonesFiltrados = this.pokemones.filter(pokemon =>
        pokemon.name.toLowerCase().includes(letraMinuscula)
      );
      if(pokemonesFiltrados.length > 0){
        this.pokemones = pokemonesFiltrados;
      } else {
        this.pokemones = this.pokemones;
      }
    } else {
      this.pokemones = this.pokemones;
    }
    }, 

   }
  
</script>
