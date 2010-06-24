#!/bin/sh

currentdir=`pwd`

rm -rf /tmp/QuoteSelection/
rm QuoteSelection.zip
mkdir /tmp/QuoteSelection/
cp -Ra * /tmp/QuoteSelection/
rm /tmp/QuoteSelection/build.sh
cd /tmp
zip -r ./QuoteSelection.zip QuoteSelection/
rm -rf QuoteSelection
mv -f QuoteSelection.zip $currentdir