import os


TEST_DIR = (
    "demo/sample_logs"
)

os.makedirs(
    TEST_DIR,
    exist_ok=True
)

for i in range(500):

    with open(
        f"{TEST_DIR}/file_{i}.txt",
        "w"
    ) as file:

        file.write(
            "encrypted"
        )

print(
    "Fake ransomware completed"
)