import config from '../config/default'
const FACEBOOK = {
  clientID: "2680354318696556",
  clientSecret: "990e5a01902ce47d0a3dbc3ecb6704e3"
}

const GOOGLE = {
  clientID: "816197021536-f3knspgc3nvugb5soejmkir7amgknqki.apps.googleusercontent.com",
  clientSecret: "6j4siYsuV8tozj_geVLlycLG"
}

const SESSION = {
  COOKIE_KEY: "user"
};

const localDB = 'mongodb://localhost:27017/mern-iCoding';
const productionDB = 'mongodb://icoding:icoding19980107@ds363038.mlab.com:63038/icoding'
const DBUrl = config.mode == "production" ? productionDB : localDB
const MONGODB = {
  MONGODB_URI: DBUrl
};

export = {
  FACEBOOK,
  GOOGLE,
  SESSION,
  MONGODB
}