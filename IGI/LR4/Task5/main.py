from computing import Matrix


def main():
    n, m = map(int, input().split())
    matrix = Matrix(n, m)
    column = matrix.min_sum_in_column()
    print(matrix.matrix)
    print(f"Column with smallest sum: {column + 1}")
    print(f"It's median\nNumPy: {matrix.median(column)}\tMy median: {matrix.my_median(column)}")


if __name__ == "__main__":
    main()
