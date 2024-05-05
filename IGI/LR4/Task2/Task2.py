from File_work import write_records, archive_file
from text_analyzer import analyze_text


def output_result(results: dict):
    """
    This function prints analyzing text results
    """
    for key, value in results.items():
        if type(value) is list:
            print(f"{key}: ")
            for item in value:
                print(item)
        elif type(value) is dict:
            print(f"{key}: ", end='')
            for _ in value:
                print(f"{_}: {value[_]}")
        else:
            print(f"{key}: {value}")
        print()


def main():
    origin_text = "text.txt"
    with open(origin_text, 'r', encoding='utf-8') as file:
        text = file.read()

    parse_result_file = "parse_result.txt"
    archive_result_file = "parse_result.zip"

    result = analyze_text(text)
    output_result(result)
    write_records(result, parse_result_file)
    archive_file(parse_result_file, archive_result_file)

    print("Analysis completed and results saved.")


if __name__ == "__main__":
    main()
