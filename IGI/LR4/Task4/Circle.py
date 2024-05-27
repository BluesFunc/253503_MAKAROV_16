from Figure import Figure
from Color import Color
from math import pi


class Circle(Figure):
    def __init__(self, radius: float, color='red'):
        self._radius = radius
        self._color = Color(color)

    def area(self):
        return pi * self.radius ** 2

    def __repr__(self):
        return f"Radius: {self.radius} {self._color}"

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        self._radius = value

    @property
    def color(self):
        return self._color

    @color.setter
    def color(self, value):
        self._color = Color(value)
