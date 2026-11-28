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

# Part 3a: lines 757-1074 (  ...  };)
$part3a = $content[756..1073]
$p3a = ($part3a -join "`n").Length
"Part3a: $p3a chars"

# Part 3b: lines 1075-1179 (  ... )")
$part3b = $content[1074..($lines-1)]
$p3b = ($part3b -join "`n").Length
"Part3b: $p3b chars"

# Build new file
$newLines = @()

# Part 1: u8R"( ...  };"
foreach ($l in $part1) { $newLines += $l }
$newLines += ')")'

# Part 2: u8R"( ...  };"
$newLines += 'u8R"('
foreach ($l in $part2) { $newLines += $l }
$newLines += ')")'

# Part 3a: u8R"( ...  };"
$newLines += 'u8R"('
foreach ($l in $part3a) { $newLines += $l }
$newLines += ')")'

# Part 3b: u8R"( ...  )")
$newLines += 'u8R"('
foreach ($l in $part3b) { $newLines += $l }

$newLines | Set-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

$verify = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
"New total lines: $($verify.Length)"
"Last line: '$($verify[$verify.Length-1])'"