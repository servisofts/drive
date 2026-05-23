import Servisofts.SConsole;

import org.json.JSONObject;

import component.File;
import component.FirebaseToken;
import component.NotificationTask;
import component.Video;
import Server.SSSAbstract.SSSessionAbstract;

public class Manejador {
    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        if (session != null) {
            SConsole.log(session.getIdSession(), "\t|\t", obj.getString("component"), obj.getString("type"));
        } else {
            SConsole.log("NoSocketSession", "\t|\t", obj.getString("component"), obj.getString("type"));
        }
        if (obj.isNull("component")) {
            return;
        }
        
        switch (obj.getString("component")) {
            case File.COMPONENT: File.onMessage(obj, session); break;
            case FirebaseToken.COMPONENT: FirebaseToken.onMessage(obj, session); break;
            case NotificationTask.COMPONENT: NotificationTask.onMessage(obj, session); break;
            case Video.COMPONENT: Video.onMessage(obj, session); break;
        }
    }
}
