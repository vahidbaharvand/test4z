# Operator enum for the Operator parameter

from enum import Enum
class Operators(Enum):
    LIKE = "%"
    EQUAL = "="
    NOTEQUAL = "!="
    GREATER = ">"
    GREATEROREQUAL = ">="
    LESS = "<"
    LESSOREQUAL = "<="
