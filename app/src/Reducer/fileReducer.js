const initialState = {
    estado: "Not Found",
    root: {
        "raiz": {
            key: "raiz",
            descripcion: "/"
        },
        "shared": {
            key: "shared",
            descripcion: "Compartido"
        },
        "trash": {
            key: "trash",
            descripcion: "Papelera"
        }
    },
    trash: {

    },
    activeRoot: false,
    data: {},
    routes: []
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "file") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "subir":
                subir(state, action);
                break;
            case "editar":
                editar(state, action);
                break;
            case "getAll":
                getAll(state, action);
                break;
            case "getAllPapelera":
                getAllPapelera(state, action);
                break;
            case "moveFolder":
                moveFolder(state, action);
                break;
            case "backFolder":
                backFolder(state, action);
                break;
            case "anular":
                anular(state, action);
                break;
            case "reload":
                reload(state, action);
                break;
        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            if (action.path.length > 0) {
                var curData = state;
                action.path.map((obj, key) => {
                    if (curData) {
                        curData = curData.data[obj.key];
                        if (!curData.data) {
                            curData.data = {}
                        }
                    }
                })
                if (curData) {
                    curData.data[action.data.key] = action.data;
                }
            } else {
                state.data[action.data.key] = action.data;
            }
        }
        state.lastRegister = action.data;
    }
}
const subir = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            if (action.path.length > 0) {
                var curData = state;
                action.path.map((obj, key) => {
                    if (curData) {
                        curData = curData.data[obj.key];
                        if (!curData.data) {
                            curData.data = {}
                        }
                    }
                })
                if (curData) {
                    action.data.map((obj) => {
                        curData.data[obj.key] = obj;
                    })
                }
            } else {
                action.data.map((obj) => {
                    state.data[obj.key] = obj;
                })
            }
        }
        state.lastRegister = action.data;
    }
}
const editar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (action.data.estado == 0) {
            if (state.trash.data) {
                state.trash.data[action.data.key] = action.data;
                //lo pasamos a eliminados;
            }
            if (state.data) {
                if (action.path && action.path.length > 0) {
                    var size = action.path.length;
                    var lastPath = action.path[size - 1];
                    if (lastPath) {
                        var parent = state.data[lastPath.key];
                        if (parent) {
                            delete parent[action.data.key];
                            return;
                            //Cuando se elimina un file dentro de un path;
                        }
                    }
                } else {
                    delete state.data["root"][action.data.key];
                    return;
                    //Cuando se elimina un file en la raiz;
                }
            }
        } else {
            if (state.trash.data) {
                delete state.trash.data[action.data.key];
                return;
                //lo quitamos de eliminados;
            }
            if (state.data) {
                if (action.path && action.path.length > 0) {
                    var size = action.path.length;
                    var lastPath = action.path[size - 1];
                    if (lastPath) {
                        var parent = state.data[lastPath.key];
                        if (parent) {
                            parent[action.data.key] = action.data;
                            return;
                            //remplazamos un file dentro de un path;
                        }
                    }
                } else {
                    if (state.data["root"]) {
                        state.data["root"][action.data.key] = action.data;
                        return;
                    }
                    //remplazamos un file en la raiz;
                }
            }
        }
    }
}
const editar2copy = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.activeRoot.key == "trash") {
            if (state.trash.data) {
                if (action.path.length > 0) {
                    var curData = state;
                    action.path.map((obj, key) => {
                        if (curData) {
                            curData = curData.data[obj.key];
                            if (!curData.data) {
                                curData.data = {}
                            }
                        }
                    })
                    if (curData) {
                        curData.data[action.data.key] = action.data;
                        if (curData.data[action.data.key].estado == 0) {
                            delete curData.data[action.data.key];
                        }
                    }
                } else {
                    state.trash.data[action.data.key] = action.data;
                }
            }
        } else {
            if (state.data) {
                if (action.path && action.path.length > 0) {
                    var curData = state;
                    action.path.map((obj, key) => {
                        if (curData) {
                            curData = curData.data[obj.key];
                            if (!curData.data) {
                                curData.data = {}
                            }
                        }
                    })
                    if (curData) {
                        curData.data[action.data.key] = action.data;
                        if (curData.data[action.data.key].estado == 0) {
                            delete curData.data[action.data.key];
                        }
                    }
                } else {
                    state.data[action.data.key] = action.data;
                    if (state.data[action.data.key].estado == 0) {
                        delete state.data[action.data.key];
                    }
                }
            }
        }

        state.lastEdit = action.data;
    }
}
const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (action.path) {
            // var curData = state;
            var size = action.path.length;
            var lastPath = action.path[size - 1];
            if (lastPath) {
                state.data[lastPath.key] = action.data;
                if (!action.data) {
                    state.data[lastPath.key] = {};
                }

            }
            // action.path.map((obj, key) => {
            //     if (curData) {
            //         curData = curData.data[obj.key];
            //         if (!curData.data) {
            //             curData.data = {}
            //         }
            //     }
            // })
            // if (action.data) {
            //     curData.data = action.data;
            // } else {
            //     curData.data = {};
            // }
        } else {
            if (!action.data) {
                state.data["root"] = {};
            } else {
                state.data["root"] = action.data;
            }
        }
    }
}
const getAllPapelera = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (action.path) {
            var curData = state.trash;
            action.path.map((obj, key) => {
                if (curData) {
                    curData = curData.data[obj.key];
                    if (!curData.data) {
                        curData.data = {}
                    }
                }
            })
            if (action.data) {
                curData.data = action.data;
            } else {
                curData.data = {};
            }
        } else {
            if (!action.data) {
                state.trash.data = {};
            } else {
                state.trash.data = action.data;
            }
        }
    }
}
// const getByKey = (staet, action) => {
//     state.estado = action.estado
//     if (action.estado === "exito") {
//         if (state.data) {
//             delete state.data[action.key];
//         }
//     }
// }
const moveFolder = (state, action) => {
    if (state.routes[state.routes.length - 1]) {
        if (state.routes[state.routes.length - 1].key == action.data.key) {
            return;
        }
    }
    var objPath = { ...action.data };
    delete objPath["data"];
    state.routes.push(objPath);
}
const backFolder = (state, action) => {
    if (state.routes.length > 0) {
        state.routes = state.routes.slice(0, state.routes.length - 1)
    }
}


const anular = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            alert("sadas");
            delete state.data[action.key];
        }
    }
}

const reload = (state, action) => {

    if (state.routes.length <= 0) {
        state.routes = [];
        state.data = {};
        state.trash = {};
    } else {
        var position = state.routes.length;
        var lastPosition = state.routes[position - 1];
        if (lastPosition) {
            delete state.data[lastPosition.key];
        }
    }
}