$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

Write-Host "=== Segment 4 (lines 562-918) ==="
for ($i = 561; $i -lt 918; $i++) {
    $line = $content[$i].Trim()
    if ($line -eq '};' -or $line -eq '}' -or $line -eq '  };' -or $line -eq '  }') {
        Write-Host "Line $($i+1): '$($content[$i])'"
    }
}