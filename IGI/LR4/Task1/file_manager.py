from pupil import Pupil
import csv
import pickle


class CSVManager:
    headers = ["Surname", "Instrument", "Specialization"]

    def __init__(self, filename):
        self._filename = filename

    def write_by_spec(self, rows: list[dict], spec):
        with open(self._filename, mode='w') as file:
            writer = csv.DictWriter(file, fieldnames=self.headers)
            rows = filter(lambda x: x['Specialization'] == spec, rows)
            writer.writeheader()
            writer.writerows(rows)

    def read_pupil_by_surname(self, surname):
        data_list = []
        with open(self._filename) as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row["Surname"] == surname:
                    return Pupil(**row)


class BinManager:
    def __init__(self, filename):
        self._filename = filename

    def write_by_spec(self, data, spec):
        with open(self._filename, mode='wb') as file:
            exam_result = {spec: list(filter(lambda x: x['Specialization'] == spec, data))}
            pickle.dump(exam_result, file)

    def read_pupil_by_surname(self, surname):
        with open(self._filename, mode='rb') as file:
            data = pickle.load(file)
            spec = next(iter(data))
            for pupil in data[spec]:
                if pupil["Surname"] == surname:
                    return Pupil(**pupil)
            return None
