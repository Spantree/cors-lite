import express from 'express';
import CorsLite from './index';

const app = express();

//Instantiate your CORS policy manager with path to the config file
const corsLiteInstance = new CorsLite('path/to/your/cors-config.yml');

//Use cors-lite for CORS policy handling
app.use(corsLiteInstance.init);

// Your Express routes would go here ...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
