from Extend_Func import generate_random_string, input_or_generate_seq, infinity_program
from string import punctuation

"""
Find count of punctuation in string. 
User choose input it or generate randomly.
Labs 3
Task3
V1
Makarov A. S
24.03.24
"""


@infinity_program
def main():
    """Perform Task3"""
    text = input_or_generate_seq(generate_random_string)
    count = 0
    for i in text:
        if i in punctuation:
            count += 1
    print(''.join(text))
    print(f"Count of punctuation: {count}")


if __name__ == '__main__':
    main()
