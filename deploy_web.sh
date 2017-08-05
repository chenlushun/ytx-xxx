#!/usr/bin/env bash

#更新代码
git pull

#编译打包
mvn -DskipTests -P production clean package


#交易web应用
echo "deploying ytx xxx web"

kill -9 $(lsof -ti tcp:3470)
cp -rf ytx-xxx-web/target/ytx-xxx-web-1.0.0-SNAPSHOT.jar  /home/ytx/deploy/xxx/

/home/ytx/deploy/xxx/ytx-xxx-web-1.0.0-SNAPSHOT.jar &


