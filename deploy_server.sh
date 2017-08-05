#!/usr/bin/env bash

#更新代码
git pull

#编译打包
mvn -DskipTests -P production clean package

#交易服务
echo "Deploying ytx xxx server"

kill -9 $(lsof -ti tcp:3409)
cp -rf ytx-xxx-server/target/ytx-xxx-server-1.0.0-SNAPSHOT.jar  /home/ytx/deploy/xxx/

/home/ytx/deploy/xxx/ytx-xxx-server-1.0.0-SNAPSHOT.jar &

