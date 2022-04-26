# Request model for filtering the search or update

class Filter:
    def __init__(self, field_name, field_operator, field_value, field_type, query_operator):
        self.fieldName = field_name
        self.fieldOperator = field_operator
        self.fieldValue = field_value
        self.fieldType = field_type
        self.queryOperator = query_operator
