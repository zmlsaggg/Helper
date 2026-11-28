$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
$lines = $content.Length
"Total lines: $lines"

# Find all split points (lines that are )") or u8R"()
$splitPoints = @()
for ($i = 0; $i -lt $lines; $i++) {
    if ($content[$i].Trim() -eq ')")' -or $content[$i].Trim() -eq 'u8R"(') {
        $splitPoints += $i
    }
}
"Split points: $($splitPoints -join ', ')"

# For each segment between split points, count chars
$segments = @()
$prev = 0
foreach ($sp in $splitPoints) {
    $seg = $content[$prev..($sp-1)]
    $segments += ($seg -join "`n").Length
    $prev = $sp
}
$segments += ($content[$prev..($lines-1)] -join "`n").Length
"Segment sizes: $($segments -join ', ')"