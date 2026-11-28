$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

# Find lines that are just "  };" or "  }" between lines 562-917
for ($i = 561; $i -lt 917; $i++) {
    $line = $content[$i].Trim()
    if ($line -eq '};' -or $line -eq '}' -or $line -eq '  };' -or $line -eq '  }') {
        Write-Host "Line $($i+1): '$($content[$i])'"
    }
}