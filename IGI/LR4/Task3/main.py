from SinusSires import SinusSeries


def main():
    power_series = SinusSeries(0.0000000001)

    power_series.draw_graphs("plot.png")

    metrics = power_series.compute_statistics()

    for _ in metrics:
        print(f'{_}: {metrics[_]}')


if __name__ == "__main__":
    main()
