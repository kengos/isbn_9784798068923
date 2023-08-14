.PHONY: build
build:
	@docker build -t localhost/tippecanoe:1.36.0 .

.PHONY: tippecanoe
tippecanoe:
	@docker run --rm -it -v ./data:/home/tippecanoe/data localhost/tippecanoe:1.36.0
