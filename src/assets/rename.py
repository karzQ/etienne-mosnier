import os, unidecode
from unidecode import unidecode

files = []

path = os.path.abspath("./img")
dirs = next(os.walk(path), (None, None, []))[1]  # [] if no file

print(path)

for dir in dirs:
    for file in os.listdir(os.path.abspath(f'./img/{dir}')):
        prefix = file.split('-')[0].strip()
        if prefix.lower() == 'intro':
            prefix = '0'
        splitted_name = file.split('-')[1:]
        joined_str = '-'.join(splitted_name).lower().strip().replace(' ', '_').replace(',', '').replace("’", '_')
        joined_str = unidecode(joined_str)
        os.rename(os.path.abspath(f'./img/{dir}/{file}'), os.path.abspath(f'./img/{dir}/{prefix}-{joined_str}'))