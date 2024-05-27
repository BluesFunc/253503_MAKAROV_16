from contextlib import contextmanager


class CSVHandler:
    def __init__(self, filename, mode=None):
        self._filename = filename
        self._mode = mode
        self.file = None

    def __enter__(self):
        self.file = open(self._filename, self._mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()
