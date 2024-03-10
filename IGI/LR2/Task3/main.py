import os

from geometric_lib.circle import area, perimeter 

radius = int(os.getenv('RADUIS', 4))

if __name__ == "__main__":
    print(f"Circle area with radius {radius}: {area(radius)}")
    print(f"Circle perimeter with radius {radius}: {perimeter(radius)}")
