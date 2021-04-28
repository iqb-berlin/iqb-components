publish-lib:
	npm run build:lib
	cp README.md dist
	npm login
	npm publish dist

tag-major:
	scripts/new_version.py major
	make publish-lib

tag-minor:
	scripts/new_version.py minor
	make publish-lib

tag-patch:
	scripts/new_version.py patch
	make publish-lib
