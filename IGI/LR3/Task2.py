from Extend_Func import input_type, infinity_program

"""
User input integers not equal 0. If zero is founded input, input is stopping.
Print count of positive even integers  
Labs 3
Task2
V1
Makarov A. S
24.03.24
"""


@infinity_program
def main():
    """Perform Task2"""
    n = 0
    count = 0
    print("Start input integers.\n"
          "0 is triggering stop input.")
    while (digit := input_type(int)) != 0:
        if digit > 0 and digit % 2 == 0:
            count += 1
        n += 1
    print(f"Total count of numbers: {n}\n"
          f"Count of positive even numbers: {count}")


if __name__ == "__main__":
    main()
