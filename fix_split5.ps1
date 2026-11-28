$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
$lines = $content.Length
"Total lines: $lines"

# Part 1: lines 1-200 (u8R"( ... )")
$part1 = $content[0..199]
"Part1: $(($part1 -join "`n").Length) chars"

# Part 2: lines 201-456 (u8R"( ... )")
$part2 = $content[200..455]
"Part2: $(($part2 -join "`n").Length) chars"

# Part 3: lines 457-700 (u8R"( ... )")
$part3 = $content[456..699]
"Part3: $(($part3 -join "`n").Length) chars"

# Part 4: lines 701-916 (u8R"( ... )")
$part4 = $content[700..915]
"Part4: $(($part4 -join "`n").Length) chars"

# Part 5: lines 917-1172 (u8R"( ... )")
$part5 = $content[916..($lines-1)]
"Part5: $(($part5 -join "`n").Length) chars"

$newLines = @()

# Part 1: add closing )")
foreach ($l in $part1) { $newLines += $l }
$newLines += ')")'

# Part 2: add opening u8R"( and closing )")
$newLines += 'u8R"('
foreach ($l in $part2) { $newLines += $l }
$newLines += ')")'

# Part 3: add opening u8R"( and closing )")
$newLines += 'u8R"('
foreach ($l in $part3) { $newLines += $l }
$newLines += ')")'

# Part 4: add opening u8R"( and closing )")
$newLines += 'u8R"('
foreach ($l in $part4) { $newLines += $l }
$newLines += ')")'

# Part 5: add opening u8R"(
$newLines += 'u8R"('
foreach ($l in $part5) { $newLines += $l }

$newLines | Set-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

$verify = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
"New total lines: $($verify.Length)"