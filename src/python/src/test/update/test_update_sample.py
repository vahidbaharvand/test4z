import sys
import json
sys.path.append("../../main")
from service import submit_job_notify, copy, search
from model import FilterBuilder
import unittest

mainDataset = "BEKHI01.TEST4Z.BATCHAPP.CUSTIN"
copyDataset = "BEKHI01.TEST4Z.BATCHAPP.CUSTIN3"

class TestApis(unittest.TestCase):
    def test_job_submit(self):
      print("\n---------------Update Sample---------------")
      #assert copy(mainDataset, copyDataset) == True
      #assert submit_job_notify("BEKHI01.TEST4Z.BATCHAPP.JCL(CUSTSEQ)") == "CC 0000"

      filters = [
          FilterBuilder().field_name("1").field_operator("11").field_value("111").field_type("1111").query_operator("11111").build(),
          FilterBuilder().field_name("2").field_operator("22").field_value("222").field_type("2222").query_operator("22222").build(),
          FilterBuilder().field_name("3").field_operator("33").field_value("333").field_type("3333").build()
      ]
      print(json.dumps(filters, default = lambda x: x.__dict__))



      assert search() == 5
      print("----------------Completed----------------")
