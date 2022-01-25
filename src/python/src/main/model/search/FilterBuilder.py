# Helper class for building the proper filter for search.

from .Filter import Filter
class FilterBuilder(object):

    def __init__(self):
        self.fieldName = None
        self.fieldOperator = None
        self.fieldValue = None
        self.fieldType = None
        self.queryOperator = None

    def field_name(self, fieldName):
        self.fieldName = fieldName
        return self

    def field_operator(self, fieldOperator):
        self.fieldOperator = fieldOperator
        return self

    def field_value(self, fieldValue):
        self.fieldValue = fieldValue
        return self

    def field_type(self, fieldType):
        self.fieldType = fieldType
        return self

    def query_operator(self, queryOperator):
        self.queryOperator = queryOperator
        return self

    def build(self):
        if self.fieldName is None: raise Exception("field_name():Method not implemented.")
        if self.fieldOperator is None: raise Exception("field_operator():Method not implemented.")
        if self.fieldValue is None: raise Exception("field_value():Method not implemented.")
        if self.fieldType is None: raise Exception("field_type():Method not implemented.")
        return Filter(self.fieldName, self.fieldOperator, self.fieldValue, self.fieldType, self.queryOperator)
