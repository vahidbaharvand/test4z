import sys
sys.path.append("../../main")
from service import submit_job_notify, copy
import unittest

class TestApis(unittest.TestCase):
    def test_job_submit(self):
      mainDataset = "BEKHI01.TEST4Z.BATCHAPP.CUSTIN"
      copyDataset = "BEKHI01.TEST4Z.BATCHAPP.CUSTIN3"
      print("\n---------------Update Sample---------------")
      assert copy(mainDataset, copyDataset) == True
      assert submit_job_notify("BEKHI01.TEST4Z.BATCHAPP.JCL(CUSTSEQ)") == "CC 0000"
      print("----------------Completed----------------")
