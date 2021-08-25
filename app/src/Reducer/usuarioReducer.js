import AppParams from "../Params";
import * as SSStorage from '../SSStorage';

const initialState = {
    estado: "",
    data: {},
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "usuario") {
        // if (action.version != "2.0") {
        //     return state;
        // }
        switch (action.type) {
            case "login":
                login(state, action);
                break;
            case "getAll":
                getAll(state, action);
                break;
            case "editar":
                editar(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
            case "getById":
                getById(state, action);
                break;
            case "buscar":
                buscar(state, action);
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
        }
        state.type = action.type;
        if (action.estado == "error") {
            state.error = action.error;
        }
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}
const login = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data;
        SSStorage.setItem(AppParams.storage.urlLog, JSON.stringify(action.data));
        state.login = action.data
    }
}
const getAll = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.data[action.cabecera] = action.data;
    }
}
const editar = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.data[action.cabecera][action.data.key] = action.data;
    }
}
const registro = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        // state.lastRegister = action.data;
        if (state.data[action.cabecera]) {
            state.data[action.cabecera][action.data.key] = action.data;
        }


    }
}
const getById = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        console.log(action)
        if (!state.data[action.cabecera]) {
            state.data[action.cabecera] = {}
        }

        state.data[action.cabecera][action.data.key] = action.data;
    }
}
const buscar = (state, action) => {
    state.estadoBuscar = action.estado
    if (action.estado === "exito") {
        state.dataBuscar = action.data;
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