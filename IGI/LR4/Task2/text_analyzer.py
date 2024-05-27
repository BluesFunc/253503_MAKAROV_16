import re


def max_word_count(words):
    max_word_len = len(words[0])
    i = 0
    while len(words[i]) == max_word_len:
        i += 1
    return i


def longest_word_ends_on_e(sorted_words):
    i = 0
    while sorted_words[i][-1] != 'e':
        i += 1
    return sorted_words[i]


def analyze_text(text: str):
    """
    Analyzes the text using regular expressions.
    """

    narrative_count = len(re.findall(r'[.]\s*', text))
    interrogative_count = len(re.findall(r'[?]\s*', text))
    imperative_count = len(re.findall(r'[!]\s*', text))

    sentence_count = narrative_count + interrogative_count + imperative_count

    sentence_lengths = [len(sentence) for sentence in re.split(r'[.!?]', text) if sentence.strip()]

    average_sentence_length = sum(sentence_lengths) / len(sentence_lengths)

    smileys_count = len(re.findall(r'[:;][-]*[\[\(\]\)]+', text))

    def replace_dollar(match):
        word = match.group(0)

        return f"{word[:-4]}{3 * '$'} "

    word_len = 7
    changed_text = re.sub(r"\W\w{5}\W", replace_dollar, text)
    all_words_in_text = re.findall(r"\b\w+[^\d\s]\b", text)
    all_words_in_text.sort(key=lambda x: -len(x))

    time_occurs = re.findall(r'[0-2]\d:[0-5][0-9]', text)
    max_len_word_count = max_word_count(all_words_in_text)
    longest_word_one_e = longest_word_ends_on_e(all_words_in_text)
    words_before_comma_or_dot = re.findall(r'[\w]+[.,]', text)

    return {
        "Changed text": changed_text,
        "Narrative Sentences": narrative_count,
        "Sentence Count": sentence_count,
        "Interrogative Sentences": interrogative_count,
        "Smileys Count": smileys_count,
        "Imperative Sentences": imperative_count,
        "Average Sentence Length": average_sentence_length,
        "Time count": len(time_occurs),
        "Max length word count": max_len_word_count,
        "Longest word end's on e": longest_word_one_e,
        "Words before comma or dot": words_before_comma_or_dot,
    }
