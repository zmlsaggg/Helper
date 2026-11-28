$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

Write-Host "=== Segment 1 (lines 1-351) ==="
for ($i = 0; $i -lt 351; $i++) {
    $line = $content[$i].Trim()
    if ($line -eq '};' -or $line -eq '}' -or $line -eq '  };' -or $line -eq '  }') {
        Write-Host "Line $($i+1): '$($content[$i])'"
    }
}

Write-Host "=== Segment 10 (lines 563-918) ==="
for ($i = 562; $i -lt 918; $i++) {
    $line = $content[$i].Trim()
    if ($line -eq '};' -or $line -eq '}' -or $line -eq '  };' -or $line -eq '  }') {
        Write-Host "Line $($i+1): '$($content[$i])'"
    }
}