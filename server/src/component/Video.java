package component;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributeView;
import java.nio.file.attribute.UserDefinedFileAttributeView;

import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConfig;
import Servisofts.SPGConect;
import Servisofts.SUtil;

public class Video {
    public static final String COMPONENT = "video";

    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "analizar":
                analizar(obj, session);
                break;
            case "get_analisis":
                get_analisis(obj, session);
                break;

        }
    }

    public static JSONObject get_analisis(JSONObject obj, SSSessionAbstract session) {
        try {
            String path_file = SConfig.getJSON("files").getString("url") + obj.getString("path_file");
            String key = getFileKey(path_file);
            JSONObject data= SPGConect.ejecutarConsultaObject("SELECT to_json(analisis.*) json FROM analisis WHERE key = '" + key + "'");
            obj.put("data", data);
            obj.put("estado", "exito");
            return null;
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
            return null;
        }
    }

    public static JSONObject analizar(JSONObject obj, SSSessionAbstract session) {
        try {
            String path = obj.getString("path");
            String path_file = SConfig.getJSON("files").getString("url") + obj.getString("path_file");

            String key = getFileKey(path_file);
            if (key == null) {
                obj.put("estado", "error");
                obj.put("message", "Archivo no encontrado");
                return obj;
            }
            obj.put("key", key);

            URL url = new URL(SConfig.getJSON("analisis_video").getString("host") + "/analizar");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");
            con.setDoOutput(true);

            JSONObject body = new JSONObject();
            body.put("video_url", path);
            byte[] bodyBytes = body.toString().getBytes(StandardCharsets.UTF_8);

            try (OutputStream os = con.getOutputStream()) {
                os.write(bodyBytes);
            }

            int statusCode = con.getResponseCode();
            InputStream is = (statusCode >= 200 && statusCode < 300)
                    ? con.getInputStream()
                    : con.getErrorStream();

            String responseStr = new String(is.readAllBytes(), StandardCharsets.UTF_8);
            System.out.println("Respuesta (" + statusCode + "): " + responseStr);
            JSONObject response = new JSONObject(responseStr);
            SPGConect.ejecutarUpdate("DELETE FROM analisis WHERE key = '" + key + "'");
            SPGConect.insertObject("analisis", new JSONObject()
                    .put("key", key)
                    .put("fecha_on", SUtil.now())
                    .put("estado", 1)
                    .put("transcripcion", response.getString("transcripcion"))
                    .put("resumen", response.getString("resumen")));

            obj.put("data", response);
            obj.put("estado", "exito");
            return obj;
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
            return null;
        }
    }

    public static String getFileKey(String path_file) throws Exception {
        Path pathObj = Path.of(path_file);

        if (!Files.exists(pathObj)) {
            return null;
        }
        // Path pathObj = Path.of(path_file);
        UserDefinedFileAttributeView view = Files.getFileAttributeView(
                pathObj,
                UserDefinedFileAttributeView.class);

        for (String name : view.list()) {
            if (name.equals("key")) {
                ByteBuffer buffer = ByteBuffer.allocate(view.size(name));
                view.read(name, buffer);
                buffer.flip();
                return Charset.defaultCharset().decode(buffer).toString();
            }
        }

        // No tiene key, generar y guardar
        String newKey = SUtil.uuid();
        view.write("key", ByteBuffer.wrap(newKey.getBytes(StandardCharsets.UTF_8)));
        System.out.println("key generada y guardada: " + newKey);
        return newKey;
    }

    public static String findFileByKey(String key, String folderPath) throws Exception {
        Path folder = Path.of(folderPath);
        try (var stream = Files.walk(folder)) {
            return stream
                    .filter(Files::isRegularFile)
                    .filter(p -> {
                        try {
                            UserDefinedFileAttributeView view = Files.getFileAttributeView(
                                    p, UserDefinedFileAttributeView.class);
                            if (!view.list().contains("key")) return false;
                            ByteBuffer buffer = ByteBuffer.allocate(view.size("key"));
                            view.read("key", buffer);
                            buffer.flip();
                            return key.equals(Charset.defaultCharset().decode(buffer).toString());
                        } catch (Exception e) {
                            return false;
                        }
                    })
                    .map(Path::toString)
                    .findFirst()
                    .orElse(null);
        }
    }
}

    
