$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
$lines = $content.Length
"Total lines: $lines"

# Check each line for length
for ($i = 0; $i -lt $lines; $i++) {
    $lineLen = $content[$i].Length
    if ($lineLen -gt 100) {
        Write-Host "Line $($i+1): $lineLen chars"
    }
}