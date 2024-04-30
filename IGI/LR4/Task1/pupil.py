class Pupil:
    def __init__(self, Surname: str, Instrument: str, Specialization: str):
        self.surname = Surname
        self.instrument = Instrument
        self.specialization = Specialization

    def __repr__(self):
        return f" {self.surname}(specialization={self.specialization}, instrument={self.instrument}) "


