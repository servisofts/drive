package util;

import java.io.FileReader;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.json.JSONException;
import org.json.JSONObject;

public class RegistroUsuario extends Thread {

    /*
     * asunto para pass
     */
    private JSONObject data;

    private static final String EmailFrom = "servisofts.srl@gmail.com";
    private static final String PassFrom = "servisofts123.";

    private static final String PathFile = "emails/RegistroUsuario.html";

    public RegistroUsuario(JSONObject data) {
        this.data = data;
    }

    
	public static void main(String[] args) {
        JSONObject obj = new JSONObject();
        obj.put("correo", "eduardol47@gmail.com"); //este paremetro es obligatorio por que es el correo al q se va a enviar 
        obj.put("pass", "ABDBSC");
        //se envia
        new RegistroUsuario(obj).start();
    }

    private static String getHtml(JSONObject data) throws JSONException {
        String cuerpo = "";
            try {
                    FileReader file;
                    file = new FileReader(PathFile);
                    int valor = file.read();
                    String configJson = "";
                    while (valor != -1) {
                        configJson = String.valueOf(((char) valor));
                        cuerpo = cuerpo + configJson;
                        valor = file.read();
                    }
                    file.close();

                    //parametros que se van a remplasar
                    cuerpo = cuerpo.replaceAll("usuarioServisofts",data.getString("correo"));
                    cuerpo = cuerpo.replaceAll("passServisofts",data.getString("pass"));


            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
          
        return cuerpo;
    }

    @Override
    public void run() {
        try {
            Properties props = new Properties();
            // Nombre del host de correo, es smtp.gmail.com
            props.setProperty("mail.smtp.host", "smtp.gmail.com");
            // TLS si está disponible
            // props.setProperty("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.ssl.enable", "true");
            // Puerto de gmail para envio de correos
            props.setProperty("mail.smtp.port", "465");
            // Nombre del usuario
            props.setProperty("mail.smtp.user", EmailFrom);
            // Si requiere o no usuario y password para conectarse.
            props.setProperty("mail.smtp.auth", "true");
            Session session = Session.getDefaultInstance(props);
            // session.setDebug(true);
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(EmailFrom));
            // message.addRecipient(Message.RecipientType.TO, new
            // InternetAddress(data.getString("E")));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(data.getString("correo")));
            message.setSubject("Registro de usuario.");
            message.setContent(getHtml(data), "text/html");
            Transport t = session.getTransport("smtp");
            t.connect(EmailFrom,PassFrom);
            t.sendMessage(message, message.getAllRecipients());
            t.close();
            System.out.println("Correo enviado a "+data.getString("correo"));
        } catch (Exception ex) {
            // Logger.getLogger(Email.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
   
}
