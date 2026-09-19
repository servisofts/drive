package component;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

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
            String key = Util.getFileKey(path_file);
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

            String key = Util.getFileKey(path_file);
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

}

    
