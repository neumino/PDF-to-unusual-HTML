function Paper(idPublication, idConvertedPaper, pubkey, nbPage, height, directory, year) {  
	this._idPublication = idPublication;
	this._idConvertedPaper = idConvertedPaper;
	this._pubkey = pubkey;
	this._nbPage = nbPage;
	this._height = height;
	this._directory = directory;
	this._year = year;
}


var paper = new Paper(0, 0, "0", 0, 0, "0", 0); // we can't use it to load suggestions since pubkey might not be loaded.