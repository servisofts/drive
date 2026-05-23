package controllers;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

import org.jboss.com.sun.net.httpserver.HttpExchange;
import org.jboss.com.sun.net.httpserver.HttpHandler;

import Servisofts.SConfig;

public class VideoThumbnailController implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET,OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "*");
            exchange.sendResponseHeaders(200, 0);
            return;
        }

        if (!"GET".equals(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(405, -1);
            return;
        }

        try {
            // Parse URI: /thumbnail/serp/uuid/file.mov?ms=5000
            String rawPath = exchange.getRequestURI().getRawPath();
            String query = exchange.getRequestURI().getRawQuery();

            // Strip the context prefix "/thumbnail"
            String filePart = rawPath.replaceFirst("^/thumbnail", "");
            String decodedFilePath = URLDecoder.decode(filePart, StandardCharsets.UTF_8);

            // Parse ms param
            long ms = 0;
            if (query != null) {
                for (String param : query.split("&")) {
                    String[] kv = param.split("=", 2);
                    if (kv.length == 2 && "ms".equals(URLDecoder.decode(kv[0], StandardCharsets.UTF_8))) {
                        ms = Long.parseLong(URLDecoder.decode(kv[1], StandardCharsets.UTF_8));
                        break;
                    }
                }
            }

            String videoPath = SConfig.getJSON("files").getString("url") + decodedFilePath;
            File videoFile = new File(videoPath);
            if (!videoFile.exists()) {
                sendError(exchange, 404, "Video not found");
                return;
            }

            // Convert ms to seconds with decimals for ffmpeg
            double seconds = ms / 1000.0;

            // Create temp file for the output frame
            File tmpImage = File.createTempFile("thumb_", ".jpg");
            tmpImage.deleteOnExit();

            ProcessBuilder pb = new ProcessBuilder(
                "ffmpeg", "-y",
                "-ss", String.valueOf(seconds),
                "-i", videoPath,
                "-vframes", "1",
                "-q:v", "2",
                tmpImage.getAbsolutePath()
            );
            pb.redirectErrorStream(true);
            Process process = pb.start();

            // Drain output so process doesn't block
            process.getInputStream().transferTo(OutputStream.nullOutputStream());

            int exitCode = process.waitFor();
            if (exitCode != 0 || !tmpImage.exists() || tmpImage.length() == 0) {
                tmpImage.delete();
                sendError(exchange, 500, "Failed to extract frame");
                return;
            }

            byte[] imageBytes = Files.readAllBytes(tmpImage.toPath());
            tmpImage.delete();

            exchange.getResponseHeaders().add("Content-Type", "image/jpeg");
            exchange.sendResponseHeaders(200, imageBytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(imageBytes);
            }

        } catch (Exception e) {
            e.printStackTrace();
            sendError(exchange, 500, "Internal server error: " + e.getMessage());
        }
    }

    private void sendError(HttpExchange exchange, int code, String message) throws IOException {
        byte[] bytes = message.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(code, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }
}
