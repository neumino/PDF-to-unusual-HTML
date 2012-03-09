package com.neumino.pdftounusualhtml;

import java.util.ArrayList;

public class Page {
	private ArrayList<Line> lines = new ArrayList<Line>();
	private int width;
	private int height;
	private int marginTop;
	
	public Page(int width, int height, int marginTop) {
		this.width = width;
		this.height = height;
		this.marginTop = marginTop;
	}


	public void add(Line line){
		lines.add(line);
	}

	
	public void addWordToLastLine(Word word) {
		Line lastLine = this.lines.get(lines.size() - 1);
		lastLine.add(word);
	}
	
	public void updateLastLine(int width) {
		Line lastLine = this.lines.get(lines.size() - 1);
		lastLine.updateWidth(width);
	}

}
