package component;

import java.io.File;
import java.sql.SQLException;
import java.util.UUID;
import conexion.*;
import SocketCliente.SocketCliete;
import org.json.JSONArray;
import org.json.JSONObject;

import Config.Config;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;

public class ObservadorPermiso {

    public ObservadorPermiso(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
            break;
            case "getByKey":
                getByKey(data, session);
                break;
            case "registro":
                registro(data, session);
            break;
            case "getPermisos":
                getPermisos(data, session);
            break;
            case "editar":
                editar(data, session);
            break;
            case "subirFoto":
                subirFoto(data, session);
            break;
            default:
                defaultType(data, session);
        }
    }

    public void defaultType(JSONObject obj, SSSessionAbstract session) {
        SocketCliete.send("usuario", obj, session);
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select observador_permiso_get_all('"+obj.getString("key_file")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public  void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select observador_permiso_get_by_key('"+obj.getString("key")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public  void getPermisos(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select observador_permiso_get_permisos('"+obj.getString("key_usuario")+"','"+obj.getJSONArray("key_files")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
            
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static JSONObject getByKey(JSONObject obj) {
        try {
            String consulta =  "select observador_permiso_get_by_key('"+obj.getString("key")+"') as json";
            return Conexion.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            return null;
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject observador_permiso = obj.getJSONObject("data");
            observador_permiso.put("key",UUID.randomUUID().toString());
            observador_permiso.put("fecha_on","now()");
            observador_permiso.put("estado","1");
            Conexion.insertArray("observador_permiso", new JSONArray().put(observador_permiso));
            obj.put("data", observador_permiso);
            obj.put("estado", "exito");

            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject observador_permiso = obj.getJSONObject("data");
            Conexion.editObject("observador_permiso", observador_permiso);
            obj.put("data", observador_permiso);
            obj.put("estado", "exito");

            String consulta =  "select get_permiso('"+observador_permiso.getString("key")+"') as json";
            JSONObject permiso = Conexion.ejecutarConsultaObject(consulta);
            String nombre_permiso = JSONObject.getNames(permiso)[0];
            JSONObject observador = permiso.getJSONObject(nombre_permiso);
            String key_us = observador.getString("key_usuario");
            String key_file = observador.getString("key_file");

            permiso.put(nombre_permiso, observador_permiso.getInt("estado")==1);
            JSONObject sendPermiso = new JSONObject();
            sendPermiso.put("component", "observadorPermiso");
            sendPermiso.put("type", "cambioPermiso");
            sendPermiso.put("key_file", key_file);
            sendPermiso.put("data", permiso);
            sendPermiso.put("estado", "exito");

            SSServerAbstract.sendUser(sendPermiso.toString(), key_us);

            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = Config.getJSON().getJSONObject("files").getString("url");
        File f = new File(url+"observador_permiso/");
        if(!f.exists()) f.mkdirs();
        obj.put("dir", f.getPath()+"/"+obj.getString("key"));
        obj.put("estado", "exito");
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
    }

    public static void registrarPermisos(JSONObject observador, boolean ver, boolean editar, boolean eliminar, boolean crear, boolean subir){
        try {
            JSONObject observador_permiso = new JSONObject();
            observador_permiso.put("key",UUID.randomUUID().toString());
            observador_permiso.put("key_observador",observador.getString("key"));
            observador_permiso.put("key_permiso","ver");
            observador_permiso.put("fecha_on","now()");
            observador_permiso.put("estado",ver?"1":"0");
            Conexion.insertArray("observador_permiso", new JSONArray().put(observador_permiso));
            
            observador_permiso.put("key",UUID.randomUUID().toString());
            observador_permiso.put("key_permiso","editar");
            observador_permiso.put("estado",editar?"1":"0");
            Conexion.insertArray("observador_permiso", new JSONArray().put(observador_permiso));

            observador_permiso.put("key",UUID.randomUUID().toString());
            observador_permiso.put("key_permiso","eliminar");
            observador_permiso.put("estado",eliminar?"1":"0");
            Conexion.insertArray("observador_permiso", new JSONArray().put(observador_permiso));

            observador_permiso.put("key",UUID.randomUUID().toString());
            observador_permiso.put("key_permiso","crear");
            observador_permiso.put("estado",crear?"1":"0");
            Conexion.insertArray("observador_permiso", new JSONArray().put(observador_permiso));

            observador_permiso.put("key",UUID.randomUUID().toString());
            observador_permiso.put("key_permiso","subir");
            observador_permiso.put("estado",subir?"1":"0");
            Conexion.insertArray("observador_permiso", new JSONArray().put(observador_permiso));

        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

}   