publish:
	rm -rf build
	yarn build
	amplify publish
.PHONY: publish

