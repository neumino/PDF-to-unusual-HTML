package com.neumino.pdftounusualhtml;


/**
 * Class Word, used to convert in Json format
 * @author Michel Tu <orphee@gmail.com>
 * @version 1.0
 */

public class Word {
	private String word;
	private int x;
	private int width;
	
	
	public Word(String word, int startX, int width) {
		this.word = word;
		this.x = startX;
		this.width = width;
	}

}
