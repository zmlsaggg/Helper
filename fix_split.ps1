$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

# Part 1: lines 1-351 (u8R"( ...  }
$part1 = $content[0..350]
# Part 2: lines 352-553 (  ...  }
$part2 = $content[351..552]
# Part 3: lines 554-1171 (  ... )")
$part3 = $content[553..1170]

$lines1 = $part1.Count
$lines2 = $part2.Count
$lines3 = $part3.Count

# Build the new file
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

# Verify
$verify = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
"Total lines: $($verify.Length)"

# Count chars per raw string
$p1 = ($part1 -join "`n").Length
$p2 = ($part2 -join "`n").Length
$p3 = ($part3 -join "`n").Length
Write-Host "Part1: $p1 chars"
Write-Host "Part2: $p2 chars"
Write-Host "Part3: $p3 chars"