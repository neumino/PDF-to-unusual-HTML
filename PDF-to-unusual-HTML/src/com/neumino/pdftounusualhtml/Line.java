package com.neumino.pdftounusualhtml;

import java.util.ArrayList;

/**
 * Class Line, used to convert in Json format
 * It represents a line of a publication
 * @see Word
 * @author Michel Tu <orphee@gmail.com>
 * @version 1.0
 */
public class Line {
	/**
     * Id of the line
     */
	private int idLine;
	/**
     * Top left corner's x value of the selection
     */
	private int x;
	/**
     * Top left corner's y value of the selection
     */
	private int y;
	/**
     * Width of the line
     */
	private int width;
	/**
     * Height of the line
     */
	private int height;
	/**
     * List of the words in the line
     */
	private ArrayList<Word> words = new ArrayList<Word>();


	
	/**
	 * Public constructor
	 * @param idLine id of the line
	 * @param startX Top left corner's x value of the selection
	 * @param startY Top left corner's y value of the selection
	 * @param width Width of the line
	 * @param height Height of the line
	 */
	public Line(int idLine, int startX, int startY, int width, int height) {
		this.idLine = idLine;
		this.x = startX;
		this.y = startY;
		this.width = width;
		this.height = height;
	}


	/**
	 * Add a word to the line
	 * @param word Word to add
	 */
	public void add(Word word) {
		words.add(word);
	}


	public void updateWidth(int width) {
		this.width = width;
	}
}
