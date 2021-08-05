package component;


import SocketCliente.SocketCliete;
import TipoDato.TipoDato;
import conexion.Conexion;

import java.io.File;
import java.sql.SQLException;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;

import Config.Config;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;

public class Usuario {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public Usuario(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "insertarDato":
                insertarDato(data, session);
                break;
            case "identificacion":
                identificaion(data, session);
                break;
            case "recuperarPass":
                recuperarPass(data, session);
                break;
            case "subirFoto":
                subirFoto(data, session);
                break;
            case "nuevoUsuario":
                nuevoUsuario(data, session);
                break;
            default:
                defaultType(data, session);
        }
    }

    public void identificaion(JSONObject obj, SSSessionAbstract session) {
        System.out.println(obj.toString());
        String deviceKey = obj.getString("deviceKey");
        JSONObject data = obj.getJSONObject("data");
        JSONObject platform = obj.getJSONObject("platform");
        try{
            session.setKeyDevice(deviceKey);    
            session.setKeyUsuario(data.getString("key"));
        }catch(Exception e){
            System.out.println("Sin usuario");
        }
        
        obj.put("estado", "exito");
    }

    public void recuperarPass(JSONObject obj, SSSessionAbstract session) {
        String texto = obj.getString("data");
        JSONObject data = new JSONObject();
        data.put("key", "sa323-23r2r-2r-23r-23r");
        obj.put("data", data);
        obj.put("estado", "exito");
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        JSONArray data = obj.getJSONArray("data");
        JSONObject objData;

        for (int i = 0; i < data.length(); i++) {
            objData = data.getJSONObject(i);
            String insertarTipoDato = TipoDato.insertarTipo(objData, session);
            objData.put("data", insertarTipoDato);
        }

        SocketCliete.send("usuario", obj, session);

    }

    public void insertarDato(JSONObject obj, SSSessionAbstract session) {
        JSONArray data = obj.getJSONArray("data");
        JSONObject objData;
        for (int i = 0; i < data.length(); i++) {
            objData = data.getJSONObject(i);
            objData.put("key_usuario", obj.getString("key_usuario"));
            String insertarTipoDato = TipoDato.insertarTipo(objData, session);
            objData.put("data", insertarTipoDato);
        }
        SocketCliete.send("usuario", obj, session);

    }

    public void defaultType(JSONObject obj, SSSessionAbstract session) {
        SocketCliete.send("usuario", obj, session);

    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = Config.getJSON().getJSONObject("files").getString("url");
        File f = new File(url+"usuario/");
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
    }

    public void nuevoUsuario(JSONObject obj, SSSessionAbstract session) {
        String url = Config.getJSON().getJSONObject("files").getString("url")+obj.getJSONObject("data").getString("key")+"/";
        File f = new File(url);
        if(!f.exists()) f.mkdirs();


        try {
            String key = UUID.randomUUID().toString();
            JSONObject file = new JSONObject();
            file.put("key",key);
            file.put("descripcion","Bienvenido");
            file.put("fecha_on","now()");
            file.put("estado",1);
            file.put("tipo",0);
            file.put("posx", 0);
            file.put("posy", 0);

            Conexion.insertArray("file", new JSONArray().put(file));
            f = new File(url+key);
            if(!f.exists()) f.mkdirs();

            JSONObject file_tipo_seguimiento = new JSONObject();
            file_tipo_seguimiento.put("key",UUID.randomUUID().toString());
            file_tipo_seguimiento.put("descripcion","crear_carpeta");
            file_tipo_seguimiento.put("key_usuario", obj.getJSONObject("data").getString("key"));
            file_tipo_seguimiento.put("key_tipo_seguimiento","1");
            file_tipo_seguimiento.put("key_file",key);
            file_tipo_seguimiento.put("fecha_on","now()");
            file_tipo_seguimiento.put("estado",1);
            Conexion.insertArray("file_tipo_seguimiento", new JSONArray().put(file_tipo_seguimiento));

            JSONObject observador = new JSONObject();
            observador.put("key",UUID.randomUUID().toString());
            observador.put("key_usuario",obj.getJSONObject("data").getString("key"));
            observador.put("descripcion","Creador");
            observador.put("tipo",1);
            observador.put("key_file",key);
            observador.put("fecha_on","now()");
            observador.put("estado",1);
            Conexion.insertArray("observador", new JSONArray().put(observador));

            ObservadorPermiso.registrarPermisos(observador, true, true, true, true, true); 

            obj.put("dirs",  new JSONArray().put(url));
            obj.put("data", file);
            obj.put("estado", "exito");
            obj.put("type", "registro");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }
}