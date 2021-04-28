publish-lib:
	npm run build:lib
	cp README.md dist
	npm login
	npm publish dist

tag-major:
	make publish-lib
	scripts/new_version.py major

tag-minor:
	make publish-lib
	scripts/new_version.py minor

tag-patch:
	make publish-lib
	scripts/new_version.py patch
