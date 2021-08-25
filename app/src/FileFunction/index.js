import React from 'react'
import AppParams from "../Params";

export const getFilesInPath = (props) => {
    var activeRoot = props.state.fileReducer.activeRoot;
    switch (activeRoot.key) {
        case "raiz":
            return getFilesInPathRoot(props);
        case "trash":
            return getFilesInPathTrash(props);
        default:
            return getFilesInPathShared(props, activeRoot);
    }
}
export const getFilesInPathShared = (props, activeRoot) => {
    var dataFinal = false;
    var data = props.state.fileReducer.data["root"];
    // console.log(data);
    if (!data) {
        if (props.state.fileReducer.estado == "cargando") { return false }
        if (props.state.fileReducer.estado == "error") { return false }
        var object = {
            component: "file",
            type: "getAll",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key
        }

        // alert(JSON.stringify(object));
        props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    }
    dataFinal = data;
    var routes = props.state.fileReducer.routes;
    if (routes.length > 0) {
        var size = routes.length;
        var lastPath = routes[size - 1];
        if (lastPath) {
            var parent = props.state.fileReducer.data[lastPath.key];
            if (!parent) {
                if (props.state.fileReducer.estado == "cargando") { return false }
                if (props.state.fileReducer.estado == "error") { return false }
                var object = {
                    component: "file",
                    type: "getAll",
                    estado: "cargando",
                    path: routes,
                    key_usuario: props.state.usuarioReducer.usuarioLog.key,
                }
                // alert(JSON.stringify(object));
                props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            }
            dataFinal = parent;
        }
    }
    var objFinal = {};
    if (!dataFinal) {
        return dataFinal;
    }
    var root = props.state.fileReducer.activeRoot;
    Object.keys(dataFinal).map((key) => {
        var obj = dataFinal[key];
        if (obj.observadores.includes(props.state.usuarioReducer.usuarioLog.key)) {
            if (routes.length <= 0) {
                if (obj.key_creador != props.state.usuarioReducer.usuarioLog.key) {
                    if (root.usr) {
                        if (obj.key_creador == root.usr.key) {
                            objFinal[key] = obj;
                        }
                    }
                }
            } else {
                objFinal[key] = obj;
            }
        }
    })
    return objFinal;
}
export const getFilesInPathTrash = (props) => {
    var dataFinal = false;
    var data = props.state.fileReducer.trash.data;
    if (!data) {
        if (props.state.fileReducer.estado == "cargando") { return false }
        if (props.state.fileReducer.estado == "error") { return false }
        var object = {
            component: "file",
            type: "getAllPapelera",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key
        }
        // alert(JSON.stringify(object));
        props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    }
    dataFinal = data;
    var routes = props.state.fileReducer.routes;
    if (routes.length > 0) {
        routes.map((curRoute, key1) => {
            dataFinal = dataFinal[curRoute.key].data;
            if (!dataFinal) {
                if (props.state.fileReducer.estado == "cargando") { return false }
                if (props.state.fileReducer.estado == "error") { return false }
                var object = {
                    component: "file",
                    type: "getAllPapelera",
                    estado: "cargando",
                    key_usuario: props.state.usuarioReducer.usuarioLog.key,
                    path: routes
                }
                // alert(JSON.stringify(object));
                props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            }

        })
    }
    var objFinal = {};
    if (!dataFinal) {
        return dataFinal;
    }
    Object.keys(dataFinal).map((key) => {
        var obj = dataFinal[key];
        if (!obj) {
            return;
        }
        if (obj.key_creador == props.state.usuarioReducer.usuarioLog.key) {
            objFinal[key] = obj;
        }
        // console.log(obj.observadores)
        // objFinal[key] = obj;
    })
    return objFinal;
}
export const getFilesInPathRoot = (props) => {
    var dataFinal = false;
    var data = props.state.fileReducer.data["root"];
    // console.log(data);
    if (!data) {
        if (props.state.fileReducer.estado == "cargando") { return false }
        if (props.state.fileReducer.estado == "error") { return false }
        var object = {
            component: "file",
            type: "getAll",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key
        }

        // alert(JSON.stringify(object));
        props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    }
    dataFinal = data;
    var routes = props.state.fileReducer.routes;
    if (routes.length > 0) {
        var size = routes.length;
        var lastPath = routes[size - 1];
        if (lastPath) {
            var parent = props.state.fileReducer.data[lastPath.key];
            if (!parent) {
                if (props.state.fileReducer.estado == "cargando") { return false }
                if (props.state.fileReducer.estado == "error") { return false }
                var object = {
                    component: "file",
                    type: "getAll",
                    estado: "cargando",
                    path: routes,
                    key_usuario: props.state.usuarioReducer.usuarioLog.key,
                }
                // alert(JSON.stringify(object));
                props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            }
            dataFinal = parent;
        }
    }
    var objFinal = {};
    if (!dataFinal) {
        return dataFinal;
    }
    Object.keys(dataFinal).map((key) => {
        var obj = dataFinal[key];
        if (!obj) {
            return;
        }
        if (routes.length <= 0) {
            if (obj.key_creador == props.state.usuarioReducer.usuarioLog.key) {
                objFinal[key] = obj;
            }
        } else {
            objFinal[key] = obj;
        }

        // console.log(obj.observadores)
        // objFinal[key] = obj;
    })
    return objFinal;
}

export const getPosicionDisponible = ({ curFile, props }) => {
    var widthContainer = props.widthContainer;
    var heightContainer = props.heightContainer;
    var size = 90;
    var margin = 5;

    var x = props.x || 0;
    var y = props.y || 0;

    var x2 = 0;
    var y2 = 0;
    const validatePosition = () => {
        var keys = Object.keys(curFile)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            var obj = curFile[key];
            x2 = obj.posx;
            y2 = obj.posy;
            var isValid = true;
            var difx = x2 + ((size) / 2) - (x + ((size) / 2))
            var dify = y2 + ((size) / 2) - (y + ((size) / 2))
            if (Math.abs(difx) <= size - margin && Math.abs(dify) <= size - margin) {
                return false
            }
        }
        return true;
    }
    var isValidate = false;
    var incremet = 10;
    var i = 0;
    while (!isValidate) {
        i++;
        if ((x + size + margin) >= widthContainer) {
            x = 0;
            y += size + margin
        }
        isValidate = validatePosition();

        if (!isValidate) {
            if ((x + size + margin) >= widthContainer) {
                x = 0;
                y += incremet * i
            } else {
                x += incremet * i
            }
        }
    }
    return { x: x, y: y }
}

export const getPermisoFile = (props, key_file) => {
    return props.state.observadorPermisoReducer.file[key_file]
}
export const getPermisoFileType = (props, key_file, type) => {
    if (!props.state.observadorPermisoReducer.file[key_file]) return false
    return props.state.observadorPermisoReducer.file[key_file][type];
}
export const getPermisos = (props, key_files) => {
    // if (props.state.fileReducer.routes.length <= 0) {
    //     return {
    //         ver: true,
    //         subir: true,
    //         eliminar: true,
    //         editar: true,
    //         crear: true
    //     };
    // }
    // var key_file = props.state.fileReducer.routes[props.state.fileReducer.routes.length - 1].key
    var exito = true;
    var data = {};
    key_files.map(key_file => {
        data[key_file] = props.state.observadorPermisoReducer.file[key_file];
        if (!data[key_file]) {
            exito = false;
        }
    })
    if (!exito) {
        if (props.state.observadorPermisoReducer.estado == "cargando") { return false }
        if (props.state.observadorPermisoReducer.estado == "error") { return false }
        var object = {
            component: "observadorPermiso",
            type: "getPermisos",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            key_files: key_files
        }
        // alert(JSON.stringify(object));
        props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        return false;
    }
    return data;
}