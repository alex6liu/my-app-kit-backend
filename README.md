- 导出数据库
  
  windows：
    mongoexport -d dbname -c collectionname -o file --type json/csv -f field
        参数说明：
            -d ：数据库名
            -c ：collection名
            -o ：输出的文件名
            --type ： 输出的格式，默认为json
            -f ：输出的字段，如果-type为csv，则需要加上-f "字段名"
            
    进入 C:\Program Files\MongoDB\Server\4.0\bin
    在cmd中
    mongoexport -d all_the_backend -c bookstores -o 路径

- 导入数据库
    mongoimport -d dbname -c collectionname --file filename --headerline --type json/csv -f field
        参数说明：
            -d ：数据库名
            -c ：collection名
            --type ：导入的格式默认json
            -f ：导入的字段名
            --headerline ：如果导入的格式是csv，则可以使用第一行的标题作为导入的字段
            --file ：要导入的文件