import os
if __name__ == "__main__":
    if os.system("python3 --version") == 0:
        python_command = "python3"
    elif os.system("python --verison") == 0:
        python_command = "python"
    else: 
        raise Exception("No valid python version found")
    if os.name == "nt":
        raise Exception("Windows not implemented yet") 
    else:
        os.system("MOCK_FIRESTORE=TRUE {} main.py".format(python_command))