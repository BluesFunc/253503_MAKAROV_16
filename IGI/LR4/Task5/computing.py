import numpy


class Matrix:
    def __init__(self, n, m):
        self.matrix = numpy.random.randint(0, 1000, size=(n, m))
        self.n = n
        self.m = m

    def min_sum_in_column(self):
        min_sum = 0
        for j in range(self.n):
            min_sum += self.matrix[j][0]
        min_column = 0
        for i in range(1, self.m):
            tmp = 0
            for j in range(self.n):
                tmp += self.matrix[j][i]
            if min_sum > tmp:
                min_sum = tmp
                min_column = i
        return min_column

    def median(self, column_index):
        column = []
        for i in range(self.n):
            column.append(self.matrix[i][column_index])
        return numpy.median(column)

    def my_median(self, column_index):
        column = []
        for i in range(self.n):
            column.append(self.matrix[i][column_index])
        column.sort()
        print(column)
        if self.n % 2:
            return column[self.n // 2]
        return (column[self.n // 2 - 1] + column[self.n // 2 ]) / 2
