package ServerHttp;

import java.net.URI;
import util.console;

import org.apache.commons.io.FileUtils;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;

import Config.Config;
import java.util.List;
import util.FilesManager;

import org.json.JSONArray;
import org.json.JSONObject;

import component.Documento;
import component.Manejador;
import component.SFile;
import conexion.Conexion;
import io.undertow.util.NetworkUtils;

import java.nio.file.Files;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.nio.file.Paths;
import java.io.OutputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.net.InetSocketAddress;
import java.io.UnsupportedEncodingException;
import org.apache.commons.fileupload.FileItem;
import org.jboss.com.sun.net.httpserver.Headers;
import org.jboss.com.sun.net.httpserver.HttpServer;
import org.apache.commons.fileupload.RequestContext;
import org.jboss.com.sun.net.httpserver.HttpContext;
import java.nio.file.attribute.PosixFilePermissions;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.jboss.com.sun.net.httpserver.HttpExchange;
import org.jboss.com.sun.net.httpserver.HttpPrincipal;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class ServerHttp {

    public static void Start(int puerto) {
        HttpServer server;
        try {
            console.log(console.ANSI_YELLOW, "** Iniciando HTTP-SERVER " + Config.getJSON().getString("ss") + " en el puerto " + puerto + " **");
            server = HttpServer.create(new InetSocketAddress(puerto), 0);
            //Instaciamos servlet de imagenes
            HttpContext context = server.createContext("/");
            HttpContext contextMultipar = server.createContext("/multipart");
            context.setHandler(ServerHttp::handleRequest);
            //Instaciamos servlet mannejador
            HttpContext contextManejador = server.createContext("/manejador");
            contextManejador.setHandler(HandleRequestManejador::handle);
            contextMultipar.setHandler(ServerHttp::handleRequestMultipart);
            server.start();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }

    private static void handleRequestMultipart(HttpExchange t) throws IOException {
        for (java.util.Map.Entry<String, List<String>> header : t.getRequestHeaders().entrySet()) {
            System.out.println(header.getKey() + ": " + header.getValue().get(0));
        }
        DiskFileItemFactory d = new DiskFileItemFactory();

        try {
            ServletFileUpload up = new ServletFileUpload(d);
            List<FileItem> result = up.parseRequest(new RequestContext() {

                @Override
                public String getCharacterEncoding() {
                    return "UTF-8";
                }

                @Override
                public int getContentLength() {
                    return this.getContentLength();
                }

                @Override
                public String getContentType() {
                    return t.getRequestHeaders().getFirst("Content-type");
                }

                @Override
                public InputStream getInputStream() throws IOException {
                    return t.getRequestBody();
                }

            });
            t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            t.getResponseHeaders().add("Content-type", "text/plain");
            t.sendResponseHeaders(200, 0);
            
        if (t.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            t.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
            t.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
            t.sendResponseHeaders(204, -1);
            return;
        }

            
            String data = "";
            InputStream file = null;
            String nombre="";
            List<Documento> documentos = new ArrayList<>();
            JSONArray docs = new JSONArray();
            for (FileItem fi : result) {
                switch (fi.getFieldName()) {
                    case "file":
                        nombre = fi.getName();
                        file = fi.getInputStream();
                        documentos.add(new Documento(nombre, file));
                        docs.put(nombre);
                        break;
                    case "data":
                        data = fi.getString();
                        break;
                }
            }

            
            JSONObject obj = new JSONObject(data);
            obj.put("documentos",docs);
            new Manejador(obj, null);
            if (obj.getString("estado").equals("exito")) {
                /*
                Roy Ruddy Paz Demiquel 14 05 2021
                No te olvides de setear la variable dir en tu type de subida para que guarden los documentos
                */
                if (obj.has("dirs")) {
                    File aux;
                    
                    for (int i = 0; i < documentos.size(); i++) {
                        aux = new File(obj.getJSONArray("dirs").getString(i));
                        copyInputStreamToFile(documentos.get(i).getFile(), aux);
                        switch(obj.getString("component")){
                            case "SFile":
                                obj.getJSONArray("data").getJSONObject(i).put("tamano", aux.length()+"");
                                Conexion.editObject("file", obj.getJSONArray("data").getJSONObject(i));   
                            break;
                            case "file":
                                obj.getJSONArray("data").getJSONObject(i).put("tamano", aux.length()+"");
                                Conexion.editObject("file", obj.getJSONArray("data").getJSONObject(i));   
                            break;
                        }
                    }
                }
            }
            t.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String defaultOrigin(HttpExchange exchange) {
        String host = NetworkUtils.formatPossibleIpv6Address(exchange.getRemoteAddress().getHostName());
        String protocol = "http";
        int port = exchange.getRemoteAddress().getPort();
        //This browser set header should not need IPv6 escaping
        StringBuilder allowedOrigin = new StringBuilder(256);
        allowedOrigin.append(protocol).append("://").append(host);
        if (!isDefaultPort(port, protocol)) {
            allowedOrigin.append(':').append(port);
        }
        return allowedOrigin.toString();
    }
    private static boolean isDefaultPort(int port, String protocol) {
        return (("http".equals(protocol) && 80 == port) || ("https".equals(protocol) && 443 == port));
    }
    private static void handleRequest(HttpExchange exchange) throws IOException {

       // String origin = defaultOrigin(exchange);
      //  exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://drive.servisofts.com");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "*");
        //List<String> header = exchange.getRequestHeaders().get("key_usuario");
        //System.out.println(origin);
        String ruta = Config.getJSON("files").getString("url");
        String ruta2 = Config.getJSON("files").getString("url");
        URI requestURI = exchange.getRequestURI();
        String path  = requestURI.getPath().replaceAll("/", "");

        String key_usuario = "";

            if(requestURI.getQuery()!=null){
                String param = requestURI.getQuery().split("&")[0];
                if(param != null){
                    if(param.split("=")[0].equals("key_usuario")){
                        key_usuario =param.split("=")[1]; 
                    }
                }
            }
            

        String arrPartes[]= path.split("\\.");
        String extension = ""; 
        String extensionFinal =path;
        if(arrPartes.length>1){
            System.out.println("Existe estencion");    
            path=arrPartes[0];
            extension = arrPartes[1];
        }
        JSONObject elFile = null;
        try{
            String consulta = "select get_file_path_invertido('"+path+"') as json";
            JSONArray files = Conexion.ejecutarConsultaArray(consulta);
            if(files.length()>0){

                consulta = "select file_get_by_key('"+files.getJSONObject(0).optString("key")+"') as json";
                elFile = Conexion.ejecutarConsultaObject(consulta);
                //elFile = elFile.getJSONObject(JSONObject.getNames(elFile)[0]);

                consulta = "select get_file_key_creador('"+path+"') as json";
                PreparedStatement ps = Conexion.preparedStatement(consulta);
                ResultSet rs = ps.executeQuery();
                String key_creador = rs.next()?rs.getString("json"):"";
                rs.close();
                ps.close();

                ruta+=key_creador;
                ruta2+=key_creador;
                String key_file="";
                for ( int i = files.length()-1; i >= 0; i--) {
                    key_file = files.getJSONObject(i).getString("key");
                    ruta += "/"+key_file;
                    if(i >= 1){
                        ruta2 += "/"+key_file;
                    }
                }
                

                if(key_usuario.length()>0){
                    JSONObject file_tipo_seguimiento = new JSONObject();
                    file_tipo_seguimiento.put("key",UUID.randomUUID().toString());
                    file_tipo_seguimiento.put("key_tipo_seguimiento","2");
                    file_tipo_seguimiento.put("descripcion","ver_file");
                    file_tipo_seguimiento.put("data",ruta);
                    file_tipo_seguimiento.put("key_usuario",key_usuario);
                    file_tipo_seguimiento.put("key_file",key_file);
                    file_tipo_seguimiento.put("fecha","now()");
                    file_tipo_seguimiento.put("estado",1);
                    Conexion.insertArray("file_tipo_seguimiento", new JSONArray().put(file_tipo_seguimiento));
                }
            }else{
                ruta += "usuario/"+path;
            }

        }catch(Exception e){
            e.printStackTrace();
        }

        String url_temp = Config.getJSON().getJSONObject("files").getString("url")+"temp/"+UUID.randomUUID().toString()+"/";
        File file = null;
        if(elFile!=null){
            if(elFile.getInt("tipo")==1){
                file = new File (ruta);    
            }else{
                if(key_usuario.length()>0){
                    file = SFile.createOriginalZipFiles(key_usuario, elFile.getString("key"), url_temp, ruta2);
                }       
            }

        }else{
            file = new File (ruta);
        }
        

        if(file == null || !file.exists()){
            file = new File("./default.png");
        }
        byte [] bytearray  = new byte [(int)file.length()];
        FileInputStream fis = new FileInputStream(file);
        BufferedInputStream bis = new BufferedInputStream(fis);
        bis.read(bytearray, 0, bytearray.length);
        
        exchange.sendResponseHeaders(200, file.length());
        OutputStream os = exchange.getResponseBody();
        os.write(bytearray,0,bytearray.length);
        os.close();
        FileUtils.deleteDirectory(new File(url_temp)); 
    }

    private static void copyInputStreamToFile(InputStream inputStream, File file) throws IOException {

        // append = false
        try (FileOutputStream outputStream = new FileOutputStream(file, false)) {
            int read;
            byte[] bytes = new byte[8192];
            while ((read = inputStream.read(bytes)) != -1) {
                outputStream.write(bytes, 0, read);
            }
            System.out.println("Imagen insertada con exito: " + file.getAbsolutePath());
            outputStream.close();
        }

    }

    public static Map<String, String> splitQuery(String query) throws UnsupportedEncodingException {
        Map<String, String> query_pairs = new LinkedHashMap<String, String>();

        String[] pairs = query.split("&");
        for (String pair : pairs) {
            int idx = pair.indexOf("=");
            query_pairs.put(URLDecoder.decode(pair.substring(0, idx), "UTF-8"),
                    URLDecoder.decode(pair.substring(idx + 1), "UTF-8"));
        }
        return query_pairs;
    }

    private static void printRequestInfo(HttpExchange exchange) {
        System.out.println("-- headers --");
        Headers requestHeaders = exchange.getRequestHeaders();
        requestHeaders.entrySet().forEach(System.out::println);

        System.out.println("-- principle --");
        HttpPrincipal principal = exchange.getPrincipal();
        System.out.println(principal);

        System.out.println("-- HTTP method --");
        String requestMethod = exchange.getRequestMethod();
        System.out.println(requestMethod);

        System.out.println("-- query --");
        URI requestURI = exchange.getRequestURI();
        String query = requestURI.getQuery();
        System.out.println(query);
    }
   

}