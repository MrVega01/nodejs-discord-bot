const axios = require('axios').default;
let API_URL = 'https://pokeapi.co/api/v2/pokemon/';

async function searchPoke(poke){
    try {
        return await axios.get(`${API_URL}${poke}`)
        .then((response)=>{ if(response.status === 200) return response.data });
      } catch (error) {
        return false;
    }
}

module.exports = { searchPoke }