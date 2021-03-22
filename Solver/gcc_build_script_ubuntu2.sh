gcc -std=c99 -O3 -c -fPIC -o _ricochet2.o ricochet2.c
gcc -shared -o _ricochet2 _ricochet2.o
rm _ricochet2.o