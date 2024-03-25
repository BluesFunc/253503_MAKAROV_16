from math import sin, fabs, pi, fmod

from Extend_Func import input_arg_eps, infinity_program

"""This program solve sin(x) by Taylor sires.  Then calculate included sin function. 
Compare  results from both function. 
Output in format:  
x | n | my_sin(x)| math sin(x) | eps
Labs 3
Task1
Makarov A. S
24.03.24
"""


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


def my_sin(argument: float, eps: float):
    """
    Calculate sin(x) by Taylor sires.
    sin(x) = x - x^3/3! + ... x^(2n+1)/(2n+1)!
    :rtype: (int, float)
    """
    n = 0
    factorial = 1

    argument, is_neg = serialize_argument(argument)
    member = argument
    sum_ = 0
    while n <= 500 and fabs(member) > eps:
        sum_ += member
        member *= argument * argument
        factorial *= 2 * (n + 1) * (2 * n + 3)
        member /= -factorial
        n += 1
    if is_neg:
        sum_ *= -1
    return n, sum_


@infinity_program
def main():
    """Perform Task1"""
    x, eps = input_arg_eps()
    print("| x | n | F(x) | math F(x) | eps ")
    print(x, *my_sin(x, eps), sin(x), eps)


if __name__ == "__main__":
    # while True:
    #     try:
    #         main()
    #     except KeyboardInterrupt:
    #         break
    main()
