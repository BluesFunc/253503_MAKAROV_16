import numpy
import matplotlib.pyplot as plot
from matplotlib.patches import Circle as PlotCircle, Polygon
from Circle import Circle

from extended_func import infinity_program


def input_radius():
    while True:
        try:
            radius = float(input("Input radius: "))
        except ValueError:
            "Input type is not supported. Enter correct type."
            continue
        if radius <= 0:
            continue
        return radius


def input_color():
    valid_color = ('red', 'yellow', 'blue', 'black')
    while True:
        color = input(f"Enter valid color\n({'|'.join(valid_color)}): ")
        if color not in valid_color:
            print("This color isn't valid")
            continue
        return color


def draw_figures(circle: Circle, figure_name):
    figure, axes = plot.subplots()
    radius = circle.radius
    color = circle.color
    field_area = radius * 5
    axes.set_xlim(0, field_area)
    axes.set_ylim(0, field_area)

    circle_plot = PlotCircle((field_area / 2, field_area / 2), radius, color=color.color)

    triangle_side = radius * 6 / numpy.sqrt(3)
    points = numpy.array([[field_area / 2 - triangle_side / 2, field_area / 2 - radius],
                          [field_area / 2 + triangle_side / 2, field_area / 2 - radius],
                          [field_area / 2, field_area / 2 - radius + triangle_side * numpy.sqrt(3) / 2]])
    triangle_height = Polygon(points, color='yellow', fill=False)

    axes.text(field_area / 2, field_area / 2, figure_name, color='white', fontsize=15)
    axes.add_patch(circle_plot)
    axes.add_patch(triangle_height)
    axes.axis('on')

    plot.savefig('circle.png')
    plot.show()


@infinity_program
def main():
    circle = Circle(input_radius())
    circle.color = input_color()

    figure_name = input("Enter figure name: ")
    draw_figures(circle, figure_name)


if __name__ == "__main__":
    main()
