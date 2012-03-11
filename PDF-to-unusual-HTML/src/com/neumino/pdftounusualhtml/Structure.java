package com.neumino.pdftounusualhtml;


import java.util.ArrayList;

/**
 * Class Structure, used to convert in Json format
 * A list of line, the structure of the paper
 * @author Michel Tu <orphee@gmail.com>
 * @version 1.0
 */

public class Structure {
	private ArrayList<Page> pages = new ArrayList<Page>();

	public Structure() {
	}


	public void add(Page page){
		pages.add(page);
	}
	public void add(Line line){
		pages.get(pages.size()-1).add(line);
	}
	
	public void addWordToLastPage(Word word) {
		Page lastPage = this.pages.get(pages.size() - 1);
		lastPage.addWordToLastLine(word);
	}
	
	public void updateLastLine(int width) {
		Page lastPage = this.pages.get(pages.size() - 1);
		lastPage.updateLastLine(width);
	}
	
}
