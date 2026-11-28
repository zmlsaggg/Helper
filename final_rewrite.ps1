$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
$lines = $content.Length
"Total lines: $lines"

# Split into 4 parts, all under 16k chars
# Part 1: lines 1-350 (u8R"( ...  };)
$part1 = $content[0..349]
$p1 = ($part1 -join "`n").Length
"Part1: $p1 chars"

# Part 2: lines 351-560 (  } ... )")
$part2 = $content[350..559]
$p2 = ($part2 -join "`n").Length
"Part2: $p2 chars"

# Part 3: lines 561-756 (u8R"( ...  };)
$part3 = $content[560..755]
$p3 = ($part3 -join "`n").Length
"Part3: $p3 chars"

# Part 4: lines 757-1045 (  } ...  };)
$part4 = $content[756..1044]
$p4 = ($part4 -join "`n").Length
"Part4: $p4 chars"

# Part 5: lines 1046-1179 (  ... )")
$part5 = $content[1045..($lines-1)]
$p5 = ($part5 -join "`n").Length
"Part5: $p5 chars"

# Build new file - all parts concatenated within same runScript
$newLines = @()

# Part 1: u8R"( ...  };"
foreach ($l in $part1) { $newLines += $l }
$newLines += ')")'

# Part 2: u8R"( ... )")
$newLines += 'u8R"('
foreach ($l in $part2) { $newLines += $l }
$newLines += ')")'

# Part 3: u8R"( ...  };"
$newLines += 'u8R"('
foreach ($l in $part3) { $newLines += $l }
$newLines += ')")'

# Part 4: u8R"( ...  };"
$newLines += 'u8R"('
foreach ($l in $part4) { $newLines += $l }
$newLines += ')")'

# Part 5: u8R"( ... )")
$newLines += 'u8R"('
foreach ($l in $part5) { $newLines += $l }

$newLines | Set-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

$verify = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
"New total lines: $($verify.Length)"
"Last line: '$($verify[$verify.Length-1])'"