"""
Copyright (c) 2022 Broadcom.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
"""

import sys
import pytest
sys.path.append("../../main")
from service import diagnostic


def test_diagnostic():
    diagnostic()
