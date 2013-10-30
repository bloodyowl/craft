all:
	./build/build.sh
dev:
	./build/dev.sh
configure:
	chmod +x ./build/build.sh
	chmod +x ./build/dev.sh