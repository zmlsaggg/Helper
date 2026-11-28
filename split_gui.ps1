$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

$part1 = $content[0..455]
$part1 | Set-Content Source/UI/Panorama/CreateGUI_part1.js -Encoding UTF8

$part2 = $content[456..553]
$part2 | Set-Content Source/UI/Panorama/CreateGUI_part2.js -Encoding UTF8

$part3 = $content[554..749]
$part3 | Set-Content Source/UI/Panorama/CreateGUI_part3.js -Encoding UTF8

$part4 = $content[750..915]
$part4 | Set-Content Source/UI/Panorama/CreateGUI_part4.js -Encoding UTF8

$part5 = $content[916..1171]
$part5 | Set-Content Source/UI/Panorama/CreateGUI_part5.js -Encoding UTF8

$p1 = ($part1 -join "`n").Length
$p2 = ($part2 -join "`n").Length
$p3 = ($part3 -join "`n").Length
$p4 = ($part4 -join "`n").Length
$p5 = ($part5 -join "`n").Length
Write-Host "Part1: $p1 chars"
Write-Host "Part2: $p2 chars"
Write-Host "Part3: $p3 chars"
Write-Host "Part4: $p4 chars"
Write-Host "Part5: $p5 chars"