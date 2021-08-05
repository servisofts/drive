package component;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import conexion.*;
import util.ZipDir;
import SocketCliente.SocketCliete;

import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import Config.Config;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;

public class SFile {

    public SFile(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
            break;
            case "getAllPapelera":
                getAllPapelera(data, session);
            break;
            case "getByKey":
                getByKey(data, session);
            break;
            case "registro":
                registro(data, session);
            break;
            case "compartir":
                compartir(data, session);
            break;
            case "editar":
                editar(data, session);
            break;
            case "editarGrupo":
                editarGrupo(data, session);
            break;
            case "anular":
                anular(data, session);
            break;
            case "subir":
                subir(data, session);
            break;
            default:
                defaultType(data, session);
        }
    }

    public void defaultType(JSONObject obj, SSSessionAbstract session) {
        SocketCliete.send("usuario", obj, session);
    }

    public void getAllPapelera(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject file;

            if(obj.has("path")){
                String consulta =  "select file_get_by_key_padre('"+obj.getJSONArray("path")
                .getJSONObject(obj
                .getJSONArray("path").length()-1)
                .getString("key")+"') as json";
                file = Conexion.ejecutarConsultaObject(consulta);
            }else{
            String consulta =  "select file_get_all_papelera('"+obj.getString("key_usuario")+"') as json";
                    file = Conexion.ejecutarConsultaObject(consulta);
            }
            obj.put("data",file);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject file;
            if(obj.has("path")){
                String consulta =  "select file_get_by_key_padre('"+obj.getJSONArray("path")
                .getJSONObject(obj
                .getJSONArray("path").length()-1)
                .getString("key")+"') as json";
                file = Conexion.ejecutarConsultaObject(consulta);
            }else{
                String consulta =  "select file_get_all('"+obj.getString("key_usuario")+"') as json";
                file = Conexion.ejecutarConsultaObject(consulta);
            }
            obj.put("data", file);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select file_get_by_key('"+obj.getJSONArray("path")
                .getJSONObject(obj
                .getJSONArray("path").length()-1)
                .getString("key")+"') as json";
                JSONObject file = Conexion.ejecutarConsultaObject(consulta);
                obj.put("data", file);
                obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public static JSONObject getByKey(String key_file) {
        try {
            String consulta =  "select file_get_by_key('"+key_file+"') as json";
            return Conexion.ejecutarConsultaObject(consulta);    
        } catch (SQLException e) {
            return null;
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            
            String key_file_padre =  "";
            if(obj.getJSONArray("path").length()>0){
                key_file_padre =  obj.getJSONArray("path").getJSONObject(obj.getJSONArray("path").length()-1).getString("key");    
            }
            String url = Config.getJSON().getJSONObject("files").getString("url")+obj.getString("key_usuario")+"/";
            File f = new File(url);
            if(!f.exists()) f.mkdirs();
            for (int i = 0; i < obj.getJSONArray("path").length(); i++) {
                key_file_padre=obj.getJSONArray("path").getJSONObject(i).getString("key");
                url+=key_file_padre+"/";
                f = new File(url);
                if(!f.exists()) f.mkdirs();
            }

            String key = UUID.randomUUID().toString();
            JSONObject file = obj.getJSONObject("data");
            file.put("key",key);
            file.put("fecha_on","now()");
            file.put("estado",1);
            file.put("tipo",0);
            file.put("key_creador",obj.getString("key_usuario"));
            file.put("observadores",new JSONArray().put(obj.getString("key_usuario")));
            file.put("posx", 0);
            file.put("posy", 0);
            if(key_file_padre.length()>0){
                file.put("key_file",key_file_padre);
            }
            Conexion.insertArray("file", new JSONArray().put(file));
            f = new File(url+key);
            if(!f.exists()) f.mkdirs();

            JSONObject file_tipo_seguimiento = new JSONObject();
            file_tipo_seguimiento.put("key",UUID.randomUUID().toString());
            file_tipo_seguimiento.put("descripcion","crear_carpeta");
            file_tipo_seguimiento.put("key_tipo_seguimiento","1");
            file_tipo_seguimiento.put("data",file.toString());
            file_tipo_seguimiento.put("key_usuario",obj.getString("key_usuario"));
            file_tipo_seguimiento.put("key_file",key);
            file_tipo_seguimiento.put("fecha","now()");
            file_tipo_seguimiento.put("estado",1);

            Conexion.insertArray("file_tipo_seguimiento", new JSONArray().put(file_tipo_seguimiento));

            JSONObject observador = new JSONObject();
            observador.put("key",UUID.randomUUID().toString());
            observador.put("descripcion","Creador");
            observador.put("tipo",1);
            observador.put("key_usuario",obj.getString("key_usuario"));
            observador.put("key_file",key);
            observador.put("fecha_on","now()");
            observador.put("estado",1);
            Conexion.insertArray("observador", new JSONArray().put(observador));
            Observador.registrarPermisos(observador, true, true, true, true, true);
            
            if(key_file_padre.length()>0){
                JSONObject observadores = Observador.getByKeyFile(key_file_padre); 
                

                for (int j = 0; j < JSONObject.getNames(observadores).length; j++) {
                    observador = observadores.getJSONObject(JSONObject.getNames(observadores)[j]);
                    if(!obj.getString("key_usuario").equals(observador.getString("key_usuario"))){
                        observador.put("key",UUID.randomUUID().toString());
                        observador.put("descripcion","invitado");
                        observador.put("tipo",2);
                        observador.put("key_file",key);
                        observador.put("key_usuario",observador.getString("key_usuario"));
                        observador.put("key_usuario_invito",obj.getString("key_usuario"));
                        observador.put("fecha_on","now()");
                        observador.put("estado",1);
                        Conexion.insertArray("observador", new JSONArray().put(observador));
                        Observador.registrarPermisos(observador, true, false, false, false, false);

                        file_tipo_seguimiento = new JSONObject();
                        file_tipo_seguimiento.put("key",UUID.randomUUID().toString());
                        file_tipo_seguimiento.put("descripcion","compartir");
                        file_tipo_seguimiento.put("data",obj.toString());
                        file_tipo_seguimiento.put("key_tipo_seguimiento","2");
                        file_tipo_seguimiento.put("key_usuario",obj.getString("key_usuario"));
                        file_tipo_seguimiento.put("key_file",file.getString("key"));
                        file_tipo_seguimiento.put("fecha","now()");
                        file_tipo_seguimiento.put("key_ref",observador.getString("key_usuario"));
                        Conexion.insertArray("file_tipo_seguimiento", new JSONArray().put(file_tipo_seguimiento));
                    }
                }
            }

            obj.put("data", file);
            obj.put("estado", "exito");
            SSServerAbstract.sendUser(obj.toString(),obj.getString("key_usuario"));
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject file = obj.getJSONObject("data");
            Conexion.editObject("file", file);
            obj.put("data", file);
            obj.put("estado", "exito");

            String consulta =  "select get_observadores('"+file.getString("key")+"') as json";
            JSONArray observadores = Conexion.ejecutarConsultaArray(consulta);

            SSServerAbstract.sendUsers(obj.toString(), observadores);
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void editarGrupo(JSONObject obj, SSSessionAbstract session) {
        JSONArray files = obj.getJSONArray("data");
        obj.put("estado", "exito");
        new editGroups(files).start();
    }

    public class editGroups extends Thread {
        JSONArray files;
        public editGroups(JSONArray files){
            this.files = files;
        }

        public void run() {
            try{
                JSONObject file;
                JSONObject obj = new JSONObject();
                obj.put("component", "file");
                obj.put("type", "editarGrupo");
                for (int i = 0; i < files.length(); i++) {
                    file = files.getJSONObject(i);
                    Conexion.editObject("file", file);   
                    obj.put("data",file);
                    String consulta =  "select get_observadores('"+file.getString("key")+"') as json";
                    JSONArray observadores = Conexion.ejecutarConsultaArray(consulta);
                    SSServerAbstract.sendUsers(obj.toString(), observadores);
                }
            }catch(Exception e){
                e.printStackTrace();
            }
        }
    
    }

    

    public void compartirRecursivo(JSONObject obj){
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());

            String consulta =  "select file_get_all_original('"+obj.getString("key_file")+"') as json";
            JSONArray files = Conexion.ejecutarConsultaArray(consulta);
            JSONObject file;
            JSONObject observador;
            JSONObject file_tipo_seguimiento;
            for (int i = 0; i < files.length(); i++) {
                file = files.getJSONObject(i);
                if(file.getInt("level")>1){
                    observador = new JSONObject();
                    observador.put("key",UUID.randomUUID().toString());
                    observador.put("key_usuario",obj.getString("key_usuario_to"));
                    observador.put("key_usuario_compartio",obj.getString("key_usuario"));
                    observador.put("descripcion","invitado");
                    observador.put("tipo",2);
                    observador.put("key_file",file.getString("key"));
                    observador.put("fecha_on",fecha_on);
                    observador.put("estado",1);
                    Conexion.insertArray("observador", new JSONArray().put(observador));

                    Observador.registrarPermisos(observador, true, false, false, false, false);

                    file_tipo_seguimiento = new JSONObject();
                    file_tipo_seguimiento.put("key",UUID.randomUUID().toString());
                    file_tipo_seguimiento.put("descripcion","compartir");
                    file_tipo_seguimiento.put("data",obj.toString());
                    file_tipo_seguimiento.put("key_tipo_seguimiento","2");
                    file_tipo_seguimiento.put("key_usuario",obj.getString("key_usuario"));
                    file_tipo_seguimiento.put("key_file",file.getString("key"));
                    file_tipo_seguimiento.put("fecha",fecha_on);
                    file_tipo_seguimiento.put("estado",1);
                    file_tipo_seguimiento.put("key_ref",obj.getString("key_usuario_to"));
                    Conexion.insertArray("file_tipo_seguimiento", new JSONArray().put(file_tipo_seguimiento));
                }
            } 
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public void compartir(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());

            JSONObject observador = new JSONObject();
            observador.put("key",UUID.randomUUID().toString());
            observador.put("key_usuario",obj.getString("key_usuario_to"));
            observador.put("key_usuario_compartio",obj.getString("key_usuario"));
            observador.put("descripcion","invitado");
            observador.put("tipo",2);
            observador.put("key_file",obj.getString("key_file"));
            observador.put("fecha_on",fecha_on);
            observador.put("estado",1);
            Conexion.insertArray("observador", new JSONArray().put(observador));

            Observador.registrarPermisos(observador, true, false, false, false, false);

            JSONObject file_tipo_seguimiento = new JSONObject();
            file_tipo_seguimiento.put("key",UUID.randomUUID().toString());
            file_tipo_seguimiento.put("descripcion","compartir");
            file_tipo_seguimiento.put("data",obj.toString());
            file_tipo_seguimiento.put("key_tipo_seguimiento","2");
            file_tipo_seguimiento.put("key_usuario",obj.getString("key_usuario"));
            file_tipo_seguimiento.put("key_file",obj.getString("key_file"));
            file_tipo_seguimiento.put("fecha",fecha_on);
            file_tipo_seguimiento.put("estado",1);
            file_tipo_seguimiento.put("key_ref",obj.getString("key_usuario_to"));
            Conexion.insertArray("file_tipo_seguimiento", new JSONArray().put(file_tipo_seguimiento));

            obj.put("component", "observadorPermiso");
            obj.put("type", "registro");
            obj.put("estado", "exito");
            obj.put("data", ObservadorPermiso.getByKey(observador));

            JSONObject observadores = Observador.getByKeyFile(obj.getString("key_file"));

            Thread th = new Thread(()->compartirRecursivo(obj));
            th.start();

            JSONObject send_seguimiento = new JSONObject();
            send_seguimiento.put("component", "fileSeguimiento");
            send_seguimiento.put("type", "registro");
            send_seguimiento.put("estado", "exito");
            send_seguimiento.put("key_file", obj.getString("key_file"));
            send_seguimiento.put("data", file_tipo_seguimiento);

            JSONObject _observador = new JSONObject();
            for (int i = 0; i < JSONObject.getNames(observadores).length; i++) {
                _observador = observadores.getJSONObject(JSONObject.getNames(observadores)[i]);
                if(!_observador.getString("key_usuario").equals(obj.getString("key_usuario"))){
                    SSServerAbstract.sendUser(obj.toString(), _observador.getString("key_usuario"));
                }
                SSServerAbstract.sendUser(send_seguimiento.toString(), _observador.getString("key_usuario"));
            }

            JSONObject _file = SFile.getByKey(obj.getString("key_file"));
            JSONObject send_file = new JSONObject();
            send_file.put("component", "file");
            send_file.put("type", "editar");
            send_file.put("estado", "exito");
            send_file.put("data", _file);
             SSServerAbstract.sendUser(send_file.toString(), obj.getString("key_usuario_to"));

            //SSServerAbstract.sendUsers(obj.toString(), observador);
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void anular(JSONObject obj, SSSessionAbstract session) {
        try {
            Conexion.anular("modulo", obj.getJSONObject("data").getString("key"));

            obj.put("estado", "exito");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subir(JSONObject obj, SSSessionAbstract session)  {
        try{
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());

            String key_file_padre =  "";
            if(obj.getJSONArray("path").length()>0){
                key_file_padre =  obj.getJSONArray("path").getJSONObject(obj.getJSONArray("path").length()-1).getString("key");    
            }
            String url = Config.getJSON().getJSONObject("files").getString("url")+obj.getString("key_usuario")+"/";
            File f = new File(url);
            if(!f.exists()) f.mkdirs();
            for (int i = 0; i < obj.getJSONArray("path").length(); i++) {
                key_file_padre=obj.getJSONArray("path").getJSONObject(i).getString("key");
                url+=key_file_padre+"/";
            }
            f = new File(url);
            if(!f.exists()) f.mkdirs();
            
            JSONArray documentos = new JSONArray();

            String filename,key;
            JSONObject file;
            JSONArray direcciones = new JSONArray();
            for(int i=0; i<obj.getJSONArray("documentos").length(); i++){
                filename = obj.getJSONArray("documentos").getString(i);
                
                key = UUID.randomUUID().toString();
                file = new JSONObject();
                file.put("key", key);
                if(key_file_padre.length()>0){
                    file.put("key_file", key_file_padre);
                }
                file.put("descripcion", filename);
                file.put("fecha_on", fecha_on);
                file.put("posx", 0);
                file.put("posy", 0);
                file.put("key_creador", obj.getString("key_usuario"));
                file.put("estado", 1);
                file.put("tipo",1);
                file.put("observadores",new JSONArray().put(obj.getString("key_usuario")));
                if(obj.has("positions")){
                    JSONArray positions = obj.getJSONArray("positions");
                    JSONObject pos = positions.getJSONObject(i);
                    file.put("posx", pos.getDouble("x"));
                    file.put("posy", pos.getDouble("y"));
                }

                Conexion.insertArray("file", new JSONArray().put(file));
                documentos.put(file);
                direcciones.put(f.getPath()+"/"+key);


                JSONObject observador = new JSONObject();
                observador.put("key",UUID.randomUUID().toString());
                observador.put("descripcion","Creador");
                observador.put("tipo",1);
                observador.put("key_usuario",obj.getString("key_usuario"));
                observador.put("key_file",key);
                observador.put("fecha_on",fecha_on);
                observador.put("estado",1);
                Conexion.insertArray("observador", new JSONArray().put(observador));
                Observador.registrarPermisos(observador, true, true, true, true, true);

                JSONObject file_tipo_seguimiento = new JSONObject();
                file_tipo_seguimiento.put("key",UUID.randomUUID().toString());
                file_tipo_seguimiento.put("key_tipo_seguimiento","1");
                file_tipo_seguimiento.put("descripcion","crear_file");
                file_tipo_seguimiento.put("data",file.toString());
                file_tipo_seguimiento.put("key_usuario",obj.getString("key_usuario"));
                file_tipo_seguimiento.put("key_file",key);
                file_tipo_seguimiento.put("fecha","now()");
                file_tipo_seguimiento.put("estado",1);

                Conexion.insertArray("file_tipo_seguimiento", new JSONArray().put(file_tipo_seguimiento));

                if(key_file_padre.length()>0){
                    file.put("key_file",key_file_padre);
                    JSONObject observadores = Observador.getByKeyFile(key_file_padre); 

                    for (int j = 0; j < JSONObject.getNames(observadores).length; j++) {
                        observador = observadores.getJSONObject(JSONObject.getNames(observadores)[j]);
                        if(!obj.getString("key_usuario").equals(observador.getString("key_usuario"))){
                            observador.put("key",UUID.randomUUID().toString());
                            observador.put("descripcion","invitado");
                            observador.put("tipo",2);
                            observador.put("key_file",key);
                            observador.put("key_usuario_invito",obj.getString("key_usuario"));
                            observador.put("fecha_on",fecha_on);
                            observador.put("estado",1);
                            Conexion.insertArray("observador", new JSONArray().put(observador));
                            Observador.registrarPermisos(observador, true, false, false, false, false);

                            file_tipo_seguimiento = new JSONObject();
                            file_tipo_seguimiento.put("key",UUID.randomUUID().toString());
                            file_tipo_seguimiento.put("descripcion","compartir");
                            file_tipo_seguimiento.put("data",obj.toString());
                            file_tipo_seguimiento.put("key_tipo_seguimiento","2");
                            file_tipo_seguimiento.put("key_usuario",obj.getString("key_usuario"));
                            file_tipo_seguimiento.put("key_file",file.getString("key"));
                            file_tipo_seguimiento.put("fecha",fecha_on);
                            file_tipo_seguimiento.put("estado",1);
                            file_tipo_seguimiento.put("key_ref",observador.getString("key_usuario"));
                            Conexion.insertArray("file_tipo_seguimiento", new JSONArray().put(file_tipo_seguimiento));
                        }
                    }
                }
            }
            obj.put("dirs", direcciones);
            obj.put("estado", "exito");
            obj.put("data", documentos);
            
            SSServerAbstract.sendUser(obj.toString(),obj.getString("key_usuario"));
            //SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        }catch(Exception e){ 
            e.printStackTrace();
        }
    }

    public static File createOriginalZipFiles(String key_usuario, String key_file, String url_temp, String raiz){
        try{
            
            String url = raiz+"/";
            String url_init = "";
            File f = new File(url_temp);
            if(!f.exists()) f.mkdirs();

            // Consultamos recursivamente el path real y el path original
            String consulta =  "select file_get_all_original('"+key_file+"') as json";
            JSONArray files = Conexion.ejecutarConsultaArray(consulta);
            JSONObject file;
            File temp_file;
            FileInputStream in;
            // creamos el directorio
            for (int i = 0; i < files.length(); i++) {
                file = files.getJSONObject(i);
                if(url_init.length()==0){
                    url_init = url_temp + file.getString("path_real");
                }
                if(file.getInt("tipo")==0){
                    // folder
                    f = new File(url_temp + file.getString("path_real"));
                    if(!f.exists()) f.mkdirs();
                }else{
                    // file
                    f = new File(url + file.getString("path"));
                    temp_file = new File(url_temp + file.getString("path_real"));

                    in = new FileInputStream(f);
                    try (FileOutputStream outputStream = new FileOutputStream(temp_file, false)) {
                        int read;
                        byte[] bytes = new byte[8192];
                        while ((read = in.read(bytes)) != -1) {
                            outputStream.write(bytes, 0, read);
                        }
                        outputStream.close();
                    }
                }
                System.out.println(file.getString("path_real"));
            } 

            // comprimimos el directorio en zip
            ZipDir.run(url_init);

            // obtiene el file
            File insfsdf = new File(url_init+".zip");
            
            // eliminamos el directorio
            //FileUtils.deleteDirectory(new File(url_temp));

            return insfsdf;
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }    
}