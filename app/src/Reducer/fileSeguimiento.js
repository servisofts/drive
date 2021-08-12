const initialState = {
    estado: "Not Found",
    data: {},
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "fileSeguimiento") {
        switch (action.type) {
            case "getByKey":
                getByKey(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const getByKey = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data[action.key_file] = action.data;
    }
}
const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data[action.key_file]) {
            state.data[action.key_file][action.data.key] = action.data;
        }

    }
}
