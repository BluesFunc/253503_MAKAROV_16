from pupil import Pupil
from file_manager import CSVManager, BinManager

pupil_data = [{"Surname": "Makarov", "Specialization": "Rock", "Instrument": "Bass"},
              {"Surname": "Kotov", "Specialization": "Orchestra", "Instrument": "Guitar"},
              {"Surname": "Armen", "Specialization": "Traditional", "Instrument": "Cymbals"},
              {"Surname": "Namis", "Instrument": "Drums", "Specialization": "Orchestra"},
              {"Surname": "Vlados", "Specialization": "Traditional", "Instrument": "Cymbals"},
              {"Surname": "Nekit", "Specialization": "Opera", "Instrument": "Cymbals"},
              {"Surname": "Armen", "Specialization": "Folk", "Instrument": "Cymbals"},
              ]

Specialization = {"Opera", "Folk", "Orchestra", "Traditional"}


def input_string(input_prompt, valid_data: set = None):
    string_ = input(input_prompt)
    if valid_data:
        string_ = string_ if string_ in valid_data else None
    return string_


def main():
    pass


if __name__ == "__main__":
    file_name = None
    while (file_name := input_string("Input file type [bin or csv]:  ", {'bin', 'csv'})) is None:
        print('Choose correct file type')

    manger = BinManager('exams.' + file_name)

    spec = None
    while (spec := input_string(f"Enter specialization name [{','.join(Specialization)}]: ", Specialization)) is None:
        print('Choose correct specialization name')
    manger.write_by_spec(pupil_data, spec)

    surname = input("Write student's surname: ")
    pupil = manger.read_pupil_by_surname(surname)

    if pupil is None:
        print(f"{surname} did not write {spec}'s exam")
    else:
        print(pupil)
