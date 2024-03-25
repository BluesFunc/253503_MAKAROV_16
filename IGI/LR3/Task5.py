from Extend_Func import generate_random_float_list, infinity_program, input_or_generate_seq

"""
Find indexes first maximum and minimum element.
Program find sum all positive numbers and mul all numbers  between max and min.
User choose input it or generate randomly.
Labs 3
Task5
V1
Makarov A. S
24.03.24
"""


def solve(number_seq):
    """Find indexes first maximum and minimum element.
    Program find sum all positive numbers and mul all numbers  between max and min."""
    max_ = min_ = 0
    for i in range(1, len(number_seq)):
        if abs(number_seq[i]) > abs(number_seq[max_]):
            max_ = i
        if abs(number_seq[i]) < abs(number_seq[min_]):
            min_ = i
    left_border = min(min_, max_)
    right_border = max(min_, max_)
    mul_res = 1
    sum_res = 0
    for i in number_seq[left_border:right_border + 1]:
        if i > 0:
            sum_res += i
        mul_res *= i
    print(*number_seq)
    print([sum_res, mul_res])


@infinity_program
def main():
    """Perform Task5"""
    number_sequence = input_or_generate_seq(generate_random_float_list, float)
    solve(number_sequence)


if __name__ == "__main__":
    main()
