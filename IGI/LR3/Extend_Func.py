import random
import string


def input_arg_eps():
    """Function validate input of x and eps, for sin(x)"""
    while True:
        try:
            x = float(input("Input x: "))
        except ValueError as e:
            print(e.args[0])
            print()
            continue
        try:
            eps = float(input("Input eps: "))
            if abs(eps) > 1:
                raise Exception("Wrong epsilon value. Try again.")
        except ValueError as e:
            print("Wrong argument value. Try again.")
            print(e.args[0])
            continue
        except Exception as e:
            print(e.args[0])
            continue
        break
    return x, eps


def infinity_program(func):
    def wrapper():
        while True:
            func()
            text = input("Do you want restart program? (y/n)\n")
            if text not in ('y', 'Y'):
                break

    return wrapper


def input_type(func, string=''):
    """"""
    while True:
        try:
            res = func(input(string))
        except ValueError as e:
            print(e.args[0])
            continue
        break
    return res


def generate_random_float_list(count: int, start=-100, end=100):
    """Generate list  with fandom float in given range."""
    return [random.uniform(start, end) for i in range(count)]


def generate_random_string(count: int):
    """Generate random string. Contains printable ASCII symbols."""
    chars = string.printable
    return ''.join([random.choice(chars) for i in range(count)])


def input_or_generate_seq(generator_func, type_: type = str):
    """Generate random sequence or  user input sequence by yourself.
    Required generator function and type of
     """
    n = input_type(int, "Input sequence length: ")
    flag = input("Do you want input sequence? (y/n)  ")
    sequence = []
    if flag in ('y', "Y"):
        for i in range(n):
            sequence.append(input_type(type_))
    else:
        sequence.extend(generator_func(n))
    return sequence
