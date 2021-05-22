import { combineReducers } from 'redux';
import socketReducer from './socketReducer';
import usuarioReducer from './usuarioReducer';
import permisoReducer from './permisoReducer';
import permisoPageReducer from './permisoPageReducer';
import rolReducer from './rolReducer';
import imageReducer from './imageReducer';
import rolPermisoReducer from './rolPermisoReducer';
import usuarioRolReducer from './usuarioRolReducer';
import usuarioPageReducer from './usuarioPageReducer';
import cabeceraDatoReducer from './cabeceraDatoReducer';
import fileReducer from './fileReducer';
import fileSeguimiento from './fileSeguimiento';

export default combineReducers({
    cabeceraDatoReducer,
    socketReducer,
    usuarioReducer,
    permisoReducer,
    permisoPageReducer,
    imageReducer,
    rolReducer,
    rolPermisoReducer,
    usuarioRolReducer,
    usuarioPageReducer,
    fileReducer,
    fileSeguimiento
});