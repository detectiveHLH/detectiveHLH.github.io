project_path=$(pwd)

cd ./src/posts || exit

final_path=$(pwd)

get_permalink(){
  date=$(date "+%Y-%m-%d")
  curr_prefix="${date: 2: 2}${date: 5: 2}"

  last=$(head -n +1 "$1/latest_permalink.txt")
  if [ "${last: 0: 4}" = "$curr_prefix" ]; then
    echo "${curr_prefix}$((${last: 4: 1}+1))"
  else
    echo "${curr_prefix}1"
  fi

#  echo "${date: 2: 2}${date: 5: 2}"
#  echo "$last"
}


filename=$1
category=$2
date=$(date "+%Y-%m-%d")
permalink="$(get_permalink "$project_path")"

if [ -z "$filename" ]; then
  echo "filename can not be empty"
  exit 1
fi

article_temp='
---
date: '${date}'
permalink: /posts/'${permalink}'.html
category:
- '${category}'
---
'
#rm $latest_permalink
echo "$permalink" > "$project_path/latest_permalink.txt"
echo "$article_temp" > "$final_path/$category/$filename".md