#Object for the diagnostic check

class DiagnosticModel:
    def __init__(self, dsCreate, commandExec, fmpLoadLibExist, fmpLoadLibValid, fmpLoadLibAccess, dsDelete, dsWrite):
        self.dsCreate = self.get_status(dsCreate)
        self.commandExec = self.get_status(commandExec)
        self.fmpLoadLibExist = self.get_status(fmpLoadLibExist)
        self.fmpLoadLibValid = self.get_status(fmpLoadLibValid)
        self.fmpLoadLibAccess = self.get_status(fmpLoadLibAccess)
        self.dsDelete = self.get_status(dsDelete)
        self.dsWrite = self.get_status(dsWrite)

    def get_status(self, input):
        return input['status']
