project_path=$(pwd)

cd ./src/posts || exit
final_path=$(pwd)

# 通过上次的永久链接生成下一篇文章的永久链接
get_permalink(){
  date=$(date "+%Y-%m-%d")
  curr_prefix="${date: 2: 2}${date: 5: 2}"

  last=$(head -n +1 "$1/latest_permalink.txt")
  if [ "${last: 0: 4}" = "$curr_prefix" ]; then
    echo "${curr_prefix}$((${last: 4}+1))"
  else
    echo "${curr_prefix}1"
  fi
}

filename=$1
category=$2
date=$(date "+%Y-%m-%d")

# 检查 filename 是否为空
if [ -z "$filename" ]; then
  echo "filename can not be empty"
  exit 1
fi

# post 目录不存在则直接创建目录
if [ ! -d "$final_path/$category" ]; then
  mkdir "$final_path/$category"
fi

# 放图片的 category 目录不存在, 也直接新建目录
image_category_dir=$project_path/src/.vuepress/public/images/
if [ ! -d "$image_category_dir" ]; then
  mkdir "$image_category_dir"
fi


# 新文章的 formatter 模版
permanent_number="$(get_permalink "$project_path")"
article_temp='---
date: '${date}'
permalink: /posts/'${permanent_number}'.html
category:
- '${category}'
---

# '${filename}'
'

new_post_dir=$project_path/src/.vuepress/public/images/${permanent_number}
# 为新文章创建单独的文件夹
mkdir "$new_post_dir"
# 打开这个目录, 方便往里面丢图片
open "$new_post_dir"
# 更新「上次永久链接」的值
echo "$permanent_number" > "$project_path/latest_permalink.txt"
# 生成文件, 并将 formatter 模版写入到新文件
echo "$article_temp" > "$final_path/$category/$filename".md