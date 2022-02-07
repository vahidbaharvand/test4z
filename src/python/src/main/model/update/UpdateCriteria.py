# Model for the update definition

class UpdateCriteria:
    def __init__(self, field_name, field_operator, field_type, filter_value, target_value):
        self.fieldName = field_name
        self.fieldOperator = field_operator
        self.fieldType = field_type
        self.filterValue = filter_value
        self.targetValue = target_value
