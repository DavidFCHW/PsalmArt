import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class GeneratePsalms {
    public static void main(String[] args){
        try {
            getPsalms();
        } catch(IOException e){
            System.out.println("Could not create file");
        }
    }

    /**
     * Method to create text file and write to it.
     * Adapted from code examples in https://stackoverflow.com/questions/2885173/how-do-i-create-a-file-and-write-to-it-in-java
     * @param filename the relative path of the file that will be created.
     * @param verses the content of the file verse-by-verse.
     */
    private static void writeFile(String filename, List<String> verses){
        try {
            File file = new File(filename);
            if(file.createNewFile()){
                BufferedWriter bw = new BufferedWriter(new FileWriter(file));
                verses.forEach(verse -> {
                    try {
                        bw.write(verse);
                        bw.newLine();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });
                bw.close();
            }
        } catch(IOException e){
            System.out.println("File couldn't be written");
        }
    }

    /**
     * Method to retrieve the psalms from https://www.biblestudytools.com and write them to a new file.
     * @throws IOException
     */
    private static void getPsalms() throws IOException{
        for(int i = 1; i <= 150; i++) {
            Document doc = Jsoup.connect("https://www.biblestudytools.com/nkjv/psalms/" + i +".html").get();
            Elements versesTags = doc.body().getElementsByAttributeValueMatching("class", "verse\\-[0-9]");
            ArrayList<String> verses = new ArrayList<>();
            versesTags.forEach(verse -> verses.add(verse.html()));

            writeFile("../NKJV/Psalm " + i + ".txt", verses);
        }
    }
}
