package component;

import org.json.JSONArray;
import org.json.JSONObject;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SPGConect;
import Servisofts.SUtil;

public class NotificationTask {
    
    public static final String COMPONENT = "notification_task";

    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "getAll":
                getAll(obj, session);
                break;
            case "registro":
                registro(obj, session);
                break;
            case "editar":
                editar(obj, session);
                break;
        }
    }

    public static void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String key_servicio = obj.has("key_servicio") ? obj.getString("key_servicio") : obj.getJSONObject("servicio").getString("key");
            String consulta = "select get_all('" + COMPONENT + "', 'key_servicio', '" + key_servicio + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }


    public static void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            data.put("key", SUtil.uuid());
            data.put("estado", 1);
            data.put("fecha_on", SUtil.now());
            data.put("key_usuario", obj.getString("key_usuario"));
            if(obj.has("servicio")){
                data.put("key_servicio", obj.getJSONObject("servicio").getString("key"));
                JSONObject servicio = new JSONObject();
                servicio.put("key", obj.getJSONObject("servicio").getString("key"));
                data.getJSONObject("notification").put("servicio", servicio);
            }
            SPGConect.insertArray(COMPONENT, new JSONArray().put(data));
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }


    public static void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            if(obj.has("servicio")){
                data.put("key_servicio", obj.getJSONObject("servicio").getString("key"));
                JSONObject servicio = new JSONObject();
                servicio.put("key", obj.getJSONObject("servicio").getString("key"));
                data.getJSONObject("notification").put("servicio", servicio);
            }
            SPGConect.editObject(COMPONENT, data);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

}
