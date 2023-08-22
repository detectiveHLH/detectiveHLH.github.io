import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as l,c as d,a as e,b as n,d as t,f as a}from"./app-304d4f7f.js";const v="/images/230840/csv-demo.jpeg",o="/images/230840/excel-demo.jpeg",c={},u=e("h1",{id:"想在java中实现excel和csv的导出吗-看这就对了",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#想在java中实现excel和csv的导出吗-看这就对了","aria-hidden":"true"},"#"),n(" 想在Java中实现Excel和Csv的导出吗？看这就对了")],-1),b=e("h2",{id:"前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),n(" 前言")],-1),m=e("p",null,"最近在项目中遇到一个需求，需要后端提供一个下载Csv和Excel表格的接口。这个接口接收前端的查询参数，针对这些参数对数据库做查询操作。将查询到的结果生成Excel和Csv文件，再以字节流的形式返回给前端。",-1),p=e("p",null,"前端拿到这个流文件之后，最开始用ajax来接收，但是前端发送的请求却被浏览器cancel掉了。后来发现，发展了如此之久的Ajax居然不支持流文件下载。后来前端换成了最原始的XMLHttpRequest，才修复了这个问题。",-1),h={href:"https://github.com/detectiveHLH/spring-csv-excel-demo",target:"_blank",rel:"noopener noreferrer"},g=a(`<h2 id="csv" tabindex="-1"><a class="header-anchor" href="#csv" aria-hidden="true">#</a> Csv</h2><h3 id="新建controller" tabindex="-1"><a class="header-anchor" href="#新建controller" aria-hidden="true">#</a> 新建controller</h3><p>先来一个简单的例子。首先在controller中新建这样一个接口。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@GetMapping(&quot;csv&quot;)
public void csv(
        HttpServletRequest request,
        HttpServletResponse response
) throws IOException {
    String fileName = this.getFileName(request, &quot;测试数据.csv&quot;);
    response.setContentType(MediaType.APPLICATION_OCTET_STREAM.toString());
    response.setHeader(&quot;Content-Disposition&quot;, &quot;attachment; filename=\\&quot;&quot; + fileName + &quot;\\&quot;;&quot;);

    LinkedHashMap&lt;String, Object&gt; header = new LinkedHashMap&lt;&gt;();
    LinkedHashMap&lt;String, Object&gt; body = new LinkedHashMap&lt;&gt;();
    header.put(&quot;1&quot;, &quot;姓名&quot;);
    header.put(&quot;2&quot;, &quot;年龄&quot;);
    List&lt;LinkedHashMap&lt;String, Object&gt;&gt; data = new ArrayList&lt;&gt;();
    body.put(&quot;1&quot;, &quot;小明&quot;);
    body.put(&quot;2&quot;, &quot;小王&quot;);
    data.add(header);
    data.add(body);
    data.add(body);
    data.add(body);
    FileCopyUtils.copy(ExportUtil.exportCSV(data), response.getOutputStream());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>this.getFileName(request, &quot;测试数据.csv&quot;)</code>函数是用来获取导出文件名的函数。单独提出来是因为不同浏览器使用的默认的编码不同。例如，如果使用默认的UTF-8编码。在chrome浏览器中下载会出现中文乱码。代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>private String getFileName(HttpServletRequest request, String name) throws UnsupportedEncodingException {
    String userAgent = request.getHeader(&quot;USER-AGENT&quot;);
    return userAgent.contains(&quot;Mozilla&quot;) ? new String(name.getBytes(), &quot;ISO8859-1&quot;) : name;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>response.getOutputStream()</code>则是用于创建字节输出流，在导出csv文件的controller代码结尾，通过工具类中的复制文件函数将字节流写入到输出流中，从而将csv文件以字节流的形式返回给客户端。</p><p>当前端通过http请求访问服务器接口的时候，http中的所有的请求信息都会封装在<code>HttpServletRequest</code>对象中。例如，你可以通过这个对象获取到请求的URL地址，请求的方式，请求的客户端IP和完整主机名，Web服务器的IP和完整主机名，请求行中的参数，获取请求头的参数等等。</p><p>针对每一次的HTTP请求，服务器会自动创建一个<code>HttpServletResponse</code>对象和请求对象相对应。响应对象可以对当前的请求进行重定向，自定义响应体的头部，设置返回流等等。</p><h3 id="新建导出工具类" tabindex="-1"><a class="header-anchor" href="#新建导出工具类" aria-hidden="true">#</a> 新建导出工具类</h3><p>我们新建一个导出工具类，来专门负责导出各种格式的文件。代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>public class ExportUtil {

    public static byte[] exportCSV(List&lt;LinkedHashMap&lt;String, Object&gt;&gt; exportData) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        BufferedWriter buffCvsWriter = null;
        try {
            buffCvsWriter = new BufferedWriter(new OutputStreamWriter(out, StandardCharsets.UTF_8));
            // 将body数据写入表格
            for (Iterator&lt;LinkedHashMap&lt;String, Object&gt;&gt; iterator = exportData.iterator(); iterator.hasNext(); ) {
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
        for (Iterator&lt;Map.Entry&gt; propertyIterator = row.entrySet().iterator(); propertyIterator.hasNext(); ) {
            propertyEntry = propertyIterator.next();
            buffCvsWriter.write(&quot;\\&quot;&quot; + propertyEntry.getValue().toString() + &quot;\\&quot;&quot;);
            if (propertyIterator.hasNext()) {
                buffCvsWriter.write(&quot;,&quot;);
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>fillDataToCsv</code>主要是抽离出来为csv填充一行一行的数据的。</p><h3 id="运行" tabindex="-1"><a class="header-anchor" href="#运行" aria-hidden="true">#</a> 运行</h3>`,14),x={href:"http://localhost:8080/csv%EF%BC%8C%E5%B0%B1%E5%8F%AF%E4%BB%A5%E4%B8%8B%E8%BD%BD%E7%A4%BA%E4%BE%8B%E7%9A%84csv%E6%96%87%E4%BB%B6%E3%80%82%E7%A4%BA%E4%BE%8B%E5%A6%82%E4%B8%8B%E3%80%82",target:"_blank",rel:"noopener noreferrer"},f=a('<figure><img src="'+v+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="excel" tabindex="-1"><a class="header-anchor" href="#excel" aria-hidden="true">#</a> Excel</h2><h3 id="新建controller-1" tabindex="-1"><a class="header-anchor" href="#新建controller-1" aria-hidden="true">#</a> 新建controller</h3><p>新建下载xlsx文件的接口。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@GetMapping(&quot;xlsx&quot;)
public void xlsx(
        HttpServletRequest request,
        HttpServletResponse response
) throws IOException {
    String fileName = this.getFileName(request, &quot;测试数据.xlsx&quot;);
    response.setContentType(MediaType.APPLICATION_OCTET_STREAM.toString());
    response.setHeader(&quot;Content-Disposition&quot;, &quot;attachment; filename=\\&quot;&quot; + fileName + &quot;\\&quot;;&quot;);

    List&lt;LinkedHashMap&lt;String, Object&gt;&gt; datas = new ArrayList&lt;&gt;();
    LinkedHashMap&lt;String, Object&gt; data = new LinkedHashMap&lt;&gt;();
    data.put(&quot;1&quot;, &quot;姓名&quot;);
    data.put(&quot;2&quot;, &quot;年龄&quot;);
    datas.add(data);
    for (int i = 0; i &lt; 5; i++) {
        data = new LinkedHashMap&lt;&gt;();
        data.put(&quot;1&quot;, &quot;小青&quot;);
        data.put(&quot;2&quot;, &quot;小白&quot;);
        datas.add(data);
    }

    Map&lt;String, List&lt;LinkedHashMap&lt;String, Object&gt;&gt;&gt; tableData = new HashMap&lt;&gt;();
    tableData.put(&quot;日报表&quot;, datas);
    tableData.put(&quot;周报表&quot;, datas);
    tableData.put(&quot;月报表&quot;, datas);

    FileCopyUtils.copy(ExportUtil.exportXlsx(tableData), response.getOutputStream());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="补充工具类" tabindex="-1"><a class="header-anchor" href="#补充工具类" aria-hidden="true">#</a> 补充工具类</h3><p>上面新建的导出工具类中，只有导出csv的函数，接下来我们要添加导出xlsx的函数。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>public static byte[] exportXlsx(Map&lt;String, List&lt;LinkedHashMap&lt;String, Object&gt;&gt;&gt; tableData) {
    ByteArrayOutputStream out = new ByteArrayOutputStream();

    try {
        HSSFWorkbook workbook = new HSSFWorkbook();
        // 创建多个sheet
        for (Map.Entry&lt;String, List&lt;LinkedHashMap&lt;String, Object&gt;&gt;&gt; entry : tableData.entrySet()) {
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
private static void fillDataToXlsx(HSSFSheet sheet, List&lt;LinkedHashMap&lt;String, Object&gt;&gt; data) {
    HSSFRow currRow;
    HSSFCell cell;
    LinkedHashMap row;
    Map.Entry propertyEntry;
    int rowIndex = 0;
    int cellIndex = 0;
    for (Iterator&lt;LinkedHashMap&lt;String, Object&gt;&gt; iterator = data.iterator(); iterator.hasNext(); ) {
        row = iterator.next();
        currRow = sheet.createRow(rowIndex++);
        for (Iterator&lt;Map.Entry&gt; propertyIterator = row.entrySet().iterator(); propertyIterator.hasNext(); ) {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>fillDataToXlsx</code>的用途与csv一样，为xlsx文件的每一行刷上数据。</p><h3 id="运行-1" tabindex="-1"><a class="header-anchor" href="#运行-1" aria-hidden="true">#</a> 运行</h3>`,10),q={href:"http://localhost:8080/xlsx%EF%BC%8C%E5%B0%B1%E5%8F%AF%E4%BB%A5%E4%B8%8B%E8%BD%BD%E7%A4%BA%E4%BE%8B%E7%9A%84csv%E6%96%87%E4%BB%B6%E3%80%82%E7%A4%BA%E4%BE%8B%E5%A6%82%E4%B8%8B%E3%80%82",target:"_blank",rel:"noopener noreferrer"},E=e("figure",null,[e("img",{src:o,alt:"img",tabindex:"0",loading:"lazy"}),e("figcaption",null,"img")],-1),y=e("h2",{id:"项目地址",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#项目地址","aria-hidden":"true"},"#"),n(" 项目地址")],-1),S={href:"https://github.com/detectiveHLH/spring-csv-excel-demo",target:"_blank",rel:"noopener noreferrer"},_=e("h2",{id:"参考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#参考","aria-hidden":"true"},"#"),n(" 参考")],-1),B=e("p",null,"这是在解决请求被浏览器cancel掉的过程中，很重要的一个参考，分享给大家。",-1),w={href:"https://www.cnblogs.com/cdemo/p/5225848.html",target:"_blank",rel:"noopener noreferrer"};function k(H,C){const i=s("ExternalLinkIcon");return l(),d("div",null,[u,b,m,p,e("p",null,[n("首先给出项目源码的地址。这是"),e("a",h,[n("源码"),t(i)]),n("，欢迎大家star或者提MR。")]),g,e("p",null,[n("然后运行项目，调用"),e("a",x,[n("http://localhost:8080/csv，就可以下载示例的csv文件。示例如下。"),t(i)])]),f,e("p",null,[n("然后运行项目，调用"),e("a",q,[n("http://localhost:8080/xlsx，就可以下载示例的csv文件。示例如下。"),t(i)])]),E,y,e("p",null,[n("最后再次给出"),e("a",S,[n("项目地址"),t(i)]),n("，大家如果没有理解到其中的一些地方，不妨把项目clone下来，自己亲自操作一波。")]),_,B,e("ul",null,[e("li",null,[e("a",w,[n("https://www.cnblogs.com/cdemo/p/5225848.html"),t(i)])])])])}const A=r(c,[["render",k],["__file","230840.html.vue"]]);export{A as default};
