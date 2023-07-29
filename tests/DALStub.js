class DALStub {
	checkIfArticleExists(url) {
		return new Promise(resolve => resolve(true));
	}
}

module.exports = new DALStub();