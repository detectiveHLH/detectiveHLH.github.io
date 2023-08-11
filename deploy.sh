rm -rf src/.vuepress/dist

yarn docs:build

cp -r src/.vuepress/dist/* ./

git add  . && git commit -m "deploy: release new version" && git push origin master
