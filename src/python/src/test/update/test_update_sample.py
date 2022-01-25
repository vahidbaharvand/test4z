"""
Copyright (c) 2022 Broadcom.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

Example test suite for Test4z update feature with Python
"""

import sys
import unittest
import json
sys.path.append("../../main")
from service import submit_job_notify, copy, roll_back_dataset, search, update
from model import FilterBuilder, UpdateCriteriaBuilder, Types, Operators, QueryOperators

#Testing variables
batchAppJCLDataset = "BEKHI01.TEST4Z.BATCHAPP.JCL(CUSTSEQ)"
mainDataset = "BEKHI01.TEST4Z.BATCHAPP.CUSTIN"
copyDataset = "BEKHI01.TEST4Z.BATCHAPP.CUSTIN2"
copybook = "BEKHI01.TEST4Z.BATCHAPP.COPY(CUSTREC)"
searchFilters = [
    FilterBuilder()
      .field_name("TOTAL-CHECKS")
      .field_operator(Operators.EQUAL.value)
      .field_value(["30","50","80"])
      .field_type(Types.NUMBER.value)
      .query_operator(QueryOperators.AND.value)
    .build(),
    FilterBuilder()
      .field_name("ACTUAL-CHECKS")
      .field_operator(Operators.LESSOREQUAL.value)
      .field_value(["3","5","8"])
      .field_type(Types.NUMBER.value)
      .query_operator(QueryOperators.AND.value)
    .build(),
    FilterBuilder()
      .field_name("PRODUCT-TYPE")
      .field_operator(Operators.EQUAL.value)
      .field_value(["C","P"])
      .field_type(Types.CHARACTER.value)
    .build()
]

update_criteria = [
    UpdateCriteriaBuilder()
        .field_name("PRODUCT-TYPE")
        .field_operator(Operators.LIKE.value)
        .field_type(Types.CHARACTER.value)
        .filter_value("S")
        .target_value("C")
    .build()
]

filter_criteria = FilterBuilder().field_name("ACCOUNT-NUMBER").field_operator(Operators.EQUAL.value).field_value(["123456000003"]).field_type(Types.CHARACTER.value).build()

class UpdateSample(unittest.TestCase):
    def test_job_submit(self):
        print("\n---------------Update Sample---------------")
        assert copy(mainDataset, copyDataset) == True

        assert submit_job_notify(batchAppJCLDataset) == "CC 0000"

        search_result = search(mainDataset, copybook, searchFilters)
        assert len(search_result) == 13

        assert roll_back_dataset(copyDataset, mainDataset) == True

        assert update(mainDataset, copybook, update_criteria, filter_criteria) == 1

        assert submit_job_notify(batchAppJCLDataset) == "CC 0000"

        search_result2 = search(mainDataset, copybook, searchFilters)
        assert len(search_result2) == 14

        assert roll_back_dataset(copyDataset, mainDataset) == True
        print("----------------Completed----------------")
