# Request model for /update endpoint

class UpdateModel:
    def __init__(self, dataset, copy_book, update_criteria, filter_criteria):
        self.dataSet = dataset
        self.copyBook = copy_book
        self.updateCriteria = update_criteria
        self.filterCriteria = filter_criteria
