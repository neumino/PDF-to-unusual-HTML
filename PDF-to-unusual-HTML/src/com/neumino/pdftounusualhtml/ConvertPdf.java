package com.neumino.pdftounusualhtml;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;

public class ConvertPdf {
	static String inputDirectory;
	static char charDelimiter = '/';
	static String pathToImagemagick = "convert";
	
	
	
	public static void main(String[] args) {
		if ( args.length < 2) {
			System.err.println("Use: java -jar convertPdf.jar pathToPdf zoom");
		}

		
		String pathToPdf = args[0];
		float zoom = Float.parseFloat(args[1]);
		
		try {
			Pdf2Json converter = new Pdf2Json(zoom, pathToImagemagick);
			converter.convert(pathToPdf);
		} catch (IOException e) {
			System.err.println(e.getMessage());
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}



	

}
