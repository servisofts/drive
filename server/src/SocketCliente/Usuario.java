package SocketCliente;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Base64;
import util.*;

import org.json.JSONException;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import component.Manejador;

public class Usuario {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public Usuario(JSONObject data) {
        switch (data.getString("type")) {
            case "login": {
                login(data);
                break;
            }
            case "loginFacebook": {
                loginFacebook(data);
                break;
            }
            case "loginGmail": {
                loginGmail(data);
                break;
            }
            case "registro": {
                registro(data);
                break;
            }
            case "registroFacebook": {
                registro(data);
                break;
            }
            case "getCi": {
                getCi(data);
                break;
            }
            case "confirmarDatos": {
                confirmarDatos(data);
                break;
            }
            case "recuperarPass": {
                recuperarPass(data);
                break;
            }
        }
    }

    private void recuperarPass(JSONObject obj) {
        if(obj.getString("estado").equals("exito")) {
            new PasswordRecuperado(obj.getJSONObject("data")).start();
        }
    }

    public void login(JSONObject obj) {
        System.out.println(obj.toString());
        if (obj.getString("estado").equals("exito")) {
            if (obj.has("router")) {
                JSONObject data = obj.getJSONObject("data");
                SSSessionAbstract session = SSServerAbstract.getSession(obj.getString("router"));
                session.setKeyUsuario(data.getString("key"));
            }
        }
    }

    public void loginFacebook(JSONObject obj) {
        System.out.println(obj.toString());
        if (obj.getString("estado").equals("exito")) {
            if (obj.has("router")) {
                JSONObject data = obj.getJSONObject("data");
                SSSessionAbstract session = SSServerAbstract.getSession(obj.getString("router"));
                session.setKeyUsuario(data.getString("key"));
            }
        }
    }

    public void loginGmail(JSONObject obj) {
        System.out.println(obj.toString());
        if (obj.getString("estado").equals("exito")) {
            if (obj.has("router")) {
                JSONObject data = obj.getJSONObject("data");
                SSSessionAbstract session = SSServerAbstract.getSession(obj.getString("router"));
                session.setKeyUsuario(data.getString("key"));
            }
        }
    }

    public void registro(JSONObject obj) {
        if (obj.getString("estado").equals("exito")) {
            if (obj.has("router")) {
                JSONObject data = obj.getJSONObject("data");
                SSSessionAbstract session = SSServerAbstract.getSession(obj.getString("router"));

                session.setKeyUsuario(data.getString("key"));
                String correo = data.getString("Correo");
                JSONObject infoUser = new JSONObject();
                infoUser.put("correo", correo);
                //infoUser.put("pass", pass);
                System.out.println("ENIO EL CORREO");
                new RegistroUsuario(infoUser).start();
                System.out.println("NOTIFICAR QUE SE REGISTRO UN NUEVO USUARIO");

                JSONObject objNotificacion = new JSONObject(obj.toString());
                objNotificacion.put("component", "notificacion");
                objNotificacion.put("type", "nuevoUsuario");
                objNotificacion.put("data", data);
                SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, objNotificacion.toString());

                objNotificacion.put("component", "usuario");

                new Manejador(objNotificacion, session);


                // SocketWeb.sendAll(objNotificacion.toString());
            }

        }

    }

    public void getCi(JSONObject obj) {
        if (obj.getString("estado").equals("exito")) {
            System.out.println("llego IMAGEN");
            // System.out.println(obj.toString());
        }

    }

    public void confirmarDatos(JSONObject obj) {
        if (obj.getString("estado").equals("exito")) {
            String key_usuario = obj.getString("key_usuario_modificado");
            // SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB,
            // objNotificacion.toString());
            SSServerAbstract.sendUser(obj.toString(), key_usuario);
            // System.out.println(obj.toString());
        }

    }
}