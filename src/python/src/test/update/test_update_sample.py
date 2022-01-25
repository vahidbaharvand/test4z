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
from service import submit_job_notify, get_config_prop, copy, roll_back_dataset, search, update
from model import FilterBuilder, UpdateCriteriaBuilder, Types, Operators, QueryOperators
from utility import CustomAssertions

#Testing variables
batch_app_jcl_dataset = ".TEST4Z.BATCHAPP.JCL(CUSTSEQ)"
main_dataset = ".TEST4Z.BATCHAPP.CUSTIN"
copy_dataset = ".TEST4Z.BATCHAPP.CUSTIN2"
copybook = ".TEST4Z.BATCHAPP.COPY(CUSTREC)"
search_filters = [
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

class UpdateSample(unittest.TestCase, CustomAssertions):
    def test_job_submit(self):
        print("\n---------------Update Sample---------------")
        HLQ = get_config_prop("TEST4Z", "hlq")
        global main_dataset, copy_dataset, copybook, batch_app_jcl_dataset
        main_dataset = HLQ + main_dataset
        copy_dataset = HLQ + copy_dataset
        copybook = HLQ + copybook
        batch_app_jcl_dataset = HLQ + batch_app_jcl_dataset
        #-------------------------------------
        copy_result = copy(main_dataset, copy_dataset)
        self.assertRequestSuccessful(copy_result)

        job = submit_job_notify(batch_app_jcl_dataset)
        self.assertJobSuccessful(job)

        search_result = search(main_dataset, copybook, search_filters)
        self.assertRequestSuccessful(search_result)
        assert len(search_result['data']['Record']) == 13

        roll_back_result = roll_back_dataset(copy_dataset, main_dataset)
        self.assertRequestSuccessful(roll_back_result)

        update_result = update(main_dataset, copybook, update_criteria, filter_criteria)
        self.assertRequestSuccessful(update_result)
        assert update_result['data']['recordsChanged'] == 1

        job2 = submit_job_notify(batch_app_jcl_dataset)
        self.assertJobSuccessful(job2)

        search_result2 = search(main_dataset, copybook, search_filters)
        self.assertRequestSuccessful(search_result2)
        assert len(search_result2['data']['Record']) == 14

        roll_back_result2 = roll_back_dataset(copy_dataset, main_dataset)
        self.assertRequestSuccessful(roll_back_result2)

        print("----------------Completed----------------")
