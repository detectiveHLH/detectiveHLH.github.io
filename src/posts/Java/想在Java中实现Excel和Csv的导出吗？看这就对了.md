---
date: 2019-03-10
permalink: /posts/230840.html
category:
- Java
tag:
- Java
---

# 想在Java中实现Excel和Csv的导出吗？看这就对了

## 前言
最近在项目中遇到一个需求，需要后端提供一个下载Csv和Excel表格的接口。这个接口接收前端的查询参数，针对这些参数对数据库做查询操作。将查询到的结果生成Excel和Csv文件，再以字节流的形式返回给前端。

前端拿到这个流文件之后，最开始用ajax来接收，但是前端发送的请求却被浏览器cancel掉了。后来发现，发展了如此之久的Ajax居然不支持流文件下载。后来前端换成了最原始的XMLHttpRequest，才修复了这个问题。

首先给出项目源码的地址。这是[源码](https://github.com/detectiveHLH/spring-csv-excel-demo)，欢迎大家star或者提MR。

## Csv
### 新建controller
先来一个简单的例子。首先在controller中新建这样一个接口。
```Java
@GetMapping("csv")
public void csv(
        HttpServletRequest request,
        HttpServletResponse response
) throws IOException {
    String fileName = this.getFileName(request, "测试数据.csv");
    response.setContentType(MediaType.APPLICATION_OCTET_STREAM.toString());
    response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");

    LinkedHashMap<String, Object> header = new LinkedHashMap<>();
    LinkedHashMap<String, Object> body = new LinkedHashMap<>();
    header.put("1", "姓名");
    header.put("2", "年龄");
    List<LinkedHashMap<String, Object>> data = new ArrayList<>();
    body.put("1", "小明");
    body.put("2", "小王");
    data.add(header);
    data.add(body);
    data.add(body);
    data.add(body);
    FileCopyUtils.copy(ExportUtil.exportCSV(data), response.getOutputStream());
}
```

其中`this.getFileName(request, "测试数据.csv")`函数是用来获取导出文件名的函数。单独提出来是因为不同浏览器使用的默认的编码不同。例如，如果使用默认的UTF-8编码。在chrome浏览器中下载会出现中文乱码。代码如下。
```Java
private String getFileName(HttpServletRequest request, String name) throws UnsupportedEncodingException {
    String userAgent = request.getHeader("USER-AGENT");
    return userAgent.contains("Mozilla") ? new String(name.getBytes(), "ISO8859-1") : name;
}
```

`response.getOutputStream()`则是用于创建字节输出流，在导出csv文件的controller代码结尾，通过工具类中的复制文件函数将字节流写入到输出流中，从而将csv文件以字节流的形式返回给客户端。

当前端通过http请求访问服务器接口的时候，http中的所有的请求信息都会封装在`HttpServletRequest`对象中。例如，你可以通过这个对象获取到请求的URL地址，请求的方式，请求的客户端IP和完整主机名，Web服务器的IP和完整主机名，请求行中的参数，获取请求头的参数等等。

针对每一次的HTTP请求，服务器会自动创建一个`HttpServletResponse`对象和请求对象相对应。响应对象可以对当前的请求进行重定向，自定义响应体的头部，设置返回流等等。


### 新建导出工具类
我们新建一个导出工具类，来专门负责导出各种格式的文件。代码如下。
```Java
public class ExportUtil {

    public static byte[] exportCSV(List<LinkedHashMap<String, Object>> exportData) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        BufferedWriter buffCvsWriter = null;
        try {
            buffCvsWriter = new BufferedWriter(new OutputStreamWriter(out, StandardCharsets.UTF_8));
            // 将body数据写入表格
            for (Iterator<LinkedHashMap<String, Object>> iterator = exportData.iterator(); iterator.hasNext(); ) {
                fillDataToCsv(buffCvsWriter, iterator.next());
                if (iterator.hasNext()) {
                    buffCvsWriter.newLine();
                }
            }
            // 刷新缓冲
            buffCvsWriter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 释放资源
            if (buffCvsWriter != null) {
                try {
                    buffCvsWriter.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return out.toByteArray();
    }

    private static void fillDataToCsv(BufferedWriter buffCvsWriter, LinkedHashMap row) throws IOException {
        Map.Entry propertyEntry;
        for (Iterator<Map.Entry> propertyIterator = row.entrySet().iterator(); propertyIterator.hasNext(); ) {
            propertyEntry = propertyIterator.next();
            buffCvsWriter.write("\"" + propertyEntry.getValue().toString() + "\"");
            if (propertyIterator.hasNext()) {
                buffCvsWriter.write(",");
            }
        }
    }
}
```
`fillDataToCsv`主要是抽离出来为csv填充一行一行的数据的。

### 运行
然后运行项目，调用http://localhost:8080/csv，就可以下载示例的csv文件。示例如下。

![img](/images/230840/csv-demo.jpeg)

## Excel
### 新建controller
新建下载xlsx文件的接口。
```Java
@GetMapping("xlsx")
public void xlsx(
        HttpServletRequest request,
        HttpServletResponse response
) throws IOException {
    String fileName = this.getFileName(request, "测试数据.xlsx");
    response.setContentType(MediaType.APPLICATION_OCTET_STREAM.toString());
    response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");

    List<LinkedHashMap<String, Object>> datas = new ArrayList<>();
    LinkedHashMap<String, Object> data = new LinkedHashMap<>();
    data.put("1", "姓名");
    data.put("2", "年龄");
    datas.add(data);
    for (int i = 0; i < 5; i++) {
        data = new LinkedHashMap<>();
        data.put("1", "小青");
        data.put("2", "小白");
        datas.add(data);
    }

    Map<String, List<LinkedHashMap<String, Object>>> tableData = new HashMap<>();
    tableData.put("日报表", datas);
    tableData.put("周报表", datas);
    tableData.put("月报表", datas);

    FileCopyUtils.copy(ExportUtil.exportXlsx(tableData), response.getOutputStream());
}
```

### 补充工具类
上面新建的导出工具类中，只有导出csv的函数，接下来我们要添加导出xlsx的函数。
```Java
public static byte[] exportXlsx(Map<String, List<LinkedHashMap<String, Object>>> tableData) {
    ByteArrayOutputStream out = new ByteArrayOutputStream();

    try {
        HSSFWorkbook workbook = new HSSFWorkbook();
        // 创建多个sheet
        for (Map.Entry<String, List<LinkedHashMap<String, Object>>> entry : tableData.entrySet()) {
            fillDataToXlsx(workbook.createSheet(entry.getKey()), entry.getValue());
        }

        workbook.write(out);
    } catch (IOException e) {
        e.printStackTrace();
    }
    return out.toByteArray();
}

/**
 * 将linkedHashMap中的数据，写入xlsx表格中
 *
 * @param sheet
 * @param data
 */
private static void fillDataToXlsx(HSSFSheet sheet, List<LinkedHashMap<String, Object>> data) {
    HSSFRow currRow;
    HSSFCell cell;
    LinkedHashMap row;
    Map.Entry propertyEntry;
    int rowIndex = 0;
    int cellIndex = 0;
    for (Iterator<LinkedHashMap<String, Object>> iterator = data.iterator(); iterator.hasNext(); ) {
        row = iterator.next();
        currRow = sheet.createRow(rowIndex++);
        for (Iterator<Map.Entry> propertyIterator = row.entrySet().iterator(); propertyIterator.hasNext(); ) {
            propertyEntry = propertyIterator.next();
            if (propertyIterator.hasNext()) {
                String value = String.valueOf(propertyEntry.getValue());
                cell = currRow.createCell(cellIndex++);
                cell.setCellValue(value);
            } else {
                String value = String.valueOf(propertyEntry.getValue());
                cell = currRow.createCell(cellIndex++);
                cell.setCellValue(value);
                break;
            }
        }
        if (iterator.hasNext()) {
            cellIndex = 0;
        }
    }
}
```
`fillDataToXlsx`的用途与csv一样，为xlsx文件的每一行刷上数据。

### 运行
然后运行项目，调用http://localhost:8080/xlsx，就可以下载示例的csv文件。示例如下。

![img](/images/230840/excel-demo.jpeg)

## 项目地址
最后再次给出[项目地址](https://github.com/detectiveHLH/spring-csv-excel-demo)，大家如果没有理解到其中的一些地方，不妨把项目clone下来，自己亲自操作一波。

## 参考
这是在解决请求被浏览器cancel掉的过程中，很重要的一个参考，分享给大家。
- https://www.cnblogs.com/cdemo/p/5225848.html



