#!/usr/bin/python3
"""This script shall be used to create a new release.

It consists of several steps:

STEP 1 - Update version:
A parameter has to be passed which can be one of the following: 'major'/'minor'/'patch'.
Depending on this parameter the version of the software will be updated in the
corresponding file. The file which holds this information can be set at the top
of the script with the VERSION_FILE variable and the regular expression to find
the string can be set as well.

STEP 2 - Run Tests:
Starting the software stack via docker and run the tests.
Thise tests may change additional files, which have to be commited as well.

STEP 3 - Git commit and tag
Several steps are taken to update the git repository. The shell commands are the following:
    git add {VERSION_FILE}
    git commit -m "Update version to {new_version}"
    git push
    git tag {new_version}
    git push origin {new_version}
"""
import sys
import time
import re
import subprocess

VERSION_FILE = 'package.json'
VERSION_REGEX = '(?<=version": ")(.*)(?=")'
ADDITIONAL_VERSION_FILES = ['src/app/components/package.json']
ADDITIONAL_FILES_TO_COMMIT = ['package-lock.json', 'docs/*']


def _check_prerequisites():
    # Parameters present?
    if len(sys.argv) < 2:
        sys.exit('ERROR: No parameter given. Use \'major\'/\'minor\'/\'patch\'!')
    # on branch master?
    result = subprocess.run("git rev-parse --abbrev-ref HEAD",
                            text=True, shell=True, check=True, capture_output=True)
    if result.stdout.rstrip() != 'master':
        sys.exit('ERROR: Not on master branch!')
    # pulled?
    result = subprocess.run("git fetch origin --dry-run",
                            text=True, shell=True, check=True, capture_output=True)
    if result.stderr.rstrip() != '':
        sys.exit('ERROR: Not up to date with remote branch!')


def _parse_version() -> str:
    match = pattern.search(file_content)
    if match:
        return match.group()
    else:
        sys.exit('Version pattern not found in file. Check your regex!')


def _update_version_in_file(new_version):
    print(f"Updating Version in {VERSION_FILE}")
    new_file_content = pattern.sub(new_version, file_content)
    with open(VERSION_FILE, 'w') as f:
        f.write(new_file_content)


def _update_version_in_additional_files(new_version):
    for file in ADDITIONAL_VERSION_FILES:
        print(f"Updating Version in {file}")
        with open(file, 'r') as f:
            additional_file_content = f.read()
        with open(file, 'w') as f:
            new_additional_file_content = pattern.sub(new_version, additional_file_content)
            f.write(new_additional_file_content)


def _increment_version(old_version):
    version_part = sys.argv[1]
    old_version_as_list = old_version.split('.')
    if version_part == 'major':
        new_version = f'{int(old_version_as_list[0]) + 1}.0.0'
    elif version_part == 'minor':
        new_version = f'{old_version_as_list[0]}.{int(old_version_as_list[1]) + 1}.0'
    else:
        new_version = f'{old_version_as_list[0]}.{old_version_as_list[1]}.{int(old_version_as_list[2]) + 1}'
    return new_version


def _run_tests():
    time.sleep(10)
    subprocess.run('ng test', shell=True, check=True)
    time.sleep(10)
    subprocess.run('ng e2e --webdriver-update=false', shell=True, check=True)

def _git_tag():
    print(f"Creating git tag for version {new_version}")
    subprocess.run(f"git add {VERSION_FILE}", shell=True, check=True)
    for file in ADDITIONAL_VERSION_FILES:
        subprocess.run(f"git add {file}", shell=True, check=True)
    for file in ADDITIONAL_FILES_TO_COMMIT:
        subprocess.run(f"git add {file}", shell=True, check=True)
    subprocess.run(f"git commit -m \"Update version to {new_version}\"", shell=True, check=True)
    subprocess.run("git push origin master", shell=True, check=True)
    subprocess.run(f"git tag {new_version}", shell=True, check=True)
    subprocess.run(f"git push origin {new_version}", shell=True, check=True)

def _undo_version_update_in_files():
    subprocess.run(f"git checkout {VERSION_FILE}", shell=True, check=True)
    for file in ADDITIONAL_VERSION_FILES:
        subprocess.run(f"git checkout {file}", shell=True, check=True)
    for file in ADDITIONAL_FILES_TO_COMMIT:
        subprocess.run(f"git checkout {file}", shell=True, check=True)


_check_prerequisites()
pattern = re.compile(VERSION_REGEX)
with open(VERSION_FILE) as version_file:
    file_content = version_file.read()
    old_version = _parse_version()

try:
    _run_tests()
    new_version = _increment_version(old_version)
    _update_version_in_file(new_version)
    _update_version_in_additional_files(new_version)
    _git_tag()
except subprocess.SubprocessError:
    _undo_version_update_in_files()
