from math import pow, sin, fabs, fmod, pi
import matplotlib.pyplot as plot
import numpy
from statistics import median, mode, variance, stdev


class SinusSeries:
    def __init__(self, eps: float):
        self.member = 0
        self.eps = eps
        self.sum_ = 0
        self.n = 0
        self.factorial = 1
        self.series_values = []

    @staticmethod
    def serialize_argument(argument: float) -> (float, bool):
        """Convert sin(x) argument to suitable format
        """
        argument = fmod(argument, 2 * pi)
        is_neg = False
        if argument < 0:
            argument += 2 * pi

        if 3 * pi / 2 > argument > pi / 2:
            argument = pi - argument
        elif 2 * pi > argument > 3 * pi / 2:
            argument = argument - 2 * pi

        if argument < 0:
            argument *= -1
            is_neg = True
        return argument, is_neg

    def compute_statistics(self):
        """Compute additional statistics"""
        med = median(self.series_values)
        mod = mode(self.series_values)
        var = variance(self.series_values)
        mean = sum(self.series_values) / len(self.series_values)
        std_dev = stdev(self.series_values)
        return {"Middle value": mean,
                "Medain": med,
                "Mode": mod,
                "Variance": var,
                "Standard Deviation": std_dev}

    def calculate_sin(self, argument):
        """
        Calculate sin(x) by Taylor sires.
        sin(x) = x - x^3/3! + ... x^(2n+1)/(2n+1)!
        :rtype: (int, float)
        """
        n = 0
        factorial = 1

        argument, is_neg = self.serialize_argument(argument)
        self.member = argument
        self.sum_ = 0
        while n <= 500 and fabs(self.member) > self.eps:
            self.sum_ += self.member
            self.series_values.append(self.sum_)
            self.member *= argument * argument
            factorial *= 2 * (n + 1) * (2 * n + 3)
            self.member /= -factorial
            n += 1

        if is_neg:
            self.sum_ *= -1
        return self.sum_

    def draw_graphs(self, filename: str):
        """Draw graphs using matplotlib and save to file"""
        x_origin = numpy.linspace(-10, 10, 100)
        y_origin = numpy.linspace(-1, 1, 100)
        plot.plot(x_origin, [0] * len(y_origin), color='black')
        plot.plot([0] * len(x_origin), y_origin, color='black')

        x_values = numpy.linspace(-10, 10, 100)
        f_x = [sin(x) for x in x_values]
        s_x = [self.calculate_sin(x) for x in x_values]

        plot.plot(x_values, s_x, color='red', label='series')
        plot.plot(x_values, f_x, color='blue', label='math.asin')

        plot.xlabel('Argument')
        plot.ylabel('Value')
        plot.title('Graphs of Sinus Series and sin function')
        plot.legend()
        plot.grid(True)

        plot.savefig(filename)
        plot.show()
        plot.close()
