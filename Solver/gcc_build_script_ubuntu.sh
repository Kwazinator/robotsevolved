gcc -std=c99 -O3 -c -fPIC -o _ricochet.o ricochet.c
gcc -shared -o _ricochet _ricochet.o
rm _ricochet.o