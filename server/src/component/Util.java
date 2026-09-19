package component;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.UserDefinedFileAttributeView;

import org.json.JSONObject;

import Servisofts.SUtil;

public class Util {

    public static String getStringJSONObject(JSONObject obj, String key) {
        if(obj == null || obj.isEmpty()) {
            return null;
        }

        if(obj.has(key) && !obj.isNull(key)) {
            return obj.getString(key);
        }

        return null;
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
