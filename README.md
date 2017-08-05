# ytx-xxx


Maven提供了archetype帮助我们快速构建项目骨架，很便捷。但是，中央仓库中的可能不满足我们的需求，
构建好项目后，需要修改很多信息，甚是麻烦，那么如何自定义个archetype就显得很有必要。


# 如何使用

本工程是搭建好的一个骨架，用于快速构建项目

* 1、 工程目录下执行
```bash
mvn archetype:create-from-project 
```

```bash
cd target/generated-sourced/archetype 
```

然后执行
```bash

mvn install
```

一个archetype就安装到本地库，在idea中就可以被选择用于构建项目
