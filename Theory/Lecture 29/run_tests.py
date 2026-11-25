"""
run_tests.py - Automated test execution runner for Lecture 29 Django Test Suite
"""
import os
import sys
import subprocess

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.join(base_dir, "student_system")

    print("=" * 65)
    print("  AUTOMATION TEST SUITE: LECTURE 29 DJANGO TESTING & DEBUGGING")
    print("  Author: Ansh Tyagi | SAP ID: 590014867")
    print("=" * 65)

    cmd = [sys.executable, "manage.py", "test", "students", "-v", "2"]
    res = subprocess.run(cmd, cwd=project_dir)
    sys.exit(res.returncode)

if __name__ == "__main__":
    main()
