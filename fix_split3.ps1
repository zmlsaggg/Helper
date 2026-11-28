$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
"Total lines: $($content.Length)"

# Show lines around 352
Write-Host "--- Around line 352 ---"
for ($i = 349; $i -le 355; $i++) {
    Write-Host "Line $($i+1): $($content[$i])"
}

# Show lines around 554
Write-Host "--- Around line 554 ---"
for ($i = 551; $i -le 557; $i++) {
    Write-Host "Line $($i+1): $($content[$i])"
}

# Show lines around 916
Write-Host "--- Around line 916 ---"
for ($i = 913; $i -le 919; $i++) {
    Write-Host "Line $($i+1): $($content[$i])"
}