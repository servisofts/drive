import AppParams from '../Params';
import * as SSStorage from '../SSStorage';

const initialState = {
    estado: "Not Found",
    estadoEmail: false,
    history: [],
    usuarioLog: false,
    sessiones: {},
    lastSend: new Date(),
    data:{}
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "usuario") {
        switch (action.type) {
            case "login":
                login(state, action);
                break;
            case "loginFacebook":
                loginFacebook(state, action);
                break;
            case "loginGmail":
                loginGmail(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
            case "registroFacebook":
                registroFacebook(state, action);
                break;
            case "pedir":
                pedir(state, action);
                break;
            case "getById":
                getById(state, action);
                break;
            case "getUsuario":
                getUsuario(state, action);
                break;
            case "identificacion":
                identificacion(state, action);
                break;
            case "recuperarPass":
                recuperarPass(state, action);
                break;
            case "verificarCodigoPass":
                verificarCodigoPass(state, action);
                break;
            case "cambiarPassByCodigo":
                cambiarPassByCodigo(state, action);
                break;
            case "insertarDato":
                insertarDato(state, action);
                break;
            case "getAll":
                getAll(state, action);
                break;
            case "buscar":
                buscar(state, action);
                break;
        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const insertarDato = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (action.data.length > 0) {
            state.usuarioDatos[action.dato] = action.data[0]
        } else {
            state.usuarioDatos = true;
        }
    }
}

const identificacion = (state, action) => {

    state.estado = action.estado
    if (action.estado === "exito") {
        if (!action.data.key) {
            return;
        }
        state.usuarioLog = action.data;
        SSStorage.setItem(AppParams.storage.urlLog, JSON.stringify(action.data));
        state.login = "login"
    }
}
const getAll = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        if (!state.usuarios) {
            state.usuarios = {}
        }
        action.data.map((obj, key) => {
            state.data[obj.key] = obj.data;
            state.usuarios[obj.key] = obj.usuario;
        });
    }
}
const login = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data;
        SSStorage.setItem(AppParams.storage.urlLog, JSON.stringify(action.data));
        state.login = action.data
    }
}
const pedir = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        alert("llego")
    }

}
// const getById = (state, action) => {
//     state.estado = action.estado
//     if (action.estado === "exito") {
//         if (action.data.length > 0) {
//             state.data[actio.key] = JSON.parse(action.data[0].data)
//         } else {
//             state.data[actio.key] = true;
//         }
//     }
// }

const getById = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        if (action.key == state.usuarioLog.key) {
            state.usuarioDatos = action.data;
            state.data[action.key] = action.data;
        } else {
            state.data[action.key] = action.data;
        }
    }
    // if(){

    // }
}
const loginFacebook = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data;
        SSStorage.setItem(AppParams.storage.urlLog, JSON.stringify(action.data));
        state.login = action.data
    }
    if (action.estado === "error") {
        state.error = action.error
    }
}
const loginGmail = (state, action) => {
    console.log(action);
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data;
        SSStorage.setItem(AppParams.storage.urlLog, JSON.stringify(action.data));
        state.login = action.data
    }
    if (action.estado === "error") {
        state.error = action.error
    }
}
const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "error") {
        state.errorRegistro = action.error
    }
    if (action.estado === "exito") {
        state.usuarioLog = action.data.datos
        
        SSStorage.setItem(AppParams.storage.urlLog, JSON.stringify(action.data.datos));
    }
}
const registroFacebook = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.usuario;
        state.login = "facebook"
    }
    if (action.estado === "error") {
        state.error = action.error
    }
}
const getUsuario = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data
    }
}

const recuperarPass = (state, action) => {
    state.estadoEmail = action.estado
    if (action.estado === "exito") {
        state.usuarioRecuperado = action.data;
    }
    if (action.estado === "error") {
        state.errorEmailRecuperado = action.error
    }
}

const verificarCodigoPass = (state, action) => {
    state.estadoEmail = action.estado
    if (action.estado === "exito") {
        state.usuarioRecuperado = action.data;
    }
    if (action.estado === "error") {
        state.errorEmailRecuperado = action.error
    }
}

const cambiarPassByCodigo = (state, action) => {
    state.estadoEmail = action.estado
    if (action.estado === "exito") {
        state.usuarioRecuperado = action.data;
    }
    if (action.estado === "error") {
        state.errorEmailRecuperado = action.error
    }
}
const buscar = (state, action) => {
    state.estadoBuscar = action.estado
    if (action.estado === "exito") {
        state.dataBuscar = action.data;
    }

}
