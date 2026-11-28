$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

Write-Host "=== Lines 757-1074 ==="
for ($i = 756; $i -lt 1074; $i++) {
    $line = $content[$i].Trim()
    if ($line -eq '};' -or $line -eq '}' -or $line -eq '  };' -or $line -eq '  }') {
        Write-Host "Line $($i+1): '$($content[$i])'"
    }
}