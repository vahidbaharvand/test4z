class UpdateCriteria:
    def __init__(self, fieldName, fieldOperator, fieldType, filterValue, targetValue):
        self.fieldName = fieldName
        self.fieldOperator = fieldOperator
        self.fieldType = fieldType
        self.filterValue = filterValue
        self.targetValue = targetValue
