class SearchModel:
    def __init__(self, dataSet, copyBook, searchQuery, limit=0, offset=0):
        self.dataSet = dataSet
        self.copyBook = copyBook
        self.searchQuery = searchQuery
        self.limit = limit
        self.offset = offset
