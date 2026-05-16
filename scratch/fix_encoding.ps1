$path = "src/pages/HubDashboard.jsx"
$content = Get-Content $path
$content[509] = '            zh: "管理报告：通信主权在邻居们的愿景下得到巩固。迈向精英级数字生态系统。",'
$content | Set-Content $path -Encoding UTF8
