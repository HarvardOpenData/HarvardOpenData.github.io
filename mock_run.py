import os
import subprocess
if __name__ == "__main__":
    if os.system("python3 --version") == 0:
        python_command = "python3"
    elif os.system("python --verison") == 0:
        python_command = "python"
    else: 
        raise Exception("No valid python version found")
    os.environ["MOCK_FIRESTORE"] = "TRUE"
    subprocess.call([python_command, "main.py"])