publish-lib:
	npm run build:lib
	cp README.md dist
	npm login
	npm publish dist

update-docs:
	ng build --prod
	rm -rf docs
	mkdir docs
	cp -r dist/showcase/* docs
	rm -rf dist/*

tag-major:
	make update-docs
	scripts/new_version.py major
	make publish-lib

tag-minor:
	make update-docs
	scripts/new_version.py minor
	make publish-lib

tag-patch:
	make update-docs
	scripts/new_version.py patch
	make publish-lib
