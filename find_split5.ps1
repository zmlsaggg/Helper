$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

# Show lines 757-1045 with line numbers
for ($i = 756; $i -lt 1045; $i++) {
    $line = $content[$i].Trim()
    if ($line -eq '};' -or $line -eq '}' -or $line -eq '  };' -or $line -eq '  }') {
        Write-Host "Line $($i+1): '$($content[$i])'"
    }
}

# Also show what's at line 762, 771, 1045
Write-Host "--- Line 762 context ---"
Write-Host "Line 761: $($content[760])"
Write-Host "Line 762: $($content[761])"
Write-Host "Line 763: $($content[762])"
Write-Host "--- Line 1045 context ---"
Write-Host "Line 1044: $($content[1043])"
Write-Host "Line 1045: $($content[1044])"
Write-Host "Line 1046: $($content[1045])"