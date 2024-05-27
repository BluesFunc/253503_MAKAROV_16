import zipfile


def write_records(records: dict, filename):
    with open(filename, 'w') as file:
        for _ in records:
            file.write(f"\n{_}: {records[_]}\n")


def archive_file(source_filename, archive_filename):
    with zipfile.ZipFile(archive_filename, 'a') as archive:
        archive.write(archive_filename, source_filename)
