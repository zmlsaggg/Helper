$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

# Part 1: lines 1-351 (u8R"( ...  };)
$part1 = $content[0..350]
$part1 | Set-Content Source/UI/Panorama/CreateGUI_part1.js -Encoding UTF8

# Part 2: lines 352-455 (  } ... )")
$part2 = $content[351..454]
$part2 | Set-Content Source/UI/Panorama/CreateGUI_part2.js -Encoding UTF8

# Part 3: lines 456-553 (u8R"( ...  })
$part3 = $content[455..552]
$part3 | Set-Content Source/UI/Panorama/CreateGUI_part3.js -Encoding UTF8

# Part 4: lines 554-749 (}" ...  };)
$part4 = $content[553..748]
$part4 | Set-Content Source/UI/Panorama/CreateGUI_part4.js -Encoding UTF8

# Part 5: lines 750-915 (  } ... )")
$part5 = $content[749..914]
$part5 | Set-Content Source/UI/Panorama/CreateGUI_part5.js -Encoding UTF8

# Part 6: lines 916-1171 (u8R"( ... )")
$part6 = $content[915..1170]
$part6 | Set-Content Source/UI/Panorama/CreateGUI_part6.js -Encoding UTF8

$p1 = ($part1 -join "`n").Length
$p2 = ($part2 -join "`n").Length
$p3 = ($part3 -join "`n").Length
$p4 = ($part4 -join "`n").Length
$p5 = ($part5 -join "`n").Length
$p6 = ($part6 -join "`n").Length
Write-Host "Part1: $p1 chars"
Write-Host "Part2: $p2 chars"
Write-Host "Part3: $p3 chars"
Write-Host "Part4: $p4 chars"
Write-Host "Part5: $p5 chars"
Write-Host "Part6: $p6 chars"