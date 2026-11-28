$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
$lines = $content.Length
"Total lines: $lines"

# Part 1: lines 1-350 (u8R"( ...  };)
$part1 = $content[0..349]
$p1 = ($part1 -join "`n").Length
"Part1: $p1 chars"

# Part 2: lines 351-756 (  } ...  };)
$part2 = $content[350..755]
$p2 = ($part2 -join "`n").Length
"Part2: $p2 chars"

# Part 3: lines 757-1179 (  ... )")
$part3 = $content[756..($lines-1)]
$p3 = ($part3 -join "`n").Length
"Part3: $p3 chars"

# Build new file
$newLines = @()

# Part 1: add closing )")
foreach ($l in $part1) { $newLines += $l }
$newLines += ')")'

# Part 2: add opening u8R"( and closing )")
$newLines += 'u8R"('
foreach ($l in $part2) { $newLines += $l }
$newLines += ')")'

# Part 3: add opening u8R"(
$newLines += 'u8R"('
foreach ($l in $part3) { $newLines += $l }

$newLines | Set-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

$verify = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
"New total lines: $($verify.Length)"