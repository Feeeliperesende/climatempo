import axios from 'axios';

//api.hgbrasil.com/weather?key=f877c41e&lat=-23.682&lon=-46.875

export const key = 'f877c41e';

const api = axios.create({
  baseURL: 'http://api.hgbrasil.com',
});

export default api;
