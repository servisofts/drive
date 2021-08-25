const initialState = {
    estado: "Not Found",
    data: {},
    file: {}
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "observadorPermiso") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
            case "editar":
                editar(state, action);
                break;
            case "cambioPermiso":
                cambioPermiso(state, action);
                break;
            case "getPermisos":
                getPermisos(state, action);
                break;
        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data[action.key_file] = action.data;
    }
}
const editar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        // console.log(action)
        // console.log(state)
        if (state.data[action.key_file]) {
            if (state.data[action.key_file][action.data.key_observador]) {
                state.data[action.key_file][action.data.key_observador].permisos[action.data.key_permiso] = action.data;
            }
        }

    }
}
const cambioPermiso = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.file[action.key_file]) {
            state.file[action.key_file] = {
                ...state.file[action.key_file],
                ...action.data
            };
            // alert(JSON.stringify(state.file[action.key_file], "\s", "\t"))

        }
    }
}
const getPermisos = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!action.key_files) return;
        action.key_files.map((key_file) => {
            state.file[key_file] = action.data[key_file];
        });
    }
}
