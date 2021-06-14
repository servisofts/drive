package component;

import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;
import SocketCliente.SocketCliete;
import util.console;

public class Manejador {

    public Manejador(JSONObject data, SSSessionAbstract session) {
        boolean showLog = true;
        if (data.getString("component").equals("socketTest")) {
            showLog = false;
        }
        if (showLog)
            console.log(console.ANSI_BLUE, " Manejador Socket Server -> : " + data.getString("component"));

        if (!data.isNull("component")) {
            switch (data.getString("component")) {
                case "usuario": {
                    new Usuario(data, session);
                    break;
                }
                case "cabeceraDato": {
                    new CabeceraDato(data, session);
                    break;
                }
                case "mensajeSocket": {
                    MensajeSocket.onMensaje(data, session);
                    break;
                }
                case "socketTest": {
                    new SocketTest(data, session);
                    break;
                }
                case "file": {
                    new SFile(data, session);
                    break;
                }
                case "fileSeguimiento": {
                    new FileSeguimiento(data, session);
                    break;
                }
                case "observadorPermiso": {
                    new ObservadorPermiso(data, session);
                    break;
                }
                case "observador": {
                    new Observador(data, session);
                    break;
                }
                default:
                    redirect(data, session);
            }
        } else {
            data.put("error", "No existe el componente");
        }
    }

    private void redirect(JSONObject data, SSSessionAbstract session){
        switch(data.getString("component")){
            case "rol":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "page":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "permiso":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "rolPermiso":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "usuarioRol":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "usuarioPage":
                SocketCliete.send("roles_permisos", data, session);
            break;
        }
    }
}