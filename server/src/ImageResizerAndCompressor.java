import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;

import org.apache.tika.Tika;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;

public class ImageResizerAndCompressor {
    public static void resizeAndCompressImage(File inputFile, File outputFile, int maxWidth, int maxHeight, float quality) throws IOException {
        // Lee la imagen desde el archivo
        BufferedImage originalImage = ImageIO.read(inputFile);
        
        // Calcula las nuevas dimensiones manteniendo la relación de aspecto
        int originalWidth = originalImage.getWidth();
        int originalHeight = originalImage.getHeight();
        float aspectRatio = (float) originalWidth / originalHeight;

        int newWidth = maxWidth;
        int newHeight = maxHeight;
        
        if (newWidth / aspectRatio <= maxHeight) {
            newHeight = (int) (newWidth / aspectRatio);
        } else {
            newWidth = (int) (newHeight * aspectRatio);
        }

        // Crea una nueva imagen redimensionada
        BufferedImage resizedImage = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = resizedImage.createGraphics();
        g.drawImage(originalImage, 0, 0, newWidth, newHeight, null);
        g.dispose();
        
        // Obtiene el escritor de imágenes para el formato JPEG
        ImageWriter writer = ImageIO.getImageWritersByFormatName("png").next();
        
        // Configura la salida del escritor
        ImageOutputStream ios = ImageIO.createImageOutputStream(new FileOutputStream(outputFile));
        writer.setOutput(ios);
        
        // Configura los parámetros de compresión
        ImageWriteParam param = writer.getDefaultWriteParam();
        param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        param.setCompressionQuality(quality);
        
        // Escribe la imagen comprimida
        writer.write(null, new javax.imageio.IIOImage(resizedImage, null, null), param);
        
        // Limpia los recursos
        ios.close();
        writer.dispose();
    }

    private static final Tika tika = new Tika();
    public static boolean isImageFile(File file) {
        try {
            String mimeType = tika.detect(file);
            return mimeType.startsWith("image");
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    
    public boolean recorrerDirectorio(String url){
        File f = new File(url);
        if(!f.exists()) return false;

        if(f.isFile()){
            
            if(isImageFile(f)){
                long totalSpaceInMB = f.length() / (1024);
                if(totalSpaceInMB > 700){
                    System.out.println(url+" --> "+totalSpaceInMB+" kb");
                }
            }
            return true;
        }

        if(f.isDirectory()){
            //System.out.println(url+": Directorio");
            for (int i = 0; i < f.list().length; i++) {
                recorrerDirectorio(url+""+f.list()[i]+"/");
            }
            return true;
        }

        return true;
    }

    public static void main(String[] args) {
        try {
            File input = new File("test.png");
            File output = new File("test_70.png");

            String url = "/u01/servisoftsFiles/";

            new ImageResizerAndCompressor().recorrerDirectorio(url);

            float quality = 0.8f; // La calidad puede ser entre 0 (máxima compresión) y 1 (sin compresión)
            resizeAndCompressImage(input, output, 70, 70, quality);
            System.out.println("Imagen redimensionada y comprimida con éxito.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
