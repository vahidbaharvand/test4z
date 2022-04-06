"""
Copyright (c) 2022 Broadcom.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
"""

import sys
import pytest
sys.path.append("../../main")
from service import diagnostic
from utility import service_healthy
from model import DiagnosticModel

def test_diagnostic():
    diagnostic_response = diagnostic()
    diagnostic_model = DiagnosticModel(**diagnostic_response['data'])
    assert service_healthy(diagnostic_model)
