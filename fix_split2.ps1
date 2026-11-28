$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

# Part 1: lines 1-554 (u8R"( ... )")
$part1 = $content[0..553]

# Part 2: lines 555-916 (u8R"( ... )")
$part2 = $content[554..915]

# Part 3: lines 917-1171 (u8R"( ... )")
$part3 = $content[916..1170]

$newLines = @()

# Part 1: add closing )")
foreach ($l in $part1) { $newLines += $l }

# Part 2: add opening u8R"( and closing )")
$newLines += 'u8R"('
foreach ($l in $part2) { $newLines += $l }
$newLines += ')")'

# Part 3: add opening u8R"( and closing )")
$newLines += 'u8R"('
foreach ($l in $part3) { $newLines += $l }
$newLines += ')")'

$newLines | Set-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

$verify = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
"Total lines: $($verify.Length)"

$p1 = ($part1 -join "`n").Length
$p2 = ($part2 -join "`n").Length
$p3 = ($part3 -join "`n").Length
Write-Host "Part1: $p1 chars"
Write-Host "Part2: $p2 chars"
Write-Host "Part3: $p3 chars"