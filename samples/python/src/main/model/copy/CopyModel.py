# Request model for /copy endpoint

class CopyModel:
    def __init__(self, input_dataset, output_dataset):
        self.inputDataset = input_dataset
        self.outputDataset = output_dataset
