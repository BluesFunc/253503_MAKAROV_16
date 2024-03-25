from string import punctuation

from Extend_Func import infinity_program

"""
Given base text. Program performs tasks with is.
Labs 3
Task4
V1
Makarov A. S
24.03.24
"""

base_text = ("So she was considering in her own mind, as well as she could, for the hot day made her feel"
             "very sleepy and stupid, whether the pleasure of making a daisy-chain would be worth the trouble"
             "of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by"
             "her")


@infinity_program
def main():
    """Perform Task4"""
    global base_text
    word_list = ''.join([i for i in base_text if i not in punctuation]).split(' ')
    sub_task_a(word_list)
    sub_task_b(word_list)
    sub_task_c(word_list)


def sub_task_a(words: list[str]):
    """
    Find count of words, that start from constraints
    """
    print("\nSub task A")
    the_vowels = ["a", "e", "u", "i", "o"]
    N = 0
    for i in words:
        if i[0].lower() not in the_vowels:
            N += 1
    print(f"Count of words, that start from constraints: {N}")


def sub_task_b(words: list[str]):
    """Find middle length of words. Then print words, that length equal middle length"""
    print("\nSub task B")
    N = 0
    ans = []
    for i in words:
        N += len(i)
    mid_len = N // len(words)
    print(f"Middle len of the words: {mid_len}")
    for i in words:
        if len(i) == mid_len:
            ans.append(i)

    if len(ans) == 0:
        print(f"Words with len {mid_len} don't exist in a text")
    else:
        for i in ans:
            print(i)


def sub_task_c(words):
    """Print each 7th word in text"""
    print("\nSub task C")
    for i in range(0,len(words), 7):
        print(words[i])


if __name__ == "__main__":
    main()
