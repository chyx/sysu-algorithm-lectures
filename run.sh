pandoc -t slidy -s exercise1.md -o exercise1.html --mathjax -i
pandoc -t slidy -s exercise2.md -o exercise2.html --mathjax -i
pandoc -t slidy -s exercise3.md -o exercise3.html --mathjax -i
pandoc -t slidy -s train1.md -o train1.html --mathjax -i
pandoc -t slidy -s train2.md -o train2.html --mathjax -i
dot -Tsvg 1150_1.gv -o 1150_1.svg
dot -Tsvg 1150_2.gv -o 1150_2.svg