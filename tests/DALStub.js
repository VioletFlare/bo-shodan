class DALStub {
	checkIfArticleExists = (url) => {
		return new Promise(resolve => resolve(false));
	}
}

module.exports = new DALStub();