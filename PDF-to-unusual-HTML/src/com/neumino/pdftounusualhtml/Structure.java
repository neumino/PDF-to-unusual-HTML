package com.neumino.pdftounusualhtml;


import java.util.ArrayList;

/**
 * Class Structure, used to convert in Json format
 * A list of line, the structure of the paper
 * @author Michel Tu <orphee@gmail.com>
 * @version 1.0
 */

public class Structure {
	private ArrayList<Page> structure = new ArrayList<Page>();

	public Structure() {
	}


	public void add(Page page){
		structure.add(page);
	}
	public void add(Line line){
		structure.get(structure.size()-1).add(line);
	}
	
	public void addWordToLastPage(Word word) {
		Page lastPage = this.structure.get(structure.size() - 1);
		lastPage.addWordToLastLine(word);
	}
	
	public void updateLastLine(int width) {
		Page lastPage = this.structure.get(structure.size() - 1);
		lastPage.updateLastLine(width);
	}
	
}
