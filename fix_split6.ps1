$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
$lines = $content.Length
"Total lines: $lines"

# Split segment 4 (lines 563-918) at line 756
# Segment 4a: lines 563-756
$seg4a = $content[562..755]
"Seg4a: $(($seg4a -join "`n").Length) chars"

# Segment 4b: lines 757-918
$seg4b = $content[756..917]
"Seg4b: $(($seg4b -join "`n").Length) chars"

# Build new file
$newLines = @()

# Segment 1: lines 1-351 (u8R"( ... )")
foreach ($l in $content[0..350]) { $newLines += $l }
$newLines += ')")'

# Segment 2: lines 352-456 (u8R"( ... )")
$newLines += 'u8R"('
foreach ($l in $content[351..455]) { $newLines += $l }
$newLines += ')")'

# Segment 3: lines 457-561 (u8R"( ... )")
$newLines += 'u8R"('
foreach ($l in $content[456..560]) { $newLines += $l }
$newLines += ')")'

# Segment 4a: lines 562-756 (u8R"( ... );)
$newLines += 'u8R"('
foreach ($l in $seg4a) { $newLines += $l }
$newLines += ')")'

# Segment 4b: lines 757-918 (u8R"( ... )")
$newLines += 'u8R"('
foreach ($l in $seg4b) { $newLines += $l }
$newLines += ')")'

# Segment 5: lines 919-1181 (u8R"( ... )")
$newLines += 'u8R"('
foreach ($l in $content[918..($lines-1)]) { $newLines += $l }

$newLines | Set-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

$verify = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
"New total lines: $($verify.Length)"

# Verify segment sizes
$seg1 = $content[0..350]
$seg2 = $content[351..455]
$seg3 = $content[456..560]
Write-Host "Seg1: $(($seg1 -join \"`n\").Length) chars"
Write-Host "Seg2: $(($seg2 -join \"`n\").Length) chars"
Write-Host "Seg3: $(($seg3 -join \"`n\").Length) chars"
Write-Host "Seg4a: $(($seg4a -join \"`n\").Length) chars"
Write-Host "Seg4b: $(($seg4b -join \"`n\").Length) chars"
$seg5 = $content[918..($lines-1)]
Write-Host "Seg5: $(($seg5 -join \"`n\").Length) chars"