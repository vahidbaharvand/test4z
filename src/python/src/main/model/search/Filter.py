class Filter:
    def __init__(self, fieldName, fieldOperator, fieldValue, fieldType, queryOperator):
        self.fieldName = fieldName
        self.fieldOperator = fieldOperator
        self.fieldValue = fieldValue
        self.fieldType = fieldType
        self.queryOperator = queryOperator
