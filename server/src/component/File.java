package component;

import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.BasicFileAttributes;

import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConfig;
import Servisofts.SPGConect;
import Servisofts.SUtil;

public class File {
    public static final String COMPONENT = "file";

    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "getAll":
                getAll(obj, session);
                break;
            case "get":
                get(obj, session);
                break;
            case "ls":
                ls(obj, session);
                break;
            case "lsr":
                lsr(obj, session);
                break;
            case "mkdir":
                mkdir(obj, session);
                break;
            case "rm":
                rm(obj, session);
                break;
            case "mv":
                mv(obj, session);
                break;
            case "video_trim":
                video_trim(obj, session);
                break;
            case "registro":
                registro(obj, session);
                break;
            case "editar":
                editar(obj, session);
                break;
            case "papelera":
                papelera(obj, session);
                break;
        }
    }

    public static JSONObject getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_all('" + COMPONENT + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
            return data;
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
            return null;
        }
    }

    public static JSONArray ls(JSONObject obj, SSSessionAbstract session) {
        try {

            // Especifica la ruta que deseas listar
            String path = SConfig.getJSON("files").getString("url") + obj.getString("path");

            // Crea un objeto File con la ruta especificada
            java.io.File directory = new java.io.File(path);

            JSONArray arr = new JSONArray();
            // Verifica si la ruta es un directorio
            if (directory.isDirectory()) {
                // Obtiene una lista de todos los archivos y carpetas en la ruta
                java.io.File[] filesList = directory.listFiles();

                if (filesList != null) {
                    for (java.io.File file : filesList) {
                        // Muestra el nombre y el tipo (archivo o directorio)
                        JSONObject f = new JSONObject();
                        if (file.isFile()) {
                            f.put("name", file.getName());
                            f.put("type", getMimeType(file));
                            f.put("size", file.length());
                            f.put("lastModified", file.lastModified());
                            // System.out.println("Archivo: " + file.getName());
                        } else if (file.isDirectory()) {
                            f.put("name", file.getName());
                            f.put("type", "directory");
                            f.put("lastModified", file.lastModified());
                            // System.out.println("Carpeta: " + file.getName());
                        }
                        arr.put(f);
                    }
                } else {
                    throw new Exception("La ruta especificada no contiene archivos ni carpetas.");

                }
            } else {
                throw new Exception("La ruta especificada no es un directorio.");
            }
            String consulta = "select get_all('" + COMPONENT + "') as json";
            obj.put("data", arr);
            obj.put("estado", "exito");
            return arr;
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    public static JSONArray lsr(JSONObject obj, SSSessionAbstract session) {
        try {

            // Especifica la ruta que deseas listar
            String path = SConfig.getJSON("files").getString("url") + obj.getString("path");

            // Crea un objeto File con la ruta especificada
            java.io.File directory = new java.io.File(path);

            JSONArray arr = new JSONArray();
            executeLsr(directory, arr);

            obj.put("data", arr);
            obj.put("estado", "exito");
            return arr;
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    public static void executeLsr(java.io.File directory, JSONArray arr) throws Exception {
        String pathRoot = SConfig.getJSON("files").getString("url");
        // java.io.File directory = new java.io.File(path);

        // JSONArray arr = new JSONArray();
        // Verifica si la ruta es un directorio
        if (directory.isDirectory()) {
            // Obtiene una lista de todos los archivos y carpetas en la ruta
            java.io.File[] filesList = directory.listFiles();

            if (filesList != null) {
                for (java.io.File file : filesList) {
                    // Muestra el nombre y el tipo (archivo o directorio)
                    JSONObject f = new JSONObject();
                    f.put("path", "/" + file.getPath().substring(pathRoot.length()));
                    f.put("name", file.getName());
                    f.put("lastModified", file.lastModified());

                    if (file.isFile()) {
                        try {
                            f.put("type", getMimeType(file));
                        } catch (Exception e1) {
                        }
                        f.put("size", file.length());
                        arr.put(f);
                        // System.out.println("Archivo: " + file.getName());
                    } else if (file.isDirectory()) {
                        f.put("type", "directory");
                        arr.put(f);
                        executeLsr(file, arr);
                        // System.out.println("Carpeta: " + file.getName());
                    }
                }
            }
        } else {
            throw new Exception("La ruta especificada no es un directorio.");
        }
    }

    public static JSONObject get(JSONObject obj, SSSessionAbstract session) {
        try {

            // Especifica la ruta que deseas listar
            String path = SConfig.getJSON("files").getString("url") + obj.getString("path");

            // Crea un objeto File con la ruta especificada
            java.io.File file = new java.io.File(path);
            JSONObject f = new JSONObject();
            // Verifica si la ruta es un directorio
            // Obtiene una lista de todos los archivos y carpetas en la ruta

            if (file.exists()) {
                // Muestra el nombre y el tipo (archivo o directorio)

                if (file.isFile()) {
                    f.put("name", file.getName());
                    f.put("type", getMimeType(file));
                    f.put("size", file.length());
                    f.put("lastModified", file.lastModified());
                    // System.out.println("Archivo: " + file.getName());
                } else if (file.isDirectory()) {
                    f.put("name", file.getName());
                    f.put("type", "directory");
                    f.put("lastModified", file.lastModified());
                    // System.out.println("Carpeta: " + file.getName());
                }
            } else {
                throw new Exception("La ruta especificada no contiene archivos ni carpetas.");

            }

            // String consulta = "select get_all('" + COMPONENT + "') as json";
            obj.put("data", f);
            obj.put("estado", "exito");
            return f;
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    public static void mkdir(JSONObject obj, SSSessionAbstract session) {
        try {
            // Obtén la ruta del directorio a crear desde el objeto JSON
            String path = SConfig.getJSON("files").getString("url") + obj.getString("path");

            // Crea un objeto Path a partir de la ruta
            Path directory = Paths.get(path);

            // Verifica si el directorio ya existe
            if (Files.exists(directory)) {
                obj.put("estado", "error");
                obj.put("error", "El directorio ya existe.");
            } else {
                // Intenta crear el directorio
                Files.createDirectories(directory);
                obj.put("estado", "exito");
            }
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
            e.printStackTrace();
        }
    }

    public static void deleteDirectory(Path path) throws IOException {
        Files.walkFileTree(path, new SimpleFileVisitor<Path>() {
            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                Files.delete(file);
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
                Files.delete(dir);
                return FileVisitResult.CONTINUE;
            }
        });
    }

    public static void rm(JSONObject obj, SSSessionAbstract session) {
        try {
            // Obtén la ruta del directorio a crear desde el objeto JSON
            String path = SConfig.getJSON("files").getString("url") + obj.getString("path");

            // Crea un objeto Path a partir de la ruta
            Path directory = Paths.get(path);

            // Verifica si el directorio ya existe
            if (Files.exists(directory)) {
                deleteDirectory(directory);
                obj.put("estado", "exito");
            } else {

                obj.put("error", "No existe el archivo");
                obj.put("estado", "error");
            }
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
            e.printStackTrace();
        }
    }

    public static void mv(JSONObject obj, SSSessionAbstract session) {
        try {
            // Obtén la ruta del directorio a crear desde el objeto JSON
            String path = SConfig.getJSON("files").getString("url") + obj.getString("path");

            String path_to = SConfig.getJSON("files").getString("url") + obj.getString("path_to");

            // Crea un objeto Path a partir de la ruta
            Path directory = Paths.get(path);
            Path directory_to = Paths.get(path_to);

            // Verifica si el directorio ya existe
            if (Files.exists(directory)) {
                Files.move(directory, directory_to, StandardCopyOption.REPLACE_EXISTING);
                obj.put("estado", "exito");
            } else {

                obj.put("error", "No existe el archivo");
                obj.put("estado", "error");
            }
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
            e.printStackTrace();
        }
    }

    public static void video_trim(JSONObject obj, SSSessionAbstract session) {
        try {
            String path = SConfig.getJSON("files").getString("url") + obj.getString("path");

            String path_to = SConfig.getJSON("files").getString("url") + obj.getString("path_to");

            int startSec = obj.optInt("startSec", 0);
            int endSec = obj.optInt("endSec", 0);
            int crf = obj.optInt("crf", 23);

            if (path_to.equals(path)) {
                int dotIndex = path_to.lastIndexOf('.');
                String base = dotIndex >= 0 ? path_to.substring(0, dotIndex) : path_to;
                String ext = dotIndex >= 0 ? path_to.substring(dotIndex) : "";
                String candidate = base + " ( copy )" + ext;
                int counter = 2;
                while (Files.exists(Paths.get(candidate))) {
                    candidate = base + " ( copy " + counter + " )" + ext;
                    counter++;
                }
                path_to = candidate;
            }

            // Crea un objeto Path a partir de la ruta
            Path directory = Paths.get(path);
            Path directory_to = Paths.get(path_to);

            String command = "ffmpeg -i \"" + path + "\" -ss " + startSec + " -to " + endSec + " -c:v libx264 -crf " + crf + " -c:a copy \"" + path_to + "\"";
            System.out.println(command);
            ProcessBuilder pb = new ProcessBuilder(
                "ffmpeg", "-i", path,
                "-ss", String.valueOf(startSec),
                "-to", String.valueOf(endSec),
                "-c:v", "libx264",
                "-crf", String.valueOf(crf),
                "-c:a", "copy",
                path_to
            );
            Process process = pb.start();
            new Thread(() -> {
                try (java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()))) {
                    String line;
                    while ((line = reader.readLine()) != null) System.out.println("[ffmpeg stdout] " + line);
                } catch (IOException e) { e.printStackTrace(); }
            }).start();
            new Thread(() -> {
                try (java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getErrorStream()))) {
                    String line;
                    while ((line = reader.readLine()) != null) System.out.println("[ffmpeg stderr] " + line);
                } catch (IOException e) { e.printStackTrace(); }
            }).start();
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                obj.put("estado", "exito");
            } else {
                obj.put("error", "Error al ejecutar ffmpeg. Código de salida: " + exitCode);
                obj.put("estado", "error");
            }   
            // Verifica si el directorio ya existe
            // if (Files.exists(directory)) {
            // Files.move(directory, directory_to, StandardCopyOption.REPLACE_EXISTING);
            // obj.put("estado", "exito");
            // } else {

            // obj.put("error", "No existe el archivo");
            // obj.put("estado", "error");
            // }
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
            e.printStackTrace();
        }
    }

    public static void papelera(JSONObject obj, SSSessionAbstract session) {
        try {
            // Obtén la ruta del directorio a crear desde el objeto JSON
            String path = SConfig.getJSON("files").getString("url") + obj.getString("path");

            String path_to = SConfig.getJSON("files").getString("url") + ".trash";

            // Crea un objeto Path a partir de la ruta
            Path directory = Paths.get(path);
            Path directory_to = Paths.get(path_to);

            if (!Files.exists(directory_to)) {
                Files.createDirectories(directory_to);
            }

            // Verifica si el directorio ya existe
            if (Files.exists(directory)) {
                java.io.File f = new java.io.File(path);
                path_to = path_to + "/" + f.getName();
                directory_to = Paths.get(path_to);
                Files.move(directory, directory_to, StandardCopyOption.REPLACE_EXISTING);
                obj.put("estado", "exito");
            } else {

                obj.put("error", "No existe el archivo");
                obj.put("estado", "error");
            }
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
            e.printStackTrace();
        }
    }

    public static String getMimeType(java.io.File file) throws IOException {
        Path path = Paths.get(file.getAbsolutePath());
        return Files.probeContentType(path);
    }

    public static JSONObject getByKey(String key) {
        try {
            String consulta = "select get_by('" + COMPONENT + "', 'key', '" + key + "') as json";
            return SPGConect.ejecutarConsultaObject(consulta);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            if (!data.has("key") || data.isNull("key")) {
                data.put("key", SUtil.uuid());
            }
            data.put("estado", 1);
            data.put("fecha_on", SUtil.now());
            data.put("key_usuario", obj.getString("key_usuario"));
            SPGConect.insertArray(COMPONENT, new JSONArray().put(data));
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            SPGConect.editObject(COMPONENT, data);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }
}
