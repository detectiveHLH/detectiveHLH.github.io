#!/bin/sh
cd src/.vuepress/public/images && ls

path=$(pwd)

listFiles(){
  for file in `ls $1`;
  do
    if [ -d "$1/$file" ]; then
      listFiles "$1/$file"
    else
      if [ "${file##*.}"x = "jpeg"x ]||[ "${file##*.}"x = "png"x ]||[ "${file##*.}"x = "jpg"x ]; then
#        echo "$1/$file"
#        identify "$1/$file"
        convert "$1/$file" -resize 75% "$1/$file"
      fi
    fi
  done
}

listFiles $path ""