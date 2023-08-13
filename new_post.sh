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
}

filename=$1
category=$2
date=$(date "+%Y-%m-%d")
permanent_number="$(get_permalink "$project_path")"

if [ -z "$filename" ]; then
  echo "filename can not be empty"
  exit 1
fi

article_temp='---
date: '${date}'
permalink: /posts/'${permanent_number}'.html
category:
- '${category}'
---'

mkdir "$project_path/src/.vuepress/public/images/${category}/${permanent_number}"
echo "$permanent_number" > "$project_path/latest_permalink.txt"
echo "$article_temp" > "$final_path/$category/$filename".md