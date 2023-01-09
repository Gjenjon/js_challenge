$url = 'https://news.yahoo.co.jp/rss/topics/business.xml';
$xml = file_get_contents($url);
header('Content-type: application/xml; charset=UTF-8');
print $xml;



<!-- https://web.syu-u.com/blog/?p=822 -->