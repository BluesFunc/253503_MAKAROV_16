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

headers = ["Surname", "Instrument", "Specialization"]


def input_string(input_prompt, valid_data: set = None):
    string_ = input(input_prompt)
    if valid_data:
        string_ = string_ if string_ in valid_data else None
    return string_


def main():
    pass


if __name__ == "__main__":
    file_name = None
    while (file_name := input_string("Input file type [bin or csv]:  ")) is None:
        pass

    manger = BinManager('exams.' + file_name)

    manger.write_by_spec(pupil_data, 'Traditional')
    pupil = manger.read_pupil_by_surname("Vlados")
    print(pupil)
