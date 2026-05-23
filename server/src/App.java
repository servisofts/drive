import ServerHttp.ServerHttp;
import ServerHttp.Uploadv2;
import Servisofts.Servisofts;
import controllers.UploadFIleController;
import controllers.VideoThumbnailController;

/**
 * Hello world!
 *
 */

public class App {
    public static void main(String[] args) {
        try {
            Servisofts.ManejadorCliente = ManejadorCliente::onMessage;
            Servisofts.Manejador = Manejador::onMessage;
            ServerHttp.addContext("/subir", new UploadFIleController());
            ServerHttp.addContext("/thumbnail", new VideoThumbnailController());
            Servisofts.DEBUG = false;
            Servisofts.initialize();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}