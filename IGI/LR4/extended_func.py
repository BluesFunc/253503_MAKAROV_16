def infinity_program(func):
    def wrapper():
        while True:
            func()
            text = input("Do you want restart program? (y/n)\n")
            if text not in ('y', 'Y'):
                break

    return wrapper