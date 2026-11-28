$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
$lines = $content.Length

# Part 1: lines 1-456 (u8R"( ... };)
$part1 = $content[0..455]
$part1 -join "`n" | Measure-Object -Character | Select-Object -ExpandProperty Characters

# Part 2: lines 457-916 (u8R"( ... )")
$part2 = $content[456..915]
$part2 -join "`n" | Measure-Object -Character | Select-Object -ExpandProperty Characters

# Part 3: lines 917-1172 (u8R"( ... )")
$part3 = $content[916..($lines-1)]
$part3 -join "`n" | Measure-Object -Character | Select-Object -ExpandProperty Characters

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

$verify = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
"New total lines: $($verify.Length)"