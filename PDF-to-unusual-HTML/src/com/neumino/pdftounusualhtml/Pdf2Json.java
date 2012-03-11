package com.neumino.pdftounusualhtml;

import java.awt.image.BufferedImage;
import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.pdfbox.exceptions.CryptographyException;
import org.apache.pdfbox.exceptions.InvalidPasswordException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDFontDescriptor;
import org.apache.pdfbox.util.PDFImageWriter;
import org.apache.pdfbox.util.PDFOperator;
import org.apache.pdfbox.util.PDFTextStripper;
import org.apache.pdfbox.util.TextPosition;


import org.apache.commons.lang3.StringEscapeUtils;

import com.google.gson.Gson;




public class Pdf2Json extends PDFTextStripper{
	// parameters
	private float zoom = (float) 1.5f;
	private String pathToImagemagick;


	private int marginTopBackground = 0;
    private int resolution = 72; //default resolution
    
    // group by line
    
    private StringBuffer currentLine = new StringBuffer();
    private int lineMarginTop = 0;
    private int lineMarginLeft = 0;
    private int lineCurrentWidth = 0;
    private int lineHeight = 0;
    
    

    private int wordMarginLeft = 0;
    private int wordCurrentWidth = 0;
    
	private int currentFontSizePx = 0;
	private String currentFontString = "";
	

	private Structure structure = new Structure();
	private int idLine = 0;
	
	
	
	public Pdf2Json(float zoom, String pathToImagemagick) throws IOException {
		this.zoom = zoom;
		this.pathToImagemagick = pathToImagemagick;
	}
	
    /**
     * Convert a PDF file to HTML
     *
     * @param fileName Path to the file
     *
     * @throws IOException If there is an error processing the operation.
     */
	public void convert(String pathToPdf) throws Exception {
		int positionDotPdf = pathToPdf.lastIndexOf(".pdf");
		if (positionDotPdf == -1) {
            System.err.println("File doesn't have .pdf extension");
            System.exit(1);
		}
		int positionLastSlash = pathToPdf.lastIndexOf("/");
		String pathToDirectory;
		if (positionLastSlash  == -1) {
			positionLastSlash  = 0;
			pathToDirectory = "";
		}
		else {
			positionLastSlash++;
			pathToDirectory = pathToPdf.substring(0, positionLastSlash);
		}
		String fileName = pathToPdf.substring(positionLastSlash, positionDotPdf);
		

		
		PDDocument document = null;
        try {
            
            document = PDDocument.load(pathToPdf);
                        
            if(document.isEncrypted()){
            	try {
            		document.decrypt("");
            	}
            	catch( CryptographyException e ) {
            		System.err.println( "\n\n Error: Document is encrypted with a password.\n" );
            		return ;
            	}
            	catch( IOException e ) {
            		System.err.println( "\n\n Error: Document is encrypted with a password.\n" );
            		return ;
            	}
            	catch( InvalidPasswordException e ) {
            		System.err.println( "\n\n Error: Document is encrypted with a password.\n" );
            		return ;
            	}
            }
            
            List allPages = document.getDocumentCatalog().getAllPages();
            int nbPage = allPages.size();

            int exitVal = 0;
            
    		int density = (int) (resolution*zoom);
        	String imageName = fileName+".png";
    		if (nbPage == 1) {
	        	imageName = fileName+"-0.png";
    		}
	    		
    		String command = pathToImagemagick+" -density "+density+" "+pathToPdf+" "+pathToDirectory+imageName;
    		try {
    			exitVal = ProcessTimeout.exec(command);
    		}
    		catch(IOException e) {
    			System.err.println(e.toString());
    			e.printStackTrace();
    			exitVal = 1;
    			//System.exit(1);
    		}
            
    		if (exitVal == -2) {
        		System.err.println("Time out");    			
    		}
    		else if (exitVal != 0) {
        		System.err.println("Error, could not generate images");    			
    		}
    		else if (exitVal == 0) {
        		structure = new Structure();
        		
        		


        				
	            for( int i=0; i<nbPage; i++ ) {
	        		idLine = 0;
	        	    lineMarginTop = 0;
	        	    lineMarginLeft = 0;
	        	    lineCurrentWidth = 0;
	        	    lineHeight = 0;
	        	    wordMarginLeft = 0;
	        	    wordCurrentWidth = 0;
	        		currentFontSizePx = 0;

	        		
	            	PDPage page = (PDPage)allPages.get( i );
	            	BufferedImage image = page.convertToImage(BufferedImage.TYPE_INT_RGB, resolution);
	            	
	            	Page newPage = new Page((int) (zoom*image.getWidth()), (int) (zoom*image.getHeight()), marginTopBackground);
	            	marginTopBackground += (int) (zoom*image.getHeight());
	            	structure.add(newPage);
	            	
	            	PDStream contents = page.getContents();
	            	if( contents != null ) {
	            		try {
	            			this.processStream( page, page.findResources(), page.getContents().getStream() );
	            		}
	            		catch (NumberFormatException e) {
	            			//trigerred once...
							System.err.println("\n\n Warning: NumberFormatException\n");
							e.printStackTrace();
	            		}
	            	}
	            	
					Word newWord = new Word(StringEscapeUtils.escapeJava(currentLine.toString()), wordMarginLeft, wordCurrentWidth);
					structure.addWordToLastPage(newWord);
					structure.updateLastLine(lineCurrentWidth);

	
	            }

	        	
	        	
	        	//Save the structure in the file
	        	Gson gson = new Gson();
	        	String json = gson.toJson(structure);  

	        	try{
	        		FileWriter fstream = new FileWriter(pathToDirectory+fileName+"_words.txt");
	        		BufferedWriter out = new BufferedWriter(fstream);
	        		out.write(json);
	        		out.close();
	        	}
	        	catch (Exception e){//Catch exception if any
	        		System.err.println("Error: " + e.getMessage());
	        	}


	        	
	        	
	        	


        	}
        }
        catch(IOException e) {
            System.err.println( "Could not open file");
        }
        finally {
            if( document != null ) {
                document.close();
            }
        }


	}
	
    /**
     * A method provided as an event interface to allow a subclass to perform
     * some specific functionality when text needs to be processed.
     *
     * @param text The text to be processed
     */
    protected void processTextPosition( TextPosition text ) {
    	
    	try {
    		
    		int marginLeft = (int)((text.getXDirAdj())*zoom);

    		int fontSizePx = Math.round(text.getFontSizeInPt()/72*resolution*zoom);
    		int marginTop;

    		marginTop = (int)((text.getYDirAdj())*zoom-fontSizePx*0.75); // 0.75 is purely experimental

    		int height = fontSizePx;
    		
    		int width = (int) (text.getWidthDirAdj()*zoom);

    		String fontString = "";
    		PDFont font = text.getFont();
    		PDFontDescriptor fontDescriptor = font.getFontDescriptor();
    		if (fontDescriptor != null) {
        		fontString = fontDescriptor.getFontName();    			
    		}
    		
    		int widthSpace = (int) (text.getWidthOfSpace()*zoom);

    		String charToAdd = text.getCharacter().replace("<", "&lt;").replace(">", "&gt;").replace("'", "\'");
    		
    	    try {
				processChar(charToAdd, marginLeft,  marginTop, height, width, fontSizePx, fontString, widthSpace);
			} catch (SQLException e) {
				e.printStackTrace();
			}

    	    
		} catch (IOException e) {
			e.printStackTrace();
		}
		
    }	
    
    
    
    private void processChar(String charToAdd, int marginLeft, int marginTop, int height, int width, int fontSizePx, String fontString, int widthSpace) throws IOException, SQLException {
    	// We have a new line
    	if ((lineMarginTop != marginTop) || (lineHeight != height) || (currentFontSizePx != fontSizePx) || ((marginLeft+width)-lineMarginLeft < 0)) {
			boolean display = true;
			
    		
			if ((currentLine.equals("")) || (currentLine.equals(" "))) { // if there is nothing to display, we do not need to add a bloc
				display = false;
			}
    		
			if (lineMarginTop != 0) {
				
				if (display) {
					Word newWord = new Word(StringEscapeUtils.escapeJava(currentLine.toString()), wordMarginLeft, wordCurrentWidth);
					structure.addWordToLastPage(newWord);
				}
				structure.updateLastLine(lineCurrentWidth);
			}
			
			Line newLine = new Line(idLine, marginLeft, marginTop, 0, height);
			idLine++;
			structure.add(newLine);			

			lineMarginTop = marginTop;
		    lineMarginLeft = marginLeft;
		    lineCurrentWidth = width;
		    lineHeight = height;

		    wordCurrentWidth = width;
		    wordMarginLeft = marginLeft;

			currentFontSizePx = fontSizePx;
			currentFontString = fontString;
			currentLine = new StringBuffer(); 

    	}
    	else if ((charToAdd.equals(" ")) || (marginLeft-(wordMarginLeft+wordCurrentWidth) > widthSpace-3) || (marginLeft+width-wordMarginLeft < 0) || (currentFontString != fontString)) { // if we are on the same line but with a new word

    		
    		if (lineMarginTop != 0) { // condition could be skipped, there shouldn't be a character on the top left of the pdf
   				currentLine.append(" ");
    		}
    		
			boolean display = true;
			
			if ((currentLine.equals("")) || (currentLine.equals(" "))) { // if there is nothing to display, we do not need to add a bloc
				display = false;
			}
    		
			if (display) {
				Word newWord = new Word(StringEscapeUtils.escapeJava(currentLine.toString()), wordMarginLeft, wordCurrentWidth);
				structure.addWordToLastPage(newWord);
			}
		    lineCurrentWidth = (marginLeft+width)-lineMarginLeft;
		    
			wordCurrentWidth = width;
		    wordMarginLeft = marginLeft;
			
		    
			currentFontSizePx = fontSizePx;
			currentFontString = fontString;
			currentLine = new StringBuffer(); 

    	}   
   		else {
		    lineCurrentWidth = (marginLeft+width)-lineMarginLeft;
   			wordCurrentWidth = (marginLeft+width)-wordMarginLeft;
   		}
    	if (!charToAdd.equals(" ")) {
    		currentLine.append(charToAdd);
    		
    	}


	}}
